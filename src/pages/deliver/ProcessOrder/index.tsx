import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, useCallback, useRef } from 'react';
import axios from 'axios';
import {
  MdArrowBackIosNew,
  MdLocationOn,
  MdAdd,
  MdClose,
  MdCamera,
  MdDelete,
  MdReportProblem,
  MdEdit,
  MdOutlineTaskAlt,
} from 'react-icons/md';
import {
  FullHeightContainer,
  HeaderContainer,
  Title,
  IconStyled,
  NavTitle,
  NavTitleText,
  NavSubtitle,
  DetailCard,
  CardSection,
  DetailRow,
  DetailFlex,
  DetailTime,
  DetailSign,
  DetailLabel,
  DetailValue,
  DetailImgContainer,
  DetailImg,
  DetailAddress,
  MapContainer,
  PlanTitle,
  PlanContent,
  Divider,
  PageTitle,
  PageSubtitle,
  WeightInput,
  PhotoUploadContainer,
  PhotoUploadBox,
  PreviewImage,
  PlusIcon,
  UploadText,
  CameraPreview,
  CloseButton,
  CameraContainer,
  CameraVideo,
  CameraControls,
  CameraButton,
  DeleteButton,
  ReportButton,
  ReportBlock,
  ReportBlockTitle,
  ReportBlockContent,
  ReportBlockDescription,
  ReportContent,
  EditIcon,
  CompleteButton,
  CompleteIcon,
  ValidationMessage,
} from './styled';
import ReportModal from './ReportModal'; // 異常回報組件
import SuccessMessage from '../../../components/deliver/SuccessMessage'; // 完成收運組件
import LoadingMessage from '../../../components/common/LoadingMessage'; // 載入中組件
import StatusTagDeliver from '../../../components/deliver/StatusTagDeliver'; // 狀態標籤組件
import ErrorReport from '../../../components/common/ErrorReport';
import { GoogleMapComponent } from '../../../components/common/GoogleMap';
import { TaskStatus } from '../../../types/deliver';
import { formatTime } from '../../../utils/formatTime';
import { getTodayDate } from '../../../utils/getTodayDate';

// 定義任務資料
type TaskItem = {
  id: number;
  number: string;
  status: TaskStatus;
  time: string;
  address: string;
  customerName: string;
  phone: string;
  notes: string;
  plan: string;
  weight?: number;
  liter?: number;
  dropPointPhotos?: string[]; //放置點圖片
  actualWeight?: number; // 實際重量
  driverPhotos?: string[]; // 汪汪員拍攝照片
};

const userId = localStorage.getItem('UsersID'); // 從 localStorage 獲取使用者 ID

function OrderDetails() {
  const navigate = useNavigate();
  const { taskId } = useParams(); // 從 URL 獲取任務 ID
  const [task, setTask] = useState<TaskItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actualWeight, setActualWeight] = useState<number | undefined>(
    undefined,
  ); // 實際重量
  const [driverPhotos, setDriverPhotos] = useState<string[]>([]); // 汪汪員拍攝照片
  const [showCamera, setShowCamera] = useState(false); // 相機
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number | null>(
    null,
  ); // 當前照片索引
  const videoRef = useRef<HTMLVideoElement>(null); // 視頻引用
  const streamRef = useRef<MediaStream | null>(null); // 媒體流引用
  const [isWebCameraSupported, setIsWebCameraSupported] = useState<
    boolean | null
  >(null); // 是否支援網頁相機
  const [showReportModal, setShowReportModal] = useState(false); // 異常回報視窗
  const [reportForm, setReportForm] = useState<{
    issue: string | null;
    otherIssue: string;
    isSubmitted: boolean;
    lastSubmitted: {
      issue: string | null;
      otherIssue: string;
    } | null;
  }>({
    issue: null,
    otherIssue: '',
    isSubmitted: false,
    lastSubmitted: null,
  }); // 異常回報表單狀態
  const [showSuccess, setShowSuccess] = useState(false); // 完成收運

  // 從 API 讀取任務資訊
  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `api/GET/driver/day/${userId}/${getTodayDate()}/${taskId}`,
        );
        console.log('原始任務資訊:', response.data.result.Orders[0]);

        if (response.data.status && response.data.result.Orders.length > 0) {
          const apiTask = response.data.result.Orders[0];
          const TaskDetail: TaskItem = {
            id: apiTask.OrderDetailID, //ID
            number: apiTask.OrderDetailsNumber, //訂單編號
            status: mapApiStatusToTaskStatus(apiTask.Status),
            time: apiTask.ServiceTime || '',
            address: apiTask.Addresses,
            customerName: apiTask.CustomerName,
            phone: apiTask.OrderDetailsNumber,
            notes: apiTask.Notes,
            plan: apiTask.PlanName,
            weight: apiTask.PlanKG.toString(),
            liter: apiTask.Liter.toString(),
            dropPointPhotos: apiTask.Photo?.map(
              (photo) => `${import.meta.env.VITE_API_URL}${photo}`,
            ),
            driverPhotos: apiTask.DriverPhotos,
            actualWeight: apiTask.ActualKG,
          };
          setTask(TaskDetail); // 設置任務資料
          console.log('處理完成的任務:', TaskDetail);
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

    // 如果任務 ID 存在，則獲取任務資訊
    if (taskId) {
      fetchTaskDetails();
    }
  }, [taskId]);

  // 將 API 接收到的狀態(中文) 轉成英文(狀態組件吃英文)
  const mapApiStatusToTaskStatus = (apiStatus: string): TaskStatus => {
    switch (apiStatus) {
      case '已排定':
        return 'scheduled';
      case '前往中':
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

  // 檢查是否支援網頁相機
  useEffect(() => {
    const checkCameraSupport = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        stream.getTracks().forEach((track) => track.stop());
        setIsWebCameraSupported(true);
      } catch {
        setIsWebCameraSupported(false);
      }
    };
    checkCameraSupport();
  }, []);

  // 返回上一頁
  const handleBack = () => {
    navigate(-1);
  };

  // === 實際重量變更 ===
  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value); //將字串轉換成浮點小數
    setActualWeight(isNaN(value) ? undefined : value);
    console.log('實際重量:', actualWeight);
  };

  // === 開啟相機(決定使用網頁還是手機相機) ===
  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
    } catch (err) {
      console.error('無法開啟相機:', err);
    }
  }, []);

  // === 開啟相機(實際開啟相機) ===
  const handleOpenCamera = useCallback(
    (index: number) => {
      if (isWebCameraSupported === null) return;

      // 如果該位置已經有照片，則不允許再次拍照
      if (driverPhotos[index]) return;

      if (isWebCameraSupported) {
        // 使用網頁相機
        setCurrentPhotoIndex(index);
        setShowCamera(true);
      } else {
        // 使用手機內建相機
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.capture = 'environment';

        input.onchange = (e) => {
          const file = (e.target as HTMLInputElement).files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
              const newPhotos = [...driverPhotos];
              newPhotos[index] = event.target?.result as string;
              setDriverPhotos(newPhotos);
            };
            reader.readAsDataURL(file);
          }
        };

        input.click();
      }
    },
    [isWebCameraSupported, driverPhotos],
  );

  // === 停止相機 ===
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  }, []);

  // === 拍照 ===
  const handleTakePhoto = useCallback(() => {
    if (videoRef.current && currentPhotoIndex !== null) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const newPhotos = [...driverPhotos];
        newPhotos[currentPhotoIndex] = canvas.toDataURL('image/jpeg');
        setDriverPhotos(newPhotos);
        stopCamera();
        setShowCamera(false);
      }
    }
  }, [currentPhotoIndex, driverPhotos, stopCamera]);

  // === 刪除照片 ===
  const handleDeletePhoto = useCallback(
    (index: number) => {
      const newPhotos = [...driverPhotos];
      newPhotos[index] = '';
      setDriverPhotos(newPhotos);
    },
    [driverPhotos],
  );

  // 管理相機開啟關閉
  useEffect(() => {
    if (showCamera) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [showCamera, startCamera, stopCamera]);

  // === 提交異常回報 ===
  const handleReportSubmit = async (issue: string, otherIssue: string) => {
    try {
      // TODO: 實作提交異常回報的API
      console.log('提交異常回報:', {
        issue,
        otherIssue,
      });
      setReportForm({
        issue,
        otherIssue,
        isSubmitted: true,
        lastSubmitted: {
          issue,
          otherIssue,
        },
      });
      setShowReportModal(false);
    } catch (error) {
      console.error('提交異常回報失敗:', error);
    }
  };

  // 開啟 modal 時重置狀態，但保留上次提交的內容
  const handleOpenReportModal = () => {
    setShowReportModal(true);
    setReportForm((prev) => ({
      ...prev,
      isSubmitted: false,
      issue: prev.lastSubmitted?.issue || null,
      otherIssue: prev.lastSubmitted?.otherIssue || '',
    }));
  };

  // 取得異常回報文字
  const getIssueText = (issue: string) => {
    switch (issue) {
      case 'overweight':
        return '垃圾量超過方案限制';
      case 'no_bag':
        return '未找到垃圾袋，用戶無回應';
      case 'no_qrcode':
        return '無 QR 碼，用戶無回應';
      case 'broken_bag':
        return '垃圾袋破損嚴重';
      case 'no_contact':
        return '面交未見用戶，已聯絡無回應';
      default:
        return issue;
    }
  };

  // 驗證必要資訊是否已填寫
  const validateCompletion = () => {
    const validations = {
      weight: actualWeight !== undefined && actualWeight > 0,
      photos: driverPhotos.filter(Boolean).length === 2,
    };

    return {
      isValid: validations.weight && validations.photos, // 驗證是否已填寫必要資訊
      validations, // 回傳驗證結果
    };
  };

  // === 提交完成收運(跳轉成功頁面) ===
  const handleComplete = async () => {
    const { isValid } = validateCompletion();
    if (!isValid) return;

    try {
      // 根據是否有異常回報決定訂單狀態
      const orderStatus = reportForm.isSubmitted ? 5 : 4; // 5:異常, 4:已完成

      // 更新訂單狀態
      const response = await axios.put(`api/driver/orders/status/${taskId}`, {
        OrderStatus: orderStatus,
        KG: actualWeight,
        CommonIssues: reportForm.issue,
        OtherIssues: reportForm.otherIssue,
        DriverImageUrl: driverPhotos,
      });

      if (response.data.status) {
        console.log('完成收運成功:', {
          actualWeight,
          driverPhotos,
          reportForm,
          orderStatus,
        });
        setShowSuccess(true);
      } else {
        throw new Error('完成收運失敗');
      }
    } catch (error) {
      console.error('完成收運失敗:', error);
      setError('完成收運失敗，請重試');
    }
  };

  // === 跳轉回首頁(非同步) ===
  const handleSuccessFinish = useCallback(() => {
    navigate('/deliver');
  }, [navigate]);

  const { isValid: validationsAreValid, validations } = validateCompletion();

  // 載入狀態
  if (loading) {
    return <LoadingMessage />;
  }

  // 錯誤狀態
  if (error) {
    return (
      <FullHeightContainer>
        <ErrorReport error={error} />
      </FullHeightContainer>
    );
  }

  return (
    <FullHeightContainer>
      {/* NavHeader  */}
      <HeaderContainer>
        <NavTitle onClick={handleBack}>
          <IconStyled>
            <MdArrowBackIosNew />
          </IconStyled>
          <NavTitleText>填寫收運狀況</NavTitleText>
        </NavTitle>
        <NavSubtitle>任務編號: {task.number}</NavSubtitle>
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

        {/* 放置點圖片 */}
        <DetailImgContainer>
          {task.dropPointPhotos?.map((photo, index) => (
            <DetailImg key={index}>
              <img src={photo} alt={`放置點照片 ${index + 1}`} />
            </DetailImg>
          ))}
        </DetailImgContainer>
      </DetailCard>

      <Title>地圖導航</Title>

      <DetailCard>
        <DetailFlex>
          <DetailSign>
            <MdLocationOn />
          </DetailSign>

          <DetailValue>
            <DetailAddress>{task.address}</DetailAddress>
          </DetailValue>
        </DetailFlex>

        <MapContainer>
          <GoogleMapComponent
            address={task.address}
            onMapLoad={() => console.log('地圖已成功載入')}
          />
        </MapContainer>
      </DetailCard>

      <Title>垃圾收運量</Title>

      <DetailCard>
        <PlanTitle>{task.plan}</PlanTitle>
        <PlanContent>
          一般垃圾+回收+廚餘 = {task.liter}L / {task.weight}kg
        </PlanContent>

        <Divider />

        <CardSection>
          <PageTitle>實際重量 (kg)</PageTitle>
          <WeightInput
            type="number"
            value={actualWeight || ''}
            onChange={handleWeightChange}
            placeholder="請輸入實際重量"
          />
          {!validations.weight && (
            <ValidationMessage>請輸入實際重量</ValidationMessage>
          )}
        </CardSection>

        <CardSection>
          <PageTitle>照片記錄</PageTitle>
          <PageSubtitle>請上傳2張收運照片，務必拍攝掛秤數字</PageSubtitle>
          <PhotoUploadContainer>
            {[0, 1].map((index) => (
              <PhotoUploadBox
                key={index}
                onClick={() => handleOpenCamera(index)}
              >
                {driverPhotos[index] ? (
                  <div style={{ position: 'relative' }}>
                    <PreviewImage
                      src={driverPhotos[index]}
                      alt={`照片 ${index + 1}`}
                    />
                    <DeleteButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeletePhoto(index);
                      }}
                    >
                      <MdDelete />
                    </DeleteButton>
                  </div>
                ) : (
                  <>
                    <PlusIcon>
                      <MdAdd />
                    </PlusIcon>
                    <UploadText>
                      {isWebCameraSupported === null
                        ? '載入中...'
                        : isWebCameraSupported
                          ? '點擊拍照'
                          : '開啟相機'}
                    </UploadText>
                  </>
                )}
              </PhotoUploadBox>
            ))}
          </PhotoUploadContainer>
          {!validations.photos && (
            <ValidationMessage>請上傳2張收運照片</ValidationMessage>
          )}
        </CardSection>

        {/* 回報異常按鈕或異常回報區塊 */}
        {!reportForm.isSubmitted ? (
          <ReportButton onClick={handleOpenReportModal}>
            <MdReportProblem />
            發現異常？點我回報
          </ReportButton>
        ) : (
          <>
            <ReportBlockTitle>
              <MdReportProblem />
              異常回報
            </ReportBlockTitle>

            <ReportBlock onClick={handleOpenReportModal}>
              <ReportContent>
                <ReportBlockContent>
                  {getIssueText(reportForm.lastSubmitted?.issue || '')}
                </ReportBlockContent>
                <EditIcon>
                  <MdEdit />
                </EditIcon>
              </ReportContent>
              {reportForm.lastSubmitted?.otherIssue && (
                <ReportBlockDescription>
                  {reportForm.lastSubmitted.otherIssue}
                </ReportBlockDescription>
              )}
            </ReportBlock>
          </>
        )}
      </DetailCard>

      <CompleteButton $disabled={!validationsAreValid} onClick={handleComplete}>
        <CompleteIcon>
          <MdOutlineTaskAlt />
        </CompleteIcon>
        完成收運
      </CompleteButton>

      {showSuccess && <SuccessMessage onFinish={handleSuccessFinish} />}

      {showCamera && isWebCameraSupported && (
        <CameraPreview>
          <CloseButton onClick={() => setShowCamera(false)}>
            <MdClose />
          </CloseButton>
          <CameraContainer>
            <CameraVideo ref={videoRef} autoPlay playsInline />
          </CameraContainer>
          <CameraControls>
            <CameraButton onClick={handleTakePhoto}>
              <MdCamera />
            </CameraButton>
          </CameraControls>
        </CameraPreview>
      )}

      {/* 異常回報視窗 */}
      <ReportModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        onSubmit={handleReportSubmit}
        selectedIssue={reportForm.issue}
        otherIssue={reportForm.otherIssue}
        onSelectedIssueChange={(issue) =>
          setReportForm((prev) => ({ ...prev, issue }))
        }
        onOtherIssueChange={(otherIssue) =>
          setReportForm((prev) => ({ ...prev, otherIssue }))
        }
      />
    </FullHeightContainer>
  );
}

export default OrderDetails;
