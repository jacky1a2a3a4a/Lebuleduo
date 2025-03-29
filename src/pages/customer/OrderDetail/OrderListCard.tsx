import styled from 'styled-components';
import { HiPencil } from 'react-icons/hi2';

// 訂單卡片容器
const OrderListCardContainer = styled.div`
  background-color: var(--color-gray-0);
  border: 1px solid var(--color-gray-300);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--card-shadow);
  padding: var(--spacing-md);
`;

// 收運日期項目
const OrderDateItems = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// 收運日期項目
const OrderDateItem = styled.div`
  display: flex;
  flex-direction: column;
`;

// 日期顯示元件
const DateDisplay = styled.div`
  color: var(--color-gray-800);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
`;

// 時間範圍
const TimeRange = styled.div`
  color: var(--color-gray-600);
  font-size: var(--font-size-sm);
`;

// 收運狀態
const OrderStatus = styled.div`
  display: flex;
  align-items: center;
`;

// 收運狀態文字
const StatusText = styled.div<{ isActive: boolean }>`
  color: ${({ isActive }) =>
    isActive ? 'var(--color-gray-800)' : 'var(--color-gray-500)'};
  font-size: var(--font-size-sm);
  font-weight: ${({ isActive }) =>
    isActive ? 'var(--font-weight-medium)' : 'var(--font-weight-normal)'};
`;

// 修改預約按鈕
const OrderChangeButton = styled.button`
  background-color: var(--color-gray-300);
  color: var(--color-gray-0);
  border-radius: var(--border-radius-round);
  display: flex;
  align-items: center;
  padding: var(--spacing-md);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--color-gray-100);
    color: var(--color-gray-800);
  }

  &:active {
    transform: scale(0.98);
  }

  svg {
    font-size: var(--font-size-md);
  }
`;

const IconStyled = styled.div`
  margin-right: var(--spacing-sm);
`;

type OrderListCardProps = {
  date: string;
  time: string;
  status: string;
  isActive: boolean;
};

function OrderListCard({ date, time, status, isActive }: OrderListCardProps) {
  return (
    <OrderListCardContainer>
      <OrderDateItems>
        <OrderDateItem>
          <DateDisplay>{date}</DateDisplay>
          <TimeRange>{time}</TimeRange>
        </OrderDateItem>
        <OrderStatus>
          <StatusText isActive={isActive}>{status}</StatusText>
        </OrderStatus>
        <OrderChangeButton>
          <IconStyled>
            <HiPencil />
          </IconStyled>
          修改預約
        </OrderChangeButton>
      </OrderDateItems>
    </OrderListCardContainer>
  );
}

export default OrderListCard;
