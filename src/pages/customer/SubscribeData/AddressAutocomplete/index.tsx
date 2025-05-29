import { useState, useEffect, useRef, useCallback } from 'react';
import { IoLocationSharp } from 'react-icons/io5';
import { IoIosArrowDown } from 'react-icons/io';
import {
  useLoadScript,
  GoogleMap,
  Marker,
  Libraries,
} from '@react-google-maps/api';
import {
  Container,
  StatusMessageItem,
  InputGroup,
  StyledInputWithIcon,
  InputIcon,
  SuggestionsDropdown,
  SuggestionItem,
  SuggestionText,
  MapContainer,
} from './styled';

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
      </MapContainer>
    </Container>
  );
};

export default AddressAutocomplete;
