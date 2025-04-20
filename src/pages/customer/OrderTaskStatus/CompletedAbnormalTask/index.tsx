import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { ContainerStyled } from '../../../../components/customer/OrderTaskStatusContainer/ContainerStyled/index.tsx'; //容器樣式
import { TaskContainer } from '../../../../components/customer/OrderTaskStatusContainer/TaskContainer/index.tsx'; //任務區塊
import OrderNavHeader from '../../../../components/customer/OrderNavHeader/index.tsx'; //導航標題
import OrderTaskStatusCard from '../../../../components/customer/OrderTaskStatusCard/index.tsx'; //訂單任務詳情卡片
import OrderTaskStatusRecordTitle from '../../../../components/customer/OrderTaskStatusRecord/Title/index.tsx'; //收運紀錄標題
import OrderTaskStatusRecordContainer from '../../../../components/customer/OrderTaskStatusRecord/Container/index.tsx'; //收運紀錄容器
import OrderTaskStatusRecordDetail from '../../../../components/customer/OrderTaskStatusRecord/Detail/index.tsx'; //收運紀錄詳情
import OrderTaskStatusRecordStatus from '../../../../components/customer/OrderTaskStatusRecord/Status/index.tsx'; //收運紀錄狀態
import OrderTaskStatusRecordPhotos from '../../../../components/customer/OrderTaskStatusRecord/Photos/index.tsx'; //收運紀錄照片
import AdditionalFee from '../../../../components/customer/OrderTaskStatusRecord/AdditionalFee/index.tsx'; //補繳金額
import Loading from '../../../../components/common/LoadingMessage/index.tsx'; //加載中

// 訂單詳情
interface OrderDetail {
  Addresses: string;
  EndDate: string;
  Liter: number;
  NextServiceDate: string;
  Notes: string;
  OrderDetails: OrderTaskDetail[];
  OrderNumber: string;
  OrdersID: number;
  Photos: string[];
  PlanKG: number;
  PlanName: string;
  RemainingCount: number;
  StartDate: string;
  TotalCount: number;
  WeekDay: string;
}

// 訂單任務詳情
interface OrderTaskDetail {
  OrderDetailID: number;
  ServiceDate: string;
  DriverTime: string | null;
  Status: string;
  DriverPhoto: string[];
  KG: number | null;
  OngoingAt: string | null;
  ArrivedAt: string | null;
  CompletedAt: string | null;
}

function CompletedAbnormalTask() {
  const userId = localStorage.getItem('UsersID'); //獲取使用者ID
  const { orderId, orderDetailId } = useParams(); //從URL獲取訂單ID

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [orderDetail, setOrderDetail] = useState<OrderDetail | null>(null); //訂單詳情
  const [orderTaskDetail, setOrderTaskDetail] =
    useState<OrderTaskDetail | null>(null); //訂單任務詳情
  const [status, setStatus] = useState('錯誤');
  const [date, setDate] = useState('錯誤');
  const [time, setTime] = useState('錯誤');

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const response = await axios.get(
          `api/GET/user/orders/completed/${userId}/${orderId}`,
        );
        const data = response.data;
        console.log('API Response:', data);

        if (!data || !data.result || !Array.isArray(data.result)) {
          throw new Error('無效的數據格式');
        }

        // ===設定訂單詳情===
        const orderDetailData = data.result[0];
        setOrderDetail(orderDetailData);
        console.log('OrderDetail 訂單詳情：', orderDetailData);

        // ===設定訂單任務詳情===
        let orderTaskDetailData = null;

        if (
          orderDetailData.OrderDetails &&
          Array.isArray(orderDetailData.OrderDetails)
        ) {
          orderTaskDetailData = orderDetailData.OrderDetails.find(
            (item: OrderTaskDetail) =>
              item.OrderDetailID === parseInt(orderDetailId || '0'),
          );
        } else {
          console.warn('訂單任務詳情不存在或格式不正確');
          // 如果沒有 OrderDetails，嘗試從 orderDetailData 中直接獲取所需資訊
          orderTaskDetailData = {
            OrderDetailID: parseInt(orderDetailId || '0'),
            ServiceDate: orderDetailData.StartDate,
            DriverTime: null,
            Status: '異常',
            DriverPhoto: orderDetailData.Photos || [],
            KG: null,
            OngoingAt: null,
            ArrivedAt: null,
            CompletedAt: orderDetailData.EndDate,
          };
        }

        setOrderTaskDetail(orderTaskDetailData);
        console.log('OrderTaskDetail 訂單任務詳情：', orderTaskDetailData);

        // 更新相關狀態
        setStatus(orderTaskDetailData?.Status || '錯誤');
        setDate(orderTaskDetailData?.ServiceDate || '錯誤');
        setTime(orderTaskDetailData?.DriverTime || '錯誤');

        setLoading(false);
      } catch (error) {
        console.error('獲取訂單詳情失敗：', error);
        setError('獲取訂單詳情失敗，請稍後再試');
        setLoading(false);
      }
    };

    if (userId && orderId) {
      fetchOrderDetail();
    } else {
      setError('缺少必要的參數');
      setLoading(false);
    }
  }, [orderId, userId, orderDetailId]);

  // 加載中
  if (loading) {
    return <Loading />;
  }

  // 錯誤
  if (error) {
    return <div>{error}</div>;
  }

  // 找不到訂單詳情
  if (!orderDetail) {
    return <div>找不到訂單詳情</div>;
  }

  // 方案詳情紀錄
  const recordDetails = [
    {
      label: '訂閱方案',
      value: `${orderDetail.PlanName} ${orderDetail.PlanKG}kg / ${orderDetail.Liter}L`,
    },
    {
      label: '實際重量',
      value: orderTaskDetail?.KG ? `${orderTaskDetail.KG} kg` : '-',
      // 是否超重
      isOverweight:
        orderTaskDetail?.KG && orderTaskDetail.KG > orderDetail.PlanKG,
    },
    { label: '備註', value: orderDetail.Notes },
  ];

  // 收運紀錄步驟
  const steps = [
    {
      title: '前往中',
      time: orderTaskDetail?.OngoingAt || '尚未前往',
      isCompleted: !!orderTaskDetail?.OngoingAt,
    },
    {
      title: '已抵達',
      time: orderTaskDetail?.ArrivedAt || '尚未抵達',
      isCompleted: !!orderTaskDetail?.ArrivedAt,
    },
    {
      title: '異常回報',
      time: orderTaskDetail?.CompletedAt || '尚未完成',
      isCompleted: !!orderTaskDetail?.CompletedAt,
    },
    {
      title: '已完成',
      time: orderTaskDetail?.CompletedAt || '尚未完成',
      isCompleted: !!orderTaskDetail?.CompletedAt,
      isLast: true,
    },
  ];

  // 計算是否超重(測試)
  const isOverweight = true;
  // orderTaskDetail?.KG && orderTaskDetail.KG > orderDetail.PlanKG;
  const overweightAmount = 2;
  // isOverweight
  //   ? orderTaskDetail.KG - orderDetail.PlanKG
  //   : 0;

  return (
    <ContainerStyled>
      {/* 導航標題 */}
      <OrderNavHeader
        title="異常任務"
        orderNumber={orderDetail?.OrderNumber || '未知訂單號'}
      />

      <TaskContainer>
        {/* 訂單任務詳情 */}
        <OrderTaskStatusCard
          status={status}
          date={date}
          time={time}
          isOverweight={isOverweight}
        />

        <OrderTaskStatusRecordTitle title="收運紀錄" />
        <OrderTaskStatusRecordContainer isOverweight={isOverweight}>
          <OrderTaskStatusRecordDetail
            details={recordDetails}
            isOverweight={isOverweight}
          />
          {isOverweight && (
            <AdditionalFee overweightAmount={overweightAmount} />
          )}
          <OrderTaskStatusRecordStatus steps={steps} />
          <OrderTaskStatusRecordPhotos
            photos={orderTaskDetail?.DriverPhoto || []}
          />
        </OrderTaskStatusRecordContainer>
      </TaskContainer>
    </ContainerStyled>
  );
}

export default CompletedAbnormalTask;
