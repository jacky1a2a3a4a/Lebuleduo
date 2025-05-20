import styled from 'styled-components';

// 底部資訊 最外層大容器
export const BottomInfoContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.md};
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

// 底部空白容器 增加高度 避免遮擋上方資訊
export const ContentWrapper = styled.div`
  padding-bottom: calc(${({ theme }) => theme.spacing.md} * 2 + 70px); // 60px 是底部按鈕的大致高度
`;

export const TotalPrice = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const TotalPriceText = styled.span`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
`;

export const TotalPriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const TotalPriceTCount = styled.span<{ $isActive: boolean }>`
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.primary.main : theme.colors.secondary};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};

  margin-right: ${({ theme }) => theme.spacing.sm};
`;

export const PriceDetails = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-top: ${({ theme }) => theme.spacing[4]};
`;

export const OriginalPriceText = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  color: ${({ theme }) => theme.colors.gray[500]};
  text-decoration: line-through;
`;

export const DiscountText = styled.span`
  color: ${({ theme }) => theme.colors.error.main};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
`;

export const SubscribeNextButton = styled.button<{ $active: boolean }>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.primary.main : theme.colors.gray[300]};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.round};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  cursor: ${({ $active }) => ($active ? 'pointer' : 'not-allowed')};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ $active, theme }) =>
      $active ? theme.colors.primary.hover : theme.colors.gray[400]};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray[300]};
    cursor: not-allowed;
  }
`;
