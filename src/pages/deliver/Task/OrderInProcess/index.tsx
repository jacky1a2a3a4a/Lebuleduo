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
import Webcam from 'react-webcam';
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
  WeightInputContainer,
  WeightInput,
  PhotoSection,
  PhotoContainer,
  PhotoBox,
  PhotoImage,
  DeleteButton,
  PhotoButton,
  PhotoButtonText,
  CameraContainer,
  CameraHeader,
  CameraTitle,
  CameraCloseButton,
  CameraView,
  CameraControls,
  CameraButton,
  CameraButtonInner,
  ErrorText,
} from './styled';

// 定義任務類型
type TaskItem = {
  id: string;
  status: TaskStatus;
  time: string;
  address: string;
  notes: string;
  customerName: string;
  phone: string;
  weight?: string;
  photos?: string[];
};

function OrderInProcess() {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const [task, setTask] = useState<TaskItem | null>(null);
  const [weight, setWeight] = useState<string>('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [errors, setErrors] = useState({
    weight: false,
    photos: false,
  });
  const webcamRef = useRef<Webcam>(null);

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
              weight: weight,
              photos: photos,
            }
          : task,
      );
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
    navigate('/deliver');
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
          <DetailValue>{task.customerName}</DetailValue>
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
        <PlanTitle>標準方案 (50L / 10kg)</PlanTitle>
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

export default OrderInProcess;
