import styled from 'styled-components';

// ===最外層容器===
export const OrderTaskStatusCardContainer = styled.div<{ $status: string }>`
  background-color: var(--color-white);
  border: 1px solid var(--color-neutral-200);
  border-radius: var(--border-radius-lg);

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: var(--spacing-md);
  margin-bottom: var(--spacing-md);
  box-shadow: var(--shadow-sm);
`;

// ===卡片內容區塊===
export const CardItem = styled.div`
  display: flex;
  align-items: center;
`;

// ===卡片內容區塊===
export const IconStyledLarge = styled.div`
  color: var(--color-text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: var(--spacing-md);

  font-size: var(--font-size-lg);
`;

// ===日期區塊===
export const Date = styled.div`
  color: var(--color-text-primary);

  display: flex;
  flex-direction: column;
`;

// 日期
export const DateDisplay = styled.span`
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
`;

//時間範圍
export const TimeRange = styled.span`
  font-size: var(--font-size-sm);
`;

// 狀態容器
export const OrderStatus = styled.div`
  background-color: var(--color-neutral-200);
  border: 2px solid var(--color-neutral-300);
  border-radius: var(--border-radius-round);

  display: flex;
  align-items: center;
  justify-content: center;

  padding: var(--spacing-xs) var(--spacing-sm);
`;

// 狀態文字
export const OrderStatusText = styled.span<{ $status: string }>`
  color: ${(props) => {
    switch (props.$status) {
      case 'normal':
        return 'var(--color-primary)';
      case '已完成':
        return 'var(--color-neutral-400)';
      case '已取消':
        return 'var(--color-error)';
      default:
        return 'var(--color-text-primary)';
    }
  }};
  
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
`;
