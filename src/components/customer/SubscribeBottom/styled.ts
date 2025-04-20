import styled from 'styled-components';

// 底部資訊 最外層大容器
export const BottomInfoContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--color-white);
  padding: var(--spacing-md);
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: var(--z-index-fixed);
`;

// 底部空白容器 增加高度 避免遮擋上方資訊
export const ContentWrapper = styled.div`
  padding-bottom: calc(
    var(--spacing-md) * 2 + 70px
  ); // 60px 是底部按鈕的大致高度
`;

export const TotalPrice = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
`;

export const TotalPriceText = styled.span`
  color: var(--color-text-primary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
`;

export const TotalPriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const TotalPriceTCount = styled.span<{ $isActive: boolean }>`
  color: ${({ $isActive }) =>
    $isActive ? 'var(--color-primary)' : 'var(--color-secondary)'};
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);

  margin-right: var(--spacing-sm);
`;

export const PriceDetails = styled.div`
  display: flex;
  gap: var(--spacing-xs);
  margin-top: var(--spacing-4);
`;

export const OriginalPriceText = styled.span`
  font-size: var(--font-size-xs);
  color: var(--color-gray-500);
  text-decoration: line-through;
`;

export const DiscountText = styled.span`
  color: var(--color-error-hover);
  font-size: var(--font-size-xs);
`;

export const SubscribeNextButton = styled.button<{ $active: boolean }>`
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: ${({ $active }) =>
    $active ? 'var(--color-primary)' : 'var(--color-gray-300)'};
  color: var(--color-white);
  border: none;
  border-radius: var(--border-radius-round);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
  cursor: ${({ $active }) => ($active ? 'pointer' : 'not-allowed')};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ $active }) =>
      $active ? 'var(--color-primary-hover)' : 'var(--color-gray-400)'};
  }

  &:disabled {
    background-color: var(--color-gray-300);
    cursor: not-allowed;
  }
`;
