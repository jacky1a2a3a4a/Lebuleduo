import { OrderList, OrderCard } from './styled';
import type { ApiCurrentOrder } from '../../../pages/customer/MyOrder/types';

import OrderCardContent from '../OrderCard';

type CurrentOrderListProps = {
  orders: ApiCurrentOrder[];
  onOrderClick: (orderId: number) => void;
};

const CurrentOrderList = ({ orders, onOrderClick }: CurrentOrderListProps) => {
  if (orders.length === 0) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>無當前訂單</div>;
  }

  return (
    <OrderList>
      {orders.map((order) => (
        <OrderCard key={order.OrdersID}>
          <OrderCardContent
            {...order}
            onClick={onOrderClick}
            isCurrent={true}
          />
        </OrderCard>
      ))}
    </OrderList>
  );
};

export default CurrentOrderList; 