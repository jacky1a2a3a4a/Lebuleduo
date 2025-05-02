import { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { IoLocationSharp } from 'react-icons/io5';
import { IoIosArrowDown } from 'react-icons/io';
import {
  useLoadScript,
  GoogleMap,
  Marker,
  Libraries,
} from '@react-google-maps/api';

// 為styled-components定義類型
interface StyledProps {
  $active?: boolean;
  $light?: boolean;
  $open?: boolean;
}

// 定義地址下拉選單的Props類型
interface AddressAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onLocationSelect?: (location: { lat: number; lng: number }) => void;
  error?: boolean;
}

// 地址建議介面
interface AddressSuggestion {
  description: string;
  placeId: string;
}

// 引用.env檔案，載入Google Maps API金鑰(安全性考量)
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// 需要加載的Google Maps函式庫
// 使用places函式庫，提供地址自動完成功能
const libraries: Libraries = ['places'];

// 組件本體
const AddressAutocomplete = ({
  value,
  onChange,
  onLocationSelect,
  error,
}: AddressAutocompleteProps) => {
  // 載入狀態
  const [isLoading, setIsLoading] = useState(false);
  // 下拉選單開啟狀態
  const [isOpen, setIsOpen] = useState(false);
  // 地址建議
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);

  // 輸入框DOM參考
  const inputRef = useRef<HTMLInputElement>(null);
  // 下拉選單DOM參考
  const dropdownRef = useRef<HTMLDivElement>(null);

  ////創建容器(使用google maps提供的型別定義)
  // 地址自動完成服務
  const autocompleteServiceRef =
    useRef<google.maps.places.AutocompleteService | null>(null);
  // 地理編碼器
  const geocoderRef = useRef<google.maps.Geocoder | null>(null);
  // 地點服務
  const placesServiceRef = useRef<google.maps.places.PlacesService | null>(
    null,
  );

  // 地圖位置
  const [mapLocation, setMapLocation] = useState<google.maps.LatLngLiteral>({
    lat: 22.6397,
    lng: 120.3022,
  });

  // useLoadScript hook加載Google Maps API
  // 解構libraries提供的isLoaded,loadError參數
  // isLoaded true/false 是否成功載入
  // loadError undefined/null 載入錯誤
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });

  // 初始化Google Maps服務
  useEffect(() => {
    if (isLoaded && !loadError) {
      //創建服務並存進容器
      autocompleteServiceRef.current =
        new google.maps.places.AutocompleteService();
      geocoderRef.current = new google.maps.Geocoder();

      // 創建一個隱藏的div來初始化PlacesService (需要DOM元素)
      // Google Maps API 的設計要求
      const placesDiv = document.createElement('div');
      placesDiv.style.display = 'none';
      document.body.appendChild(placesDiv);
      placesServiceRef.current = new google.maps.places.PlacesService(
        placesDiv,
      );

      // 卸載時移除隱藏的div
      return () => {
        document.body.removeChild(placesDiv);
      };
    }
  }, [isLoaded, loadError]);

  // 使用Google Maps Places API搜索地址
  const searchAddresses = useCallback(
    (query: string) => {
      if (!isLoaded || loadError || !autocompleteServiceRef.current) {
        return;
      }

      setIsLoading(true);

      // 設置搜索參數，限制在台灣地區
      const searchOptions: google.maps.places.AutocompletionRequest = {
        input: query,
        componentRestrictions: { country: 'tw' }, // 限制在台灣
        types: ['address'], // 只搜索地址
      };

      // 調用Google Places Autocomplete API
      autocompleteServiceRef.current.getPlacePredictions(
        searchOptions,
        (predictions, status) => {
          if (
            status === google.maps.places.PlacesServiceStatus.OK &&
            predictions
          ) {
            const formattedSuggestions = predictions.map((prediction) => ({
              description: prediction.description,
              placeId: prediction.place_id,
            }));
            setSuggestions(formattedSuggestions);
          } else {
            setSuggestions([]);
          }
          setIsLoading(false);
        },
      );
    },
    [isLoaded, loadError],
  );

  // 當輸入值改變時觸發搜尋
  useEffect(() => {
    if (value.trim().length > 0 && isOpen) {
      const debounce = setTimeout(() => {
        searchAddresses(value);
      }, 500);

      return () => clearTimeout(debounce);
    } else {
      setSuggestions([]);
    }
  }, [value, isOpen, searchAddresses]);

  // 點擊外部時關閉下拉選單
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 使用Google Maps Geocoding API獲取地址的座標
  const getLocationCoordinates = (placeId: string) => {
    if (!isLoaded || loadError || !geocoderRef.current) {
      return;
    }

    geocoderRef.current.geocode({ placeId: placeId }, (results, status) => {
      if (status === 'OK' && results && results[0]) {
        const location = results[0].geometry.location;
        onLocationSelect({
          lat: location.lat(),
          lng: location.lng(),
        });
        setMapLocation({
          lat: location.lat(),
          lng: location.lng(),
        });
      } else {
        console.error('Geocoding失敗:', status);
      }
    });
  };

  // 選擇建議地址
  const handleSelectSuggestion = (suggestion: AddressSuggestion) => {
    onChange(suggestion.description);
    setIsOpen(false);
    getLocationCoordinates(suggestion.placeId);
  };

  // 加載中或出錯時顯示
  if (!isLoaded)
    return <StatusMessageItem>載入Google Maps中...</StatusMessageItem>;
  if (loadError) return <StatusMessageItem>無法載入地圖服務</StatusMessageItem>;

  const mapContainerStyle = {
    width: '100%',
    height: '150px',
    borderRadius: 'var(--border-radius-xl)',
  };

  return (
    <Container>
      {/* 輸入框 */}
      <InputGroup>
        <StyledInputWithIcon
          type="text"
          placeholder="請輸入收運地址"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => value.trim().length > 0 && setIsOpen(true)}
          ref={inputRef}
          $error={error}
        />
        <InputIcon
          $open={isOpen}
          onClick={() => value.trim().length > 0 && setIsOpen(!isOpen)}
        >
          <IoIosArrowDown />
        </InputIcon>
      </InputGroup>

      {/* 建議下拉選單 */}
      {isOpen && (
        <SuggestionsDropdown ref={dropdownRef}>
          {isLoading ? (
            <StatusMessageItem>搜尋中...</StatusMessageItem>
          ) : suggestions.length > 0 ? (
            suggestions.map((suggestion, index) => (
              <SuggestionItem
                key={index}
                onClick={() => handleSelectSuggestion(suggestion)}
              >
                <IoLocationSharp size={16} />
                <SuggestionText>{suggestion.description}</SuggestionText>
              </SuggestionItem>
            ))
          ) : (
            <StatusMessageItem>無相符地址</StatusMessageItem>
          )}
        </SuggestionsDropdown>
      )}

      {/* google地圖 */}
      <MapContainer>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={mapLocation}
          zoom={15}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
        >
          <Marker position={mapLocation} />
        </GoogleMap>
        {/* <MapOverlay>
          <EditButton onClick={() => {}}>
            <BsPencil />
            <span>編輯地址</span>
          </EditButton>
        </MapOverlay> */}
      </MapContainer>
    </Container>
  );
};

// 容器樣式
const Container = styled.div`
  position: relative;
  width: 100%;
`;

// 狀態訊息
const StatusMessageItem = styled.div`
  padding: var(--spacing-sm) var(--spacing-md);
  color: var(--color-gray-400);
  text-align: center;
  font-size: var(--font-size-sm);
`;

// 輸入框群組
const InputGroup = styled.div`
  position: relative;
  width: 100%;

  display: flex;
  align-items: center;
`;

// 帶有圖標的輸入框
const StyledInputWithIcon = styled.input<{ $error?: boolean }>`
  width: 100%;
  padding: var(--spacing-md);
  padding-right: 40px; /* 為圖標預留空間 */
  border: 1px solid
    ${(props) =>
      props.$error ? 'var(--color-red-500)' : 'var(--color-gray-300)'};
  border-radius: var(--border-radius-round);
  font-size: var(--font-size-sm);

  &::placeholder {
    color: var(--color-gray-400);
    font-size: var(--font-size-sm);
  }

  &:focus {
    outline: 1px solid
      ${(props) =>
        props.$error ? 'var(--color-red-500)' : 'var(--color-gray-400)'};
    outline-offset: 0px;
  }
`;

// 下拉選單圖標
const InputIcon = styled.div<StyledProps>`
  color: var(--color-gray-500);

  width: 20px;
  height: 20px;

  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  right: 12px;

  cursor: pointer;
  transform: ${(props) => (props.$open ? 'rotate(180deg)' : 'rotate(0deg)')};
  transform-origin: center center;
  transition: transform 0.2s ease-in-out;
`;

//// 建議下拉選單
const SuggestionsDropdown = styled.div`
  background-color: var(--color-gray-0);
  border: 1px solid var(--color-gray-300);
  border-radius: var(--border-radius-xl);
  box-shadow: var(--box-shadow-md);

  margin-top: 4px;

  z-index: 100;
  position: relative;
  top: 100%;
  left: 0;
  right: 0;
  max-height: 200px;
  overflow-y: auto;
`;

// 建議地址
const SuggestionItem = styled.div`
  color: var(--color-gray-600);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  cursor: pointer;

  &:hover {
    background-color: var(--color-gray-100);
  }
`;

// 建議文字
const SuggestionText = styled.div`
  font-size: var(--font-size-sm);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// google地圖
const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 150px;
  margin-top: var(--spacing-md);
  border-radius: var(--border-radius-xl);
  overflow: hidden;
`;

// const MapOverlay = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   background-color: rgba(0, 0, 0, 0.5);
//   border-radius: var(--border-radius-xl);
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// const EditButton = styled.button`
//   background-color: white;
//   border: none;
//   border-radius: var(--border-radius-round);
//   padding: var(--spacing-sm) var(--spacing-md);
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   gap: var(--spacing-sm);
//   color: var(--color-gray-600);

//   &:hover {
//     background-color: var(--color-gray-100);
//   }
// `;

export default AddressAutocomplete;
