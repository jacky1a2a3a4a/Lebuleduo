import { OrderList, OrderCard } from './styled';
import OrderCardContent from '../OrderCard';
import type { ApiCompletedOrder } from '../../../pages/customer/MyOrder/types';

type CompletedOrderListProps = {
  orders: ApiCompletedOrder[];
  onOrderClick: (orderId: number) => void;
};

const CompletedOrderList = ({ orders, onOrderClick }: CompletedOrderListProps) => {
  if (orders.length === 0) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>無已完成訂單</div>;
  }

  return (
    <OrderList>
      {orders.map((order) => (
        <OrderCard key={order.OrdersID}>
          <OrderCardContent
            {...order}
            onClick={onOrderClick}
            isCurrent={false}
          />
        </OrderCard>
      ))}
    </OrderList>
  );
};

export default CompletedOrderList; 