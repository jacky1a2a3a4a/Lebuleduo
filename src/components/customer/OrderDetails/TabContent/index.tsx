import {
  OrderList,
  OrderListHeader,
  OrderListTitle,
  OrderListCal,
  TabContent,
} from './styles';

import OrderListCard from '../Card';

interface OrderData {
  OrdersID: number;
  OrderDetails: OrderDetail[];
}

interface OrderDetail {
  OrderDetailID: number;
  ServiceDate: string;
  ServiceTime: string;
  Status: string;
}

interface TabContentProps {
  activeTab: string;
  abnormalOrders: OrderDetail[];
  scheduledOrders: OrderDetail[];
  unscheduledOrders: OrderDetail[];
  completedOrders: OrderDetail[];
  totalOrders: number;
  orderData: OrderData;
}

const OrderDetailTabContent = ({
  activeTab,
  abnormalOrders,
  scheduledOrders,
  unscheduledOrders,
  completedOrders,
  totalOrders,
  orderData,
}: TabContentProps) => {
  // 渲染訂單列表
  const renderOrderList = (orders) => {
    // 如果是未排定任務或全部標籤下的未排定任務，則按照時間順序排序
    const sortedOrders =
      activeTab === '未排定' ||
      (activeTab === '全部' &&
        orders.some((order) => order.Status === '未排定'))
        ? [...orders].sort((a, b) => {
            // 將日期字串轉換為 Date 對象進行比較
            const dateA = new Date(a.ServiceDate.replace(/\//g, '-'));
            const dateB = new Date(b.ServiceDate.replace(/\//g, '-'));
            return dateA.getTime() - dateB.getTime();
          })
        : orders;

    return (
      <OrderList>
        {sortedOrders.map((order) => (
          <OrderListCard
            key={order.OrderDetailID}
            date={order.ServiceDate}
            time={order.ServiceTime}
            status={order.Status}
            orderDetailId={order.OrderDetailID}
            ordersId={orderData.OrdersID}
            usersId={parseInt(localStorage.getItem('UsersID') || '0')}
            onDateModified={() => {}}
          />
        ))}
      </OrderList>
    );
  };

  // 依照標籤，渲染對應任務區塊
  const renderTabContent = () => {
    switch (activeTab) {
      case '全部':
        return (
          <>
            {abnormalOrders.length > 0 && (
              <>
                <OrderListHeader>
                  <OrderListTitle>異常任務</OrderListTitle>
                </OrderListHeader>
                {renderOrderList(abnormalOrders)}
              </>
            )}
            {scheduledOrders.length > 0 && (
              <>
                <OrderListHeader>
                  <OrderListTitle>已排定任務</OrderListTitle>
                </OrderListHeader>
                {renderOrderList(scheduledOrders)}
              </>
            )}
            {unscheduledOrders.length > 0 && (
              <>
                <OrderListHeader>
                  <OrderListTitle>未排定任務</OrderListTitle>
                  <OrderListCal>
                    剩餘次數: {unscheduledOrders.length}/{totalOrders}
                  </OrderListCal>
                </OrderListHeader>
                {renderOrderList(unscheduledOrders)}
              </>
            )}
            {completedOrders.length > 0 && (
              <>
                <OrderListHeader>
                  <OrderListTitle>已結束任務</OrderListTitle>
                </OrderListHeader>
                {renderOrderList(completedOrders)}
              </>
            )}
          </>
        );
      case '已排定':
        return (
          <>
            <OrderListHeader>
              <OrderListTitle>已排定任務</OrderListTitle>
            </OrderListHeader>
            {renderOrderList(scheduledOrders)}
          </>
        );
      case '未排定':
        return (
          <>
            <OrderListHeader>
              <OrderListTitle>未排定任務</OrderListTitle>
              <OrderListCal>
                剩餘次數: {unscheduledOrders.length}/{totalOrders}
              </OrderListCal>
            </OrderListHeader>
            {renderOrderList(unscheduledOrders)}
          </>
        );
      case '已結束':
        return (
          <>
            <OrderListHeader>
              <OrderListTitle>已結束任務</OrderListTitle>
            </OrderListHeader>
            {renderOrderList(completedOrders)}
          </>
        );
      case '異常':
        return (
          <>
            <OrderListHeader>
              <OrderListTitle>異常任務</OrderListTitle>
            </OrderListHeader>
            {renderOrderList(abnormalOrders)}
          </>
        );
      default:
        return null;
    }
  };

  return <TabContent>{renderTabContent()}</TabContent>;
};

export default OrderDetailTabContent;
