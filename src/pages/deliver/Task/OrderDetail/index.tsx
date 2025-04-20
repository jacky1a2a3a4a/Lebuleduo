import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { MdArrowBackIosNew, MdLocationOn } from 'react-icons/md';
import {
  FullHeightContainer,
  HeaderContainer,
  PageTitle,
  PageSubtitle,
  IconStyled,
  Title,
  DetailCard,
  DetailRow,
  DetailTime,
  DetailSign,
  DetailLabel,
  DetailValue,
  Divider,
  DetailImgContainer,
  DetailImg,
  DetailAddress,
  MapContainer,
  PlanTitle,
  PlanContent,
  DetailButtons,
  Button,
  ErrorMessage,
} from './styled';

import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { TaskStatus } from '../../../../types/deliver';
import { formatTime } from '../../../../utils/formatTime';
import LoadingMessage from '../../../../components/common/LoadingMessage';
import StatusTagDeliver from '../../../../components/deliver/StatusTagDeliver';

// 定義 API 回傳的任務類型
type ApiTaskItem = {
  OrderDetailID: number;
  ServiceTime: string | null;
  OrderDetailsNumber: string;
  Addresses: string;
  CustomerNumber: string;
  CustomerName: string;
  Notes: string;
  Photo: string[];
  Status: string;
  PlanName: string;
  PlanKG: number;
  Liter: number;
};

// 定義任務類型
type TaskItem = {
  id: string;
  status: TaskStatus;
  time: string;
  address: string;
  customerName: string;
  phone: string;
  notes: string;
  weight?: string;
  photos?: string[];
};

// 定義需要的 Google Maps 庫（'places' 用於地理編碼）
const libraries: (
  | 'places'
  | 'drawing'
  | 'geometry'
  | 'localContext'
  | 'visualization'
)[] = ['places'];

function OrderDetails() {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const [task, setTask] = useState<TaskItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 使用 useJsApiLoader 來處理 Google Maps API 載入
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
    libraries: libraries as any,
    id: 'google-map-script',
    version: 'weekly',
    language: 'zh-TW',
    region: 'TW',
  });

  // 定義地圖中心位置和載入狀態
  const [mapCenter, setMapCenter] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  //追蹤地圖是否已載入完成
  const [mapLoaded, setMapLoaded] = useState(false);
  //追蹤是否已嘗試過地理編碼，避免重複操作
  const [geocodeAttempted, setGeocodeAttempted] = useState(false);

  // 從 API 讀取任務資訊
  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`api/GET/driver/today/7/${taskId}`);

        if (response.data.status && response.data.result.Orders.length > 0) {
          const apiTask = response.data.result.Orders[0];
          const mappedTask: TaskItem = {
            id: apiTask.OrderDetailsNumber,
            status: mapApiStatusToTaskStatus(apiTask.Status),
            time: apiTask.ServiceTime || '',
            address: apiTask.Addresses,
            customerName: apiTask.CustomerName,
            phone: apiTask.CustomerNumber,
            notes: apiTask.Notes,
            weight: apiTask.PlanKG.toString(),
            photos: apiTask.Photo,
          };
          setTask(mappedTask);
        } else {
          setError('找不到任務資訊');
        }
      } catch (err) {
        setError('獲取任務資訊時發生錯誤');
        console.error('Error fetching task details:', err);
      } finally {
        setLoading(false);
      }
    };

    if (taskId) {
      fetchTaskDetails();
    }
  }, [taskId]);

  // 將 API 狀態映射到 TaskStatus
  const mapApiStatusToTaskStatus = (apiStatus: string): TaskStatus => {
    switch (apiStatus) {
      case '已排定':
        return 'scheduled';
      case '進行中':
        return 'ongoing';
      case '已完成':
        return 'completed';
      case '已抵達':
        return 'arrived';
      case '異常':
        return 'abnormal';
      default:
        return 'scheduled';
    }
  };

  // 地理編碼函數 使用 useCallback 以避免不必要的重新創建
  const geocodeAddress = useCallback(async (address: string) => {
    //API可用性檢查
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
            setMapCenter({
              lat: location.lat(),
              lng: location.lng(),
            });
            setMapLoaded(true);
            resolve(true);
            console.log(results, status);
          } else {
            console.error('地理編碼失敗:', status);
            setMapLoaded(true); // 即使失敗也標記為已載入，使用默認位置
            resolve(false);
          }
          setGeocodeAttempted(true);
        });
      });
    } catch (error) {
      console.error('地理編碼過程發生錯誤:', error);
      setMapLoaded(true);
      setGeocodeAttempted(true);
      return false;
    }
  }, []);

  // 當 API 載入成功且任務地址可用時，執行地理編碼
  useEffect(() => {
    if (isLoaded && task?.address && !geocodeAttempted) {
      // 添加短暫延遲，確保 Google Maps API 完全初始化
      const timer = setTimeout(() => {
        geocodeAddress(task.address);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isLoaded, task, geocodeAddress, geocodeAttempted]);

  const handleBack = () => {
    navigate(-1);
  };

  // 處理確認前往/取消前往按鈕點擊
  const handleStatusChange = () => {
    if (task?.status === 'completed') return;

    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      const tasks: TaskItem[] = JSON.parse(savedTasks);
      const updatedTasks = tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: task.status === 'ongoing' ? 'waiting' : 'ongoing',
            }
          : task,
      );
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
    navigate(-1);
  };

  // 載入狀態
  if (loading) {
    return <LoadingMessage />;
  }

  // 錯誤狀態
  if (error) {
    return (
      <FullHeightContainer>
        <HeaderContainer>
          <PageTitle>錯誤</PageTitle>
          <PageSubtitle>{error}</PageSubtitle>
        </HeaderContainer>
      </FullHeightContainer>
    );
  }

  return (
    <FullHeightContainer>
      {/* NavHeader  */}
      <HeaderContainer>
        <PageTitle onClick={handleBack}>
          <IconStyled>
            <MdArrowBackIosNew />
          </IconStyled>
          訂單詳情
        </PageTitle>
        <PageSubtitle>訂單編號: {task.id}</PageSubtitle>
      </HeaderContainer>

      {/* 時間卡片 */}
      <DetailCard>
        <DetailRow>
          <DetailTime>{formatTime(task.time)}</DetailTime>
          <StatusTagDeliver status={task.status} />
        </DetailRow>
      </DetailCard>

      {/* 客戶資訊 */}
      <Title>客戶資訊</Title>

      <DetailCard>
        <DetailRow>
          <DetailLabel>訂單編號</DetailLabel>
          <DetailValue>{task.id}</DetailValue>
        </DetailRow>

        <DetailRow>
          <DetailLabel>聯絡人</DetailLabel>
          <DetailValue>{task.customerName}</DetailValue>
        </DetailRow>

        <DetailRow>
          <DetailLabel>電話</DetailLabel>
          <DetailValue>{task.phone}</DetailValue>
        </DetailRow>
        <DetailRow>
          <DetailLabel>放置固定點</DetailLabel>
          <DetailValue>{task.notes}</DetailValue>
        </DetailRow>

        <Divider />

        {/* 放置點圖片 */}
        <DetailImgContainer>
          <DetailImg>
            {/* 可以在這裡添加實際的圖片標籤 */}
            {/* <img src="/路徑/到/圖片.jpg" alt="放置點" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> */}
          </DetailImg>
          <DetailImg>
            {/* <img src="/路徑/到/圖片2.jpg" alt="放置點" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> */}
          </DetailImg>
        </DetailImgContainer>
      </DetailCard>

      <HeaderContainer>
        <PageTitle>地圖導航</PageTitle>
      </HeaderContainer>

      <DetailCard>
        <DetailRow>
          <DetailLabel>
            <DetailSign>
              <MdLocationOn />
            </DetailSign>
            地址
          </DetailLabel>
          <DetailValue>
            <DetailAddress>{task.address}</DetailAddress>
          </DetailValue>
        </DetailRow>

        <MapContainer>
          {loadError && (
            <ErrorMessage>地圖載入失敗: {loadError.message}</ErrorMessage>
          )}
          {!isLoaded ? (
            <div>正在載入地圖...</div>
          ) : (
            <GoogleMap
              mapContainerStyle={{
                width: '100%',
                height: '200px',
                borderRadius: 'var(--border-radius-md)',
              }}
              center={mapCenter || { lat: 25.033, lng: 121.5654 }} // 默認台北市中心
              zoom={15}
              onLoad={() => console.log('地圖已成功載入')}
            >
              {mapCenter && <Marker position={mapCenter} />}
            </GoogleMap>
          )}
        </MapContainer>
      </DetailCard>

      <HeaderContainer>
        <PageTitle>收運方案</PageTitle>
      </HeaderContainer>

      <DetailCard>
        <PlanTitle>標準方案(50L / 10kg)</PlanTitle>
        <PlanContent>一般垃圾+回收+廚餘 = 50公升</PlanContent>

        {task.status === 'completed' && (
          <>
            <Divider />
            <HeaderContainer>
              <PageTitle>實際重量 (kg)</PageTitle>
            </HeaderContainer>
            <PlanContent>{task.weight} kg</PlanContent>

            <Divider />
            <HeaderContainer>
              <PageTitle>收運照片</PageTitle>
            </HeaderContainer>
            <DetailImgContainer>
              {task.photos?.map((photo, index) => (
                <DetailImg key={index}>
                  <img
                    src={photo}
                    alt={`收運照片 ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </DetailImg>
              ))}
            </DetailImgContainer>
          </>
        )}
      </DetailCard>

      <DetailButtons>
        <Button
          onClick={handleStatusChange}
          disabled={task.status === 'completed'}
          isCancel={task.status === 'ongoing'}
        >
          {task.status === 'completed'
            ? '已完成'
            : task.status === 'ongoing'
              ? '取消前往'
              : '確認前往'}
        </Button>
      </DetailButtons>
    </FullHeightContainer>
  );
}

export default OrderDetails;
