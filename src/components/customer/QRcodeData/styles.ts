import styled from 'styled-components';

export const QRCodePage = styled.div`
  background-color: var(--color-white);
  width: 100%;
  min-height: 80vh;
  overflow: auto;
`;

export const QRCodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const QRCodeTitle = styled.h2`
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-sm);
  font-size: var(--font-size-md);
`;

export const OrderNumber = styled.p`
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-md);
  font-size: var(--font-size-xs);
`;

// === QRCodeList ===
export const QRCodeList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-md);
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-sm);
`;

export const QRCodeItem = styled.div`
  background-color: var(--color-white);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--spacing-sm);
  border: 1px solid var(--color-neutral-300);
  border-radius: var(--border-radius-md);
  box-shadow: var(--card-shadow);
  min-width: 0;
  width: 100%;
  height: 100%;

  > div {
    width: 100%;
    height: 100%;
    max-width: 150px;
    max-height: 150px;
  }
`;

export const TaskInfo = styled.p`
  color: var(--color-text-tertiary);
  margin-top: var(--spacing-xs);
  font-size: var(--font-size-xs);
`;

export const DownloadButton = styled.button`
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: var(--color-primary);
  color: var(--color-white);
  border: none;
  border-radius: var(--border-radius-md);
  cursor: pointer;
  font-size: var(--font-size-md);
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--color-primary-hover);
  }
`;
