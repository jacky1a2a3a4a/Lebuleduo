import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import {
  HiDocumentText,
  HiMiniUser,
  HiMapPin,
  HiCamera,
  HiXMark,
} from 'react-icons/hi2';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useEffect, useState, useRef } from 'react';
import { TaskStatus } from '../Card';
// 引用相機套件
import Webcam from 'react-webcam';

// 定義任務類型
type TaskItem = {
  id: string;
  status: TaskStatus;
  time: string;
  address: string;
  customer: string;
};

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

// 訂單詳情卡片
const DetailCard = styled.div`
  background-color: var(--color-gray-0);
  border: 1.5px solid var(--color-gray-300);
  border-radius: var(--border-radius-lg);
  width: 100%;
  max-width: calc(var(--min-width-mobile) - 2rem);
  padding: var(--spacing-md);
  margin-bottom: 1rem;
`;

// 訂單詳情容器
const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-xs);
`;

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

const PlanTitle = styled.div`
  font-size: var(--font-size-md);
  font-weight: 600;
`;

const PlanContent = styled.div`
  color: var(--color-gray-400);
  font-size: var(--font-size-sm);
  font-weight: 500;
`;

// 重量輸入區域
const WeightInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  width: 100%;
`;

const WeightInput = styled.input`
  padding: var(--spacing-sm);
  padding-left: var(--spacing-md);
  border: 1.5px solid var(--color-gray-300);
  border-radius: var(--border-radius-round);
  font-size: var(--font-size-sm);
  font-weight: 400;
  height: 100%;

  &::placeholder {
    color: var(--color-gray-300);
  }
`;

// 照片拍攝區域
//區域容器
const PhotoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  width: 100%;
`;

//全部照片容器
const PhotoContainer = styled.div<{ hasPhotos: boolean }>`
  display: flex;
  gap: var(--spacing-sm);
  width: 100%;
  margin: ${({ hasPhotos }) => (hasPhotos ? '20px 0' : '20px 0 0 0')};
`;

//照片框
const PhotoBox = styled.div`
  background-color: var(--color-gray-200);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(50% - var(--spacing-xs));
  aspect-ratio: 9/16;
  border-radius: var(--border-radius-lg);
  overflow: hidden;
`;

//照片本體
const PhotoImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: var(--border-radius-lg);
  object-fit: cover;
`;

//照片刪除按鈕
const DeleteButton = styled.button`
  background-color: var(--color-gray-900);
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  color: var(--color-gray-0);
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 1;
  }
`;

//照片拍攝按鈕
const PhotoButton = styled.button`
  background-color: var(--color-gray-200);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 10px 20px;
  border-radius: var(--border-radius-round);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--color-gray-300);
  }
`;

const PhotoButtonText = styled.div`
  color: var(--color-gray-700);
  display: flex;
  align-items: center;
  font-size: var(--font-size-sm);
  font-weight: 500;
`;

// 地圖容器
const MapContainer = styled.div`
  width: 100%;
  height: 100px;
  border-radius: var(--border-radius-lg);
  overflow: hidden;
`;

const DetailAddress = styled.div`
  color: var(--color-gray-500);
  font-size: var(--font-size-sm);
  font-weight: 500;
  text-decoration: underline;
  letter-spacing: 0.05em;
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

// 按鈕
const Button = styled.button<{ disabled?: boolean }>`
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
    background-color: var(--color-gray-700);
    color: var(--color-gray-0);
    flex: 2;

    &:hover {
      background-color: ${(props) =>
        props.disabled ? 'var(--color-gray-700)' : 'var(--color-gray-800)'};
    }
  }
`;

// 相機容器
const CameraContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--color-gray-900);
  z-index: 1000;
  display: flex;
  flex-direction: column;
`;

const CameraHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md);
  background-color: var(--color-gray-800);
`;

const CameraTitle = styled.div`
  color: var(--color-gray-0);
  font-size: var(--font-size-sm);
  font-weight: 500;
`;

const CameraCloseButton = styled.button`
  background: none;
  border: none;
  color: var(--color-gray-0);
  cursor: pointer;
  padding: var(--spacing-xs);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CameraView = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const CameraControls = styled.div`
  padding: var(--spacing-md);
  display: flex;
  justify-content: center;
  gap: var(--spacing-md);
`;

const CameraButton = styled.button`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: var(--color-gray-0);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const CameraButtonInner = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: var(--color-gray-0);
  border: 2px solid var(--color-gray-700);
`;

const ErrorText = styled.div`
  color: var(--color-red-600);
  opacity: 0.7;
  font-size: var(--font-size-xs);
  font-weight: 500;
  margin-top: var(--spacing-xs);
  margin-left: var(--spacing-sm);
`;

function ProcessOrder() {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const [task, setTask] = useState<TaskItem | null>(null);
  const [weight, setWeight] = useState<string>('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  // 重量/照片沒有附上 > 設置錯誤訊息
  const [errors, setErrors] = useState({
    weight: false,
    photos: false,
  });
  //連接 React 組件和 Webcam 功能的橋樑，使得代碼能夠在用戶點擊拍照按鈕時獲取並保存當前攝像頭的畫面。
  const webcamRef = useRef<Webcam>(null);

  // 從 localStorage 讀取任務資訊
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      // 將localStorage的字串轉換成JS陣列
      const tasks: TaskItem[] = JSON.parse(savedTasks);
      // 找到對應的任務
      const currentTask = tasks.find((t) => t.id === taskId);
      if (currentTask) {
        setTask(currentTask);
      }
    }
  }, [taskId]);

  const handleBack = () => {
    navigate(-1);
  };

  // 處理完成收運
  const handleComplete = () => {
    const newErrors = {
      weight: !weight,
      photos: photos.length < 2,
    };
    setErrors(newErrors);

    if (!weight || photos.length < 2) return;

    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      const tasks: TaskItem[] = JSON.parse(savedTasks);
      const updatedTasks = tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: 'completed',
            }
          : task,
      );
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
    navigate(-1);
  };

  // 處理開啟相機
  const handleTakePhoto = () => {
    setIsCameraOpen(true);
  };

  // 處理關閉相機
  const handleCloseCamera = () => {
    setIsCameraOpen(false);
  };

  // 處理拍照
  const handleCapture = () => {
    if (webcamRef.current && photos.length < 2) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setPhotos([...photos, imageSrc]);
        setErrors((prev) => ({ ...prev, photos: false }));
        setIsCameraOpen(false);
      }
    }
  };

  const handleDeletePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  // 初始化的地圖位置
  const location = {
    lat: 22.62796401977539,
    lng: 120.31047821044922,
  };

  // 如果找不到任務，顯示載入中
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
      {isCameraOpen && (
        <CameraContainer>
          <CameraHeader>
            <CameraTitle>拍攝收運照片 ({photos.length}/2)</CameraTitle>
            <CameraCloseButton onClick={handleCloseCamera}>
              <HiXMark size={24} />
            </CameraCloseButton>
          </CameraHeader>
          <CameraView>
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              width="100%"
              height="100%"
              style={{ objectFit: 'cover', aspectRatio: '4/5' }}
            />
          </CameraView>
          <CameraControls>
            <CameraButton onClick={handleCapture} disabled={photos.length >= 2}>
              <CameraButtonInner />
            </CameraButton>
          </CameraControls>
        </CameraContainer>
      )}

      <HeaderContainer>
        <PageTitle>汪汪員作業中</PageTitle>
        <PageSubtitle>請填寫實際重量並拍攝收運照片</PageSubtitle>
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
        <PlanTitle>標準方案 (50公升 / 10公斤)</PlanTitle>
        <PlanContent>一般垃圾 + 回收 + 廚餘 = 50公升</PlanContent>

        <Divider />

        <HeaderContainer>
          <PageTitle>實際重量 (公斤)</PageTitle>
        </HeaderContainer>

        <WeightInputContainer>
          <WeightInput
            type="number"
            value={weight}
            onChange={(e) => {
              setWeight(e.target.value);
              setErrors((prev) => ({ ...prev, weight: false }));
            }}
            placeholder="請輸入收運時的實際重量"
          />
          {errors.weight && <ErrorText>*請輸入實際重量*</ErrorText>}
        </WeightInputContainer>

        <PhotoSection>
          <PhotoContainer hasPhotos={photos.length > 0}>
            {photos.map((photo, index) => (
              <PhotoBox key={index}>
                <PhotoImage src={photo} alt="收運照片" />
                <DeleteButton onClick={() => handleDeletePhoto(index)}>
                  <HiXMark size={16} />
                </DeleteButton>
              </PhotoBox>
            ))}
          </PhotoContainer>
          <PhotoButton onClick={handleTakePhoto} disabled={photos.length >= 2}>
            <DetailSign>
              <HiCamera size={20} />
            </DetailSign>
            <PhotoButtonText>
              {photos.length >= 2
                ? '已達最大拍攝數量'
                : '請拍攝 2 張現場收運照片'}
            </PhotoButtonText>
          </PhotoButton>
          {photos.length < 2 && errors.photos && (
            <ErrorText>*請拍攝 2 張現場收運照片*</ErrorText>
          )}
        </PhotoSection>
      </DetailCard>

      <DetailButtons>
        <Button onClick={handleBack}>返回</Button>
        <Button onClick={handleComplete}>完成收運</Button>
      </DetailButtons>
    </FullHeightContainer>
  );
}

export default ProcessOrder;
