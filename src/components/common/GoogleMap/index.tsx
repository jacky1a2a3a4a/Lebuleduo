import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { useState, useCallback, useEffect } from 'react';

// 定義需要的 Google Maps 庫
const libraries: (
  | 'places'
  | 'drawing'
  | 'geometry'
  | 'localContext'
  | 'visualization'
)[] = ['places'];

interface GoogleMapProps {
  address: string;
  onMapLoad?: () => void;
}

export const GoogleMapComponent = ({ address, onMapLoad }: GoogleMapProps) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
    libraries,
    id: 'google-map-script',
    version: 'weekly',
    language: 'zh-TW',
    region: 'TW',
  });

  const [mapCenter, setMapCenter] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [geocodeAttempted, setGeocodeAttempted] = useState(false);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const geocodeAddress = useCallback(async (address: string) => {
    console.log('正在地理編碼地址:', address);
    if (!window.google || !window.google.maps || !window.google.maps.Geocoder) {
      console.error('Google Maps API 尚未完全載入');
      return false;
    }

    try {
      const geocoder = new window.google.maps.Geocoder();
      return new Promise((resolve) => {
        geocoder.geocode({ address }, (results, status) => {
          if (status === 'OK' && results && results[0]) {
            const location = results[0].geometry.location;
            const newCenter = {
              lat: location.lat(),
              lng: location.lng(),
            };
            console.log('地理編碼成功，位置:', newCenter);
            setMapCenter(newCenter);
            resolve(true);
          } else {
            console.error('地理編碼失敗:', status);
            resolve(false);
          }
          setGeocodeAttempted(true);
        });
      });
    } catch (error) {
      console.error('地理編碼過程發生錯誤:', error);
      setGeocodeAttempted(true);
      return false;
    }
  }, []);

  useEffect(() => {
    if (isLoaded && address && !geocodeAttempted) {
      console.log('開始處理地址:', address);
      const timer = setTimeout(() => {
        geocodeAddress(address);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isLoaded, address, geocodeAddress, geocodeAttempted]);

  // 初始化地圖時創建 Marker
  const handleMapLoad = useCallback(
    (map: google.maps.Map) => {
      console.log('地圖已載入');
      setMap(map);
      onMapLoad?.();
    },
    [onMapLoad],
  );

  // 當 mapCenter 改變時更新 marker
  useEffect(() => {
    if (map && mapCenter) {
      console.log('更新標記位置:', mapCenter);
      // 如果已經有標記，先移除
      if (marker) {
        marker.setMap(null);
      }

      // 創建新的標記
      const newMarker = new google.maps.Marker({
        map,
        position: mapCenter,
        title: address,
      });
      setMarker(newMarker);
    }
  }, [map, mapCenter, address]);

  if (loadError) {
    return <div>地圖載入失敗: {loadError.message}</div>;
  }

  if (!isLoaded) {
    return <div>正在載入地圖...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={{
        width: '100%',
        height: '150px',
        borderRadius: 'var(--border-radius-md)',
      }}
      center={mapCenter || { lat: 25.033, lng: 121.5654 }}
      zoom={15}
      onLoad={handleMapLoad}
    />
  );
};
