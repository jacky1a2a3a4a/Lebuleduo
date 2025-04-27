import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import {
  MdArrowBackIosNew,
  MdLocationOn,
  MdAdd,
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
} from './styles';
import { TaskItem, ReportForm } from './types';

import ReportModal from './ReportModal'; // 異常回報組件
import Camera from '../../../components/common/Camera/Camera';
import StatusTagDeliver from '../../../components/deliver/StatusTagDeliver'; // 狀態標籤組件
import LoadingMessage from '../../../components/common/LoadingMessage'; // 載入中組件
import ErrorReport from '../../../components/common/ErrorReport'; //錯誤回報組件
import SuccessMessage from '../../../components/deliver/SuccessMessage'; // 完成收運組件
import { GoogleMapComponent } from '../../../components/common/GoogleMap';
import { TaskStatus } from '../../../types/deliver';
import { formatTime } from '../../../utils/formatTime';
import { getTodayOrderDetails } from '../../../apis/deliver/getTodayOrderDetails'; // api獲取當天特定任務詳情
import { getIssueText } from '../../../utils/getIssueText';

const userId = localStorage.getItem('UsersID'); // 從 localStorage 獲取使用者 ID

function OrderDetails() {
  const navigate = useNavigate();
  const { taskId } = useParams(); // 從 URL 獲取任務 ID

  const [task, setTask] = useState<TaskItem | null>(null); // 任務資料
  const [loading, setLoading] = useState(true); // 載入狀態
  const [error, setError] = useState<string | null>(null); // 錯誤訊息

  const [showCamera, setShowCamera] = useState(false); // 相機
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number | null>(
    null,
  ); // 當前照片索引
  const [isWebCameraSupported, setIsWebCameraSupported] = useState<
    boolean | null
  >(null); // 是否支援網頁相機

  const [actualWeight, setActualWeight] = useState<number | undefined>(
    undefined,
  ); // 實際重量
  const [driverPhotos, setDriverPhotos] = useState<string[]>([]); // 汪汪員拍攝照片
  const [showReportModal, setShowReportModal] = useState(false); // 異常回報視窗
  const [reportForm, setReportForm] = useState<ReportForm>({
    issue: null,
    otherIssue: '',
    isSubmitted: false,
    isCleared: false,
    lastSubmitted: null,
  }); // 異常回報表單狀態
  console.log('異常回報表單狀態:', reportForm);
  const [showSuccess, setShowSuccess] = useState(false); // 完成收運

  // 從 API 讀取任務資訊
  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        setLoading(true);
        const response = await getTodayOrderDetails(userId || '', taskId || ''); //api 獲取當天特定任務詳情
        console.log('原始任務資訊:', response.result.Orders[0]);

        if (response.status && response.result.Orders.length > 0) {
          const apiTask = response.result.Orders[0];
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
            weight: apiTask.PlanKG,
            liter: apiTask.Liter,
            dropPointPhotos: apiTask.Photo?.map(
              (photo) => `${import.meta.env.VITE_API_URL}${photo}`,
            ),
            driverPhotos: apiTask.DriverPhotos,
            actualWeight: apiTask.KG,
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
    // 檢查是否有上一頁的歷史記錄
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      // 如果沒有歷史記錄，則導航到首頁
      navigate('/deliver');
    }
  };

  // === 實際重量變更 ===
  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value); //將字串轉換成浮點小數
    setActualWeight(isNaN(value) ? undefined : value);
    console.log('實際重量:', actualWeight);

    // 如果實際重量超過方案重量，自動設定異常回報
    if (task && value > task.weight) {
      setReportForm((prev) => ({
        ...prev,
        issue: '1',
        isSubmitted: true,
        isCleared: false,
        lastSubmitted: {
          issue: '1',
          otherIssue: prev.lastSubmitted?.otherIssue || '',
        },
      }));
    } else if (task && value <= task.weight && reportForm.issue === '1') {
      // 如果重量在方案範圍內且當前選取了異常回報選項1，則取消異常回報
      setReportForm((prev) => ({
        ...prev,
        issue: null,
        isSubmitted: false,
        isCleared: false,
        lastSubmitted: {
          issue: null,
          otherIssue: prev.lastSubmitted?.otherIssue || '',
        },
      }));
    }
  };

  // === 開啟相機(決定使用網頁還是手機相機) ===
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
            // 檢查檔案大小（5MB = 5 * 1024 * 1024 bytes）
            if (file.size > 5 * 1024 * 1024) {
              alert('照片大小不能超過 5MB');
              return;
            }
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

  // === 拍照 ===
  const handleTakePhoto = useCallback(
    (photoData: string) => {
      if (currentPhotoIndex !== null) {
        const newPhotos = [...driverPhotos];
        newPhotos[currentPhotoIndex] = photoData;
        setDriverPhotos(newPhotos);
      }
    },
    [currentPhotoIndex, driverPhotos],
  );

  // === 刪除照片 ===
  const handleDeletePhoto = useCallback(
    (index: number) => {
      const newPhotos = [...driverPhotos];
      newPhotos[index] = '';
      setDriverPhotos(newPhotos);
    },
    [driverPhotos],
  );

  // === 提交異常回報 ===
  const handleReportSubmit = async (issue: string, otherIssue: string) => {
    try {
      setReportForm({
        issue: issue || null,
        otherIssue: otherIssue || '',
        isSubmitted: true,
        isCleared: false,
        lastSubmitted: {
          issue: issue || null,
          otherIssue: otherIssue || '',
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
    // 只有在沒有清除標記時才恢復上次的內容
    if (!reportForm.isCleared) {
      setReportForm((prev) => ({
        ...prev,
        isSubmitted: false,
        issue: prev.lastSubmitted?.issue || null,
        otherIssue: prev.lastSubmitted?.otherIssue || '',
      }));
    } else {
      // 如果有清除標記，則重置所有狀態
      setReportForm({
        issue: null,
        otherIssue: '',
        isSubmitted: false,
        isCleared: false,
        lastSubmitted: null,
      });
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
      const orderStatusText = orderStatus === 5 ? '異常' : '已完成';

      // 建立 FormData
      const formData = new FormData();
      formData.append('KG', actualWeight?.toString() || '');
      formData.append('OrderStatus', orderStatusText);

      // 確保異常回報的值被正確加入
      if (reportForm.issue && reportForm.isSubmitted) {
        formData.append('CommonIssues', reportForm.issue);
      }
      if (reportForm.otherIssue && reportForm.isSubmitted) {
        formData.append('IssueDescription', reportForm.otherIssue);
      }

      // 添加照片
      driverPhotos.filter(Boolean).forEach((photo, index) => {
        // 將 base64 轉換為 Blob
        const base64Data = photo.split(',')[1];
        const byteCharacters = atob(base64Data);
        const byteArrays = [];
        for (let i = 0; i < byteCharacters.length; i++) {
          byteArrays.push(byteCharacters.charCodeAt(i));
        }
        const byteArray = new Uint8Array(byteArrays);
        const blob = new Blob([byteArray], { type: 'image/jpeg' });
        formData.append(`DriverImageUrl`, blob, `photo_${index}.jpg`);
      });

      console.log('準備發送的請求資料:', {
        taskId,
        formData,
      });

      // 更新訂單狀態
      const response = await axios.put(
        `api/PUT/driver/orders/${taskId}/weight`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      if (response.data.status) {
        console.log('完成收運成功:', {
          actualWeight,
          driverPhotos,
          reportForm,
          orderStatusText,
        });
        setShowSuccess(true);
      } else {
        throw new Error(response.data.message || '完成收運失敗');
      }
    } catch (error) {
      console.error('完成收運失敗:', error);
      if (axios.isAxiosError(error) && error.response) {
        console.error('API 錯誤詳情:', {
          status: error.response.status,
          data: error.response.data,
          headers: error.response.headers,
        });
        setError(`完成收運失敗: ${error.response.data.message || '請重試'}`);
      } else {
        setError('完成收運失敗，請重試');
      }
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
    return <ErrorReport error={error} />;
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
        <Camera
          onPhotoTaken={handleTakePhoto}
          onClose={() => setShowCamera(false)}
        />
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
        setReportForm={setReportForm}
      />
    </FullHeightContainer>
  );
}

export default OrderDetails;
