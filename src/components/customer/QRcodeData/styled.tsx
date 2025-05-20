import styled from 'styled-components';
import { DownloadButton } from '../../common/QRCodeDownloader/styled';

export const QRCodePage = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  width: 100%;
  height: 100%;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.neutral[100]};
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.neutral[300]};
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.neutral[400]};
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
    color: ${({ theme }) => theme.colors.text.primary};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
    font-size: ${({ theme }) => theme.typography.fontSizes.md};
    font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  }

  .order-number {
    color: ${({ theme }) => theme.colors.text.secondary};
    font-size: ${({ theme }) => theme.typography.fontSizes['3xs']};
  }
`;

// === QRCodeList ===
export const QRCodeList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md};
`;

export const QRCodeItem = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.neutral[300]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.card};
  width: 100%;

  > div {
    width: 100%;
    height: 100%;
    max-width: 150px;
    max-height: 150px;
  }
`;

export const TaskInfo = styled.p`
  color: ${({ theme }) => theme.colors.text.tertiary};
  margin-top: ${({ theme }) => theme.spacing['3xs']};
  font-size: ${({ theme }) => theme.typography.fontSizes['3xs']};
`;

export const CustomQRCodeDownloadButton = styled(DownloadButton)`
  margin-top: ${({ theme }) => theme.spacing['2xs']};
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => `${theme.spacing.sm} 0`};
`;

export const PageButton = styled.button`
  width: 18px;
  height: 18px;
  border: 1px solid ${({ theme }) => theme.colors.primary.main};
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.primary.main};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  transition: all 0.2s ease-in-out;

  svg {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 10px;
    height: 10px;
  }

  &:disabled {
    border-color: ${({ theme }) => theme.colors.gray[300]};
    color: ${({ theme }) => theme.colors.gray[300]};
    cursor: not-allowed;
  }
`;

export const PageInfo = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSizes['2xs']};
`;
