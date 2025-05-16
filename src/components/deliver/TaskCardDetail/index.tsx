import { useEffect, useState } from 'react';
import { MdLocationOn, MdReportProblem } from 'react-icons/md';

import {
  FullHeightContainer,
  Title,
  DetailCard,
  CardSection,
  DetailRow,
  DetailFlex,
  DetailTime,
  DetailLabel,
  DetailSign,
  DetailValue,
  Divider,
  DetailImgContainer,
  DetailImg,
  DetailAddress,
  MapContainer,
  PlanTitle,
  PageTitle,
  PlanContent,
  PageContent,
  PhotoContainer,
  PhotoBox,
  ReportBlockTitle,
  ReportBlockContent,
  ReportBlock,
  ReportContent,
  ReportBlockDescription,
} from './styled';

import { TaskStatus } from '../../../types/deliver/TaskStatus';
import { formatTime } from '../../../utils/formatTime';
import { GoogleMapComponent } from '../../../components/common/GoogleMap';
import StatusTagDeliver from '../../../components/deliver/StatusTagDeliver';
import AnimationLoading from '../../../components/common/AnimationLoading';
import ErrorReport from '../../../components/common/ErrorReport';
import { getTomorrowDate } from '../../../utils/getDate';
import { getSpecificDayOrderDetails } from '../../../apis/deliver/getSpecificDayOrderDetails';

// 定義任務類型
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
  realWeight?: number;
  liter?: number;
  dropPointPhotos?: string[]; //放置點圖片
  driverPhotos?: string[]; //司機照片
  commonIssues?: string; //常見異常
  issueDescription?: string; //異常描述
};

interface TaskCardDetailProps {
  taskId: string;
  userId: string;
}

const TaskCardDetail = ({ taskId, userId }: TaskCardDetailProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [task, setTask] = useState<TaskItem | null>(null);
  const tomorrow = getTomorrowDate();

  // 從 API 讀取任務資訊
  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        setLoading(true);
        const response = await getSpecificDayOrderDetails(
          Number(userId),
          tomorrow,
          Number(taskId),
        );
        console.log('API 原始任務資料:', response?.Orders[0]);

        if (response && response.Orders.length > 0) {
          const apiTask = response.Orders[0];
          const TaskDetail: TaskItem = {
            id: apiTask.OrderDetailID, //ID
            number: apiTask.OrderDetailsNumber, //訂單編號
            status: mapApiStatusToTaskStatus(apiTask.Status),
            time: apiTask.ServiceTime || '',
            address: apiTask.Addresses || '',
            customerName: apiTask.CustomerName || '',
            phone: apiTask.OrderDetailsNumber || '',
            notes: apiTask.Notes || '',
            plan: apiTask.PlanName || '',
            weight: apiTask.PlanKG ? apiTask.PlanKG.toString() : '0',
            realWeight: apiTask.KG ? apiTask.KG.toString() : '0',
            liter: apiTask.Liter ? apiTask.Liter.toString() : '0',
            dropPointPhotos:
              apiTask.Photo?.map(
                (photo) => `${import.meta.env.VITE_API_URL}${photo}`,
              ) || [],
            driverPhotos:
              apiTask.DriverPhotos?.map(
                (photo) => `${import.meta.env.VITE_API_URL}${photo}`,
              ) || [],
            commonIssues: apiTask.CommonIssues || '無異常',
            issueDescription: apiTask.IssueDescription || '無異常詳細描述',
          };
          setTask(TaskDetail);
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

    if (taskId) {
      fetchTaskDetails();
    }
  }, [taskId, userId]);

  // 將 API 中文狀態轉換成英文映射到 TaskStatus.ts
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

  // 將異常回報的狀態數字轉換成文字
  const getIssueText = (issue: number) => {
    switch (issue) {
      case 1:
        return '垃圾量超過方案限制';
      case 2:
        return '未找到垃圾袋，用戶無回應';
      case 3:
        return '無 QR 碼，用戶無回應';
      case 4:
        return '垃圾袋破損嚴重';
      case 5:
        return '面交未見用戶，已聯絡無回應';
      default:
        return issue;
    }
  };

  // 載入狀態
  if (loading) {
    return <AnimationLoading />;
  }

  // 錯誤狀態
  if (error) {
    return (
      <FullHeightContainer>
        <ErrorReport error={error} />
      </FullHeightContainer>
    );
  }

  if (!task) {
    return null;
  }

  return (
    <FullHeightContainer>
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
          {task.dropPointPhotos?.slice(0, 2).map((photo, index) => (
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
          <PageTitle>實際重量</PageTitle>
          <PageContent>
            {['scheduled', 'ongoing', 'arrived'].includes(task.status)
              ? '待填寫'
              : `${task.realWeight} kg`}
          </PageContent>
        </CardSection>

        <CardSection>
          <PageTitle>照片記錄</PageTitle>
          <PhotoContainer>
            {['scheduled', 'ongoing', 'arrived'].includes(task.status)
              ? '待上傳'
              : task.driverPhotos?.map((photo, index) => (
                  <PhotoBox key={index}>
                    <img src={photo} alt={`汪汪員拍攝照片 ${index + 1}`} />
                  </PhotoBox>
                ))}
          </PhotoContainer>
        </CardSection>

        {task.status === 'abnormal' && (
          <>
            <ReportBlockTitle>
              <MdReportProblem />
              異常回報
            </ReportBlockTitle>

            <ReportBlock>
              <ReportContent>
                <ReportBlockContent>
                  {getIssueText(Number(task.commonIssues))}
                </ReportBlockContent>
                <ReportBlockDescription>
                  {task.issueDescription}
                </ReportBlockDescription>
              </ReportContent>
            </ReportBlock>
          </>
        )}
      </DetailCard>
    </FullHeightContainer>
  );
};

export default TaskCardDetail;
