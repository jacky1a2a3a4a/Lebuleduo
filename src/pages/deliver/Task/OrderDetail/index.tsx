import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { MdArrowBackIosNew, MdLocationOn } from 'react-icons/md';

import {
  FullHeightContainer,
  HeaderContainer,
  Title,
  NavTitle,
  IconStyled,
  NavTitleText,
  NavSubtitle,
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
  PageSubtitle,
  PlanContent,
  PageContent,
  PhotoContainer, 
  PhotoBox,
} from './styled';

import { TaskStatus } from '../../../../types/deliver';
import { formatTime } from '../../../../utils/formatTime';
import LoadingMessage from '../../../../components/common/LoadingMessage';
import StatusTagDeliver from '../../../../components/deliver/StatusTagDeliver';
import { GoogleMapComponent } from '../../../../components/common/GoogleMap';

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
};

const userId = localStorage.getItem('UsersID'); // 從 localStorage 獲取使用者 ID
const today = new Date().toISOString().split('T')[0]; // 獲取今天的日期

function OrderDetails() {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const [task, setTask] = useState<TaskItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 從 API 讀取任務資訊
  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `api/GET/driver/day/${userId}/${today}/${taskId}`,
        );
        console.log('API 原始任務資料:', response.data.result.Orders[0]);

        if (response.data.status && response.data.result.Orders.length > 0) {
          const apiTask = response.data.result.Orders[0];
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
  }, [taskId]);

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

  const handleBack = () => {
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
      </DetailCard>
    </FullHeightContainer>
  );
}

export default OrderDetails;
