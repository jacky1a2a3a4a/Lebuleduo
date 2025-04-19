import styled from 'styled-components';
import { HiOutlineCheckCircle } from 'react-icons/hi2';

// ===最外層 大容器===
export const ContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 0 auto;
  width: var(--mobile-min-width);
  height: 100vh;
  overflow: hidden;
`;

// ===任務區塊===
export const TaskContainer = styled.div`
  background-color: var(--color-background-secondary);
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  padding: var(--spacing-md);
`;


export const StatusCard = styled.div`
  background-color: var(--color-white);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-md);
`;

export const StatusHeader = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
`;

export const StatusIcon = styled(HiOutlineCheckCircle)`
  color: var(--color-success);
  width: 24px;
  height: 24px;
`;

export const StatusText = styled.span`
  color: var(--color-success);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
`;

export const DetailList = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
`;

export const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: var(--spacing-sm) 0;
  border-bottom: 1px solid var(--color-border);

  &:last-child {
    border-bottom: none;
  }
`;

export const Label = styled.span`
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
`;

export const Value = styled.span`
  color: var(--color-text-primary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
`;

export const PhotoSection = styled.div`
  background-color: var(--color-white);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-lg);
`;

export const PhotoTitle = styled.h2`
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-md);
`;

export const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-sm);
`;

export const Photo = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: var(--border-radius-md);
`;

export const OrderListCardContainer = styled.div<{ $status: string }>`
  background-color: var(--color-white);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-md);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;


export const CardItem = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
`;

export const IconStyledLarge = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-primary-light);
  border-radius: 50%;
  color: var(--color-primary);
`;

export const Date = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
`;

export const DateDisplay = styled.span`
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
`;

export const TimeRange = styled.span`
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
`;

export const OrderStatus = styled.div`
  flex: 1;
`;

export const OrderStatusText = styled.span<{ $status: string }>`
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-bold);
  color: ${(props) => {
    switch (props.$status) {
      case 'normal':
        return 'var(--color-primary)';
      case 'completed':
        return 'var(--color-success)';
      case 'cancelled':
        return 'var(--color-error)';
      default:
        return 'var(--color-text-primary)';
    }
  }};
`;

export const ActionButton = styled.button<{ $status: string }>`
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius-md);
  border: none;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  background-color: ${(props) => {
    switch (props.$status) {
      case 'normal':
        return 'var(--color-primary)';
      case 'completed':
        return 'var(--color-success)';
      case 'cancelled':
        return 'var(--color-error)';
      default:
        return 'var(--color-primary)';
    }
  }};
  color: var(--color-white);
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

export const IconStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
