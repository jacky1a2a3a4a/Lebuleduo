import { MdError } from 'react-icons/md';
import {
  OrderCardLayout,
  OrderPhotoContainer,
  OrderPhotoImage,
  OrderPhoto,
  OrderCardData,
  OrderCardTitle,
  OrderCardItems,
  OrderCardItem,
  OrderCardSubtitle,
  OrderCardDetail,
} from './styled';

type OrderCardContentProps = {
  OrdersID: number;
  PlanName: string;
  PlanKG: number;
  Liter: number;
  Photos: string[];
  StartDate: string;
  EndDate: string;
  NextServiceDate?: string;
  RemainingCount?: number;
  onClick: (orderId: number) => void;
  isCurrent?: boolean;
};

const OrderCardContent = ({
  OrdersID,
  PlanName,
  PlanKG,
  Liter,
  Photos,
  StartDate,
  EndDate,
  NextServiceDate,
  RemainingCount,
  onClick,
  isCurrent = false,
}: OrderCardContentProps) => {
  const BASE_URL = import.meta.env.VITE_API_URL;

  return (
    <OrderCardLayout onClick={() => onClick(OrdersID)}>
      <OrderPhotoContainer>
        {Photos && Photos.length > 0 ? (
          <OrderPhotoImage
            src={`${BASE_URL}${Photos[0]}`}
            alt="訂單商品"
          />
        ) : (
          <OrderPhoto>
            <MdError />
          </OrderPhoto>
        )}
      </OrderPhotoContainer>

      <OrderCardData>
        <OrderCardTitle>
          {PlanName} {Liter}L/{PlanKG}kg
        </OrderCardTitle>
        <OrderCardItems>
          {isCurrent && (
            <>
              <OrderCardItem>
                <OrderCardSubtitle $primary>下次收運</OrderCardSubtitle>
                <OrderCardDetail $primary>{NextServiceDate}</OrderCardDetail>
              </OrderCardItem>

              <OrderCardItem>
                <OrderCardSubtitle $primary>剩餘次數</OrderCardSubtitle>
                <OrderCardDetail $primary>{RemainingCount}</OrderCardDetail>
              </OrderCardItem>
            </>
          )}

          <OrderCardItem>
            <OrderCardSubtitle>開始時間</OrderCardSubtitle>
            <OrderCardDetail>{StartDate}</OrderCardDetail>
          </OrderCardItem>

          <OrderCardItem>
            <OrderCardSubtitle>結束時間</OrderCardSubtitle>
            <OrderCardDetail>{EndDate}</OrderCardDetail>
          </OrderCardItem>
        </OrderCardItems>
      </OrderCardData>
    </OrderCardLayout>
  );
};

export default OrderCardContent; 