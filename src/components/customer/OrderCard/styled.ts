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
  padding-right: var(--spacing-12);
  width: 100%;
`;

export const OrderPhotoImage = styled.img`
  object-fit: cover;
  width: 100%;
  aspect-ratio: 3/4;
  border-radius: var(--border-radius-lg);
`;

export const OrderPhoto = styled.div`
  background-color: var(--color-gray-200);
  color: var(--color-gray-400);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  aspect-ratio: 3/4;
  border-radius: var(--border-radius-lg);
  font-size: var(--font-size-xl);
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
  color: var(--color-text-primary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--spacing-12);
`;

export const OrderCardItems = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: var(--spacing-xs);
`;

export const OrderCardItem = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  gap: var(--spacing-xs);
`;

export const OrderCardSubtitle = styled.div<{ $primary?: boolean }>`
  color: ${({ $primary }) =>
    $primary ? 'var(--color-primary)' : 'var(--color-neutral-400)'};
  font-size: var(--font-size-xs);
  min-width: 70px;
  flex-shrink: 0;
`;

export const OrderCardDetail = styled.div<{ $primary?: boolean }>`
  color: ${({ $primary }) =>
    $primary ? 'var(--color-primary)' : 'var(--color-neutral-400)'};
  text-align: right;
  overflow: hidden;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  flex: 1;
  white-space: nowrap;
  text-overflow: ellipsis;
`; 