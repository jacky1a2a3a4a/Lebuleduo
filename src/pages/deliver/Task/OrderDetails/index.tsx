import { useNavigate, useParams } from 'react-router-dom';
import { HiDocumentText, HiMiniUser, HiMapPin, HiPhone } from 'react-icons/hi2';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import { TaskStatus } from '../Card';
import {
  FullHeightContainer,
  HeaderContainer,
  PageTitle,
  PageSubtitle,
  DetailCard,
  DetailRow,
  DetailTime,
  DetailStatus,
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
} from './styled';

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

function OrderDetails() {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const [task, setTask] = useState<TaskItem | null>(null);

  // 從 localStorage 讀取任務資訊
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      const tasks: TaskItem[] = JSON.parse(savedTasks);
      const currentTask = tasks.find((t) => t.id === taskId);
      if (currentTask) {
        setTask(currentTask);
      }
    }
  }, [taskId]);

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

  // 初始化的地圖位置(我設定為高雄市寶成世紀大樓)
  const location = {
    lat: 22.62796401977539,
    lng: 120.31047821044922,
  };

  // 如果找不到任務，顯示載入中或錯誤訊息
  if (!task) {
    return (
      <FullHeightContainer>
        <HeaderContainer>
          <PageTitle>載入中...</PageTitle>
        </HeaderContainer>
      </FullHeightContainer>
    );
  }

  return (
    <FullHeightContainer>
      <HeaderContainer>
        <PageTitle>訂單詳情</PageTitle>
        <PageSubtitle>請務必核對用戶資料及訂單內容</PageSubtitle>
      </HeaderContainer>

      <DetailCard>
        <DetailRow>
          <DetailTime>{task.time}</DetailTime>
          <DetailStatus>代收運</DetailStatus>
        </DetailRow>
        <DetailRow>
          <DetailLabel>
            <DetailSign>
              <HiDocumentText />
            </DetailSign>
            訂單編號
          </DetailLabel>
          <DetailValue>{task.id}</DetailValue>
        </DetailRow>

        <DetailRow>
          <DetailLabel>
            <DetailSign>
              <HiMiniUser />
            </DetailSign>
            聯絡人
          </DetailLabel>
          <DetailValue>{task.customerName}</DetailValue>
        </DetailRow>

        <DetailRow>
          <DetailLabel>
            <DetailSign>
              <HiPhone />
            </DetailSign>
            電話
          </DetailLabel>
          <DetailValue>{task.phone}</DetailValue>
        </DetailRow>
        <DetailRow>
          <DetailLabel>
            <DetailSign>
              <HiMapPin />
            </DetailSign>
            放置固定點
          </DetailLabel>
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
              <HiMapPin />
            </DetailSign>
            地址
          </DetailLabel>
          <DetailValue>
            <DetailAddress>{task.address}</DetailAddress>
          </DetailValue>
        </DetailRow>

        <MapContainer>
          <LoadScript googleMapsApiKey="AIzaSyABHP7-CH4b-cyZaARmoUI9OwOGi3e6Whg">
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '100%' }}
              center={location}
              zoom={14.5}
            >
              <Marker position={location} />
            </GoogleMap>
          </LoadScript>
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
              <PageTitle>實際重量 (公斤)</PageTitle>
            </HeaderContainer>
            <PlanContent>{task.weight}</PlanContent>

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
        <Button onClick={handleBack}>返回任務</Button>
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
