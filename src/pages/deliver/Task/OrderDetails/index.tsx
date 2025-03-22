import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { HiDocumentText, HiMiniUser, HiMapPin } from 'react-icons/hi2';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import { TaskStatus } from '../Card';

// 最外層容器
const FullHeightContainer = styled.div`
  background-color: var(--color-gray-100);

  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  padding: var(--spacing-14);
`;

// 頁面標題容器
const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: calc(var(--min-width-mobile) - 2rem);
  margin-top: var(--spacing-sm);
  margin-bottom: var(--spacing-sm);
`;

const PageTitle = styled.div`
  font-size: var(--font-size-sm);
  font-weight: 700;
`;

const PageSubtitle = styled.div`
  color: var(--color-gray-400);

  font-size: var(--font-size-xs);
  font-weight: 500;
`;

//訂單詳情 卡片
const DetailCard = styled.div`
  background-color: var(--color-gray-0);
  border: 1.5px solid var(--color-gray-300);
  border-radius: var(--border-radius-lg);
  width: 100%;
  max-width: calc(var(--min-width-mobile) - 2rem);
  padding: var(--spacing-md);
  margin-bottom: 1rem;
`;

//訂單詳情 容器 均分排列
const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-xs);
`;

//訂單詳情 卡片 時間
const DetailTime = styled.div`
  font-size: var(--font-size-2xl);
  font-weight: 600;
`;

const DetailStatus = styled.div`
  background-color: var(--color-gray-300);
  color: var(--color-gray-700);
  border-radius: var(--border-radius-round);

  font-size: var(--font-size-xs);
  font-weight: 500;

  padding: var(--spacing-xs) var(--spacing-sm);
`;

const DetailSign = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 2rem;
  height: 2rem;
`;

const DetailLabel = styled.div`
  color: var(--color-gray-600);
  display: flex;
  align-items: center;
  font-weight: 500;
`;

const DetailValue = styled.div`
  font-weight: 600;
  text-align: right;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid var(--color-gray-300);
  margin: var(--spacing-md) 0;
`;

const DetailImgContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: var(--spacing-sm);
  width: 100%;
  margin-top: var(--spacing-sm);
`;

const DetailImg = styled.div`
  background-color: var(--color-gray-200);
  border-radius: var(--border-radius-lg);
  width: 80px;
  height: 100px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DetailAddress = styled.div`
  color: var(--color-gray-500);
  font-size: var(--font-size-sm);
  font-weight: 500;
  text-decoration: underline;
  letter-spacing: 0.05em;
`;

// 地圖容器
const MapContainer = styled.div`
  width: 100%;
  height: 100px;
  border-radius: var(--border-radius-lg);
  overflow: hidden;
`;

const PlanTitle = styled.div`
  font-size: var(--font-size-md);
  font-weight: 600;
`;

const PlanContent = styled.div`
  color: var(--color-gray-400);
  font-size: var(--font-size-sm);
  font-weight: 500;
`;

// 按鈕容器
const DetailButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--spacing-md);
  width: 100%;
  margin-top: auto;
`;

// 確認按鈕
const Button = styled.button<{ disabled?: boolean; isCancel?: boolean }>`
  padding: 0.75rem 1rem;
  border-radius: var(--border-radius-round);
  font-weight: 500;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  border: none;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};

  &:first-child {
    background-color: var(--color-gray-200);
    color: var(--color-gray-600);
    flex: 1;

    &:hover {
      background-color: ${(props) =>
        props.disabled ? 'var(--color-gray-200)' : 'var(--color-gray-300)'};
    }
  }

  &:last-child {
    background-color: ${(props) =>
      props.isCancel ? 'var(--color-gray-200)' : 'var(--color-gray-600)'};
    color: ${(props) =>
      props.isCancel ? 'var(--color-gray-600)' : 'var(--color-gray-0)'};
    flex: 2;

    &:hover {
      background-color: ${(props) =>
        props.disabled
          ? props.isCancel
            ? 'var(--color-gray-300)'
            : 'var(--color-gray-700)'
          : props.isCancel
            ? 'var(--color-gray-400)'
            : 'var(--color-gray-800)'};
    }
  }
`;

// 定義任務類型
type TaskItem = {
  id: string;
  status: TaskStatus;
  time: string;
  address: string;
  customer: string;
  weight?: string;
  photos?: string[];
};

function TaskDetails() {
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
          <DetailValue>{task.customer}</DetailValue>
        </DetailRow>
        <DetailRow>
          <DetailLabel>
            <DetailSign>
              <HiMapPin />
            </DetailSign>
            放置固定點
          </DetailLabel>
          <DetailValue>門口左側鞋櫃上</DetailValue>
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

export default TaskDetails;
