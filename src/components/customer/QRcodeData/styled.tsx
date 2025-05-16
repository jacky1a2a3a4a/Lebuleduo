import styled from 'styled-components';
import { DownloadButton } from '../../common/QRCodeDownloader/styled';

export const QRCodePage = styled.div`
  background-color: var(--color-white);
  width: 100%;
  height: 100%;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: var(--color-neutral-100);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--color-neutral-300);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: var(--color-neutral-400);
  }
`;

export const QRCodeContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto auto;
  height: 80vh;
`;

export const QRCodeTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  .title {
    color: var(--color-text-primary);
    margin-bottom: var(--spacing-xs);
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-bold);
  }

  .order-number {
    color: var(--color-text-secondary);
    font-size: var(--font-size-3xs);
  }
`;

// === QRCodeList ===
export const QRCodeList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
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
  width: 100%;

  > div {
    width: 100%;
    height: 100%;
    max-width: 150px;
    max-height: 150px;
  }
`;

export const TaskInfo = styled.p`
  color: var(--color-text-tertiary);
  margin-top: var(--spacing-3xs);
  font-size: var(--font-size-3xs);
`;

export const CustomQRCodeDownloadButton = styled(DownloadButton)`
  margin-top: var(--spacing-2xs);
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-sm) 0;
`;

export const PageButton = styled.button`
  width: 18px;
  height: 18px;
  border: 1px solid var(--color-primary);
  border-radius: 50%;
  background-color: var(--color-white);
  color: var(--color-primary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-xs);
  transition: all 0.2s ease-in-out;

  svg {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 10px;
    height: 10px;
  }

  &:disabled {
    border-color: var(--color-gray-300);
    color: var(--color-gray-300);
    cursor: not-allowed;
  }
`;

export const PageInfo = styled.span`
  color: var(--color-text-secondary);
  font-size: var(--font-size-2xs);
`;
