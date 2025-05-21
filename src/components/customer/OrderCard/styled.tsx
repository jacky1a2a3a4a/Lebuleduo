import styled from 'styled-components';

export const OrderCardLayout = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 2fr;
  width: 100%;
`;

export const OrderPhotoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: ${({ theme }) => theme.spacing[12]};
  width: 100%;
`;

export const OrderPhotoImage = styled.img`
  object-fit: cover;
  width: 100%;
  aspect-ratio: 3/4;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
`;

export const OrderPhoto = styled.div`
  background-color: ${({ theme }) => theme.colors.gray[200]};
  color: ${({ theme }) => theme.colors.gray[400]};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  aspect-ratio: 3/4;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
`;

export const OrderCardData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  overflow: hidden;
  width: 100%;
`;

export const OrderCardTitle = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  margin-bottom: ${({ theme }) => theme.spacing[12]};
`;

export const OrderCardItems = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const OrderCardItem = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const OrderCardSubtitle = styled.div<{ $primary?: boolean }>`
  color: ${({ $primary, theme }) =>
    $primary ? theme.colors.primary.main : theme.colors.neutral[400]};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  min-width: 70px;
  flex-shrink: 0;
`;

export const OrderCardDetail = styled.div<{ $primary?: boolean }>`
  color: ${({ $primary, theme }) =>
    $primary ? theme.colors.primary.main : theme.colors.neutral[400]};
  text-align: right;
  overflow: hidden;
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  flex: 1;
  white-space: nowrap;
  text-overflow: ellipsis;
`; 