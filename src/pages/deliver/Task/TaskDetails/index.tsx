import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import {
  HiDocumentText,
  HiMiniUser,
  HiMiniPhone,
  HiMapPin,
} from 'react-icons/hi2';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// 最外層容器
const FullHeightContainer = styled.div`
  background-color: var(--color-gray-100);

  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  padding: 1rem;
`;

// 頁面標題容器
const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: calc(var(--min-width-mobile) - 2rem);
  margin-top: var(--spacing-sm);
  margin-bottom: var(--spacing-xs);
`;

const PageTitle = styled.div`
  font-size: var(--font-size-lg);
  font-weight: 800;
`;

const PageSubtitle = styled.div`
  color: var(--color-gray-400);

  font-size: var(--font-size-sm);
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

  font-size: var(--font-size-sm);
  font-weight: 700;

  padding: 0.25rem 0.75rem;
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
const Button = styled.button`
  padding: 0.75rem 1rem;
  border-radius: var(--border-radius-round);
  font-weight: 500;
  cursor: pointer;
  border: none;

  &:first-child {
    background-color: var(--color-gray-200);
    color: var(--color-gray-600);
    flex: 1;

    &:hover {
      background-color: var(--color-gray-300);
    }
  }

  &:last-child {
    background-color: var(--color-gray-700);
    color: var(--color-gray-0);
    flex: 2;

    &:hover {
      background-color: var(--color-gray-800);
    }
  }
`;

function TaskDetails() {
  const navigate = useNavigate();
  const { taskId } = useParams();

  const handleBack = () => {
    navigate(-1);
  };

  const handleConfirm = () => {
    navigate(`/deliver/task/${taskId}/record`);
  };

  // 初始化的地圖位置(我設定為高雄市寶成世紀大樓)
  const location = {
    lat: 22.62796401977539,
    lng: 120.31047821044922,
  };

  return (
    <FullHeightContainer>
      <HeaderContainer>
        <PageTitle>訂單詳情</PageTitle>
        <PageSubtitle>請務必核對用戶資料及訂單內容</PageSubtitle>
      </HeaderContainer>

      <DetailCard>
        <DetailRow>
          <DetailTime>09:00 am</DetailTime>
          <DetailStatus>代收運</DetailStatus>
        </DetailRow>
        <DetailRow>
          <DetailLabel>
            <DetailSign>
              <HiDocumentText />
            </DetailSign>
            訂單編號
          </DetailLabel>
          <DetailValue>{taskId || 'ORD-12345'}</DetailValue>
        </DetailRow>
        <DetailRow>
          <DetailLabel>
            <DetailSign>
              <HiMiniUser />
            </DetailSign>
            聯絡人
          </DetailLabel>
          <DetailValue>林先生</DetailValue>
        </DetailRow>
        <DetailRow>
          <DetailLabel>
            <DetailSign>
              <HiMiniPhone />
            </DetailSign>
            電話
          </DetailLabel>
          <DetailValue>0912-456-789</DetailValue>
        </DetailRow>
        <DetailRow>
          <DetailLabel>
            <DetailSign>
              <HiMapPin />
            </DetailSign>
            放置點
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
            <DetailAddress>測試高雄市和平區和平一路124號5F</DetailAddress>
          </DetailLabel>
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
        <PlanTitle>標準方案(50公升 / 10公斤)</PlanTitle>
        <PlanContent>一般垃圾+回收+廚餘 = 50公升</PlanContent>
      </DetailCard>

      <DetailButtons>
        <Button onClick={handleBack}>返回任務</Button>
        <Button onClick={handleConfirm}>確認前往</Button>
      </DetailButtons>
    </FullHeightContainer>
  );
}

export default TaskDetails;
