import styled from 'styled-components';
import { DownloadButton } from '../../../components/common/QRCodeDownloader/styled';

// 最外層容器
export const PageWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  display: flex;
  height: 100vh;
  max-width: ${({ theme }) => theme.breakpoints.mobile};
  margin: 0 auto;
`;

// 成功訊息容器
export const SuccessContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.lg};
`;

// 成功圖片
export const SuccessImage = styled.img`
  width: 120px;
  height: auto;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

// 成功標題
export const SuccessTitle = styled.h1`
  color: ${({ theme }) => theme.colors.primary.main};
  font-size: ${({ theme }) => theme.typography.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

// 成功副標題
export const SuccessSubtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  color: ${({ theme }) => theme.colors.gray[500]};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

// 訂單信息容器
export const OrderInfoContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.gray[0]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  box-shadow: ${({ theme }) => theme.shadows.card};
  width: 100%;
  padding: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

// 訂單號碼
export const OrderNumber = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  text-align: center;
`;

// 訂單詳情項
export const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  &:last-child {
    margin-bottom: 0;
  }
`;

// 訂單項目標籤
export const OrderItemLabel = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.gray[400]};
`;

// 訂單項目值
export const OrderItemValue = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.gray[600]};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
`;

// 分隔線
export const Divider = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.gray[200]};
  margin: ${({ theme }) => theme.spacing.md} 0;
`;

// QR碼容器
export const QRCodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

// QR碼提示文字容器
export const QRcodeTextItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing['2xs']};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

// QR碼提示文字項目
export const QRCodeTextItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
`;

// 提示文字圖標
export const TextIcon = styled.div`
  color: ${({ theme }) => theme.colors.gray[600]};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
`;

// QR碼提示文字
export const QRCodeText = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  color: ${({ theme }) => theme.colors.gray[500]};
  text-align: left;
`;

// 按鈕容器
export const Buttons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.sm};
  width: 100%;
`;

// 返回按鈕
export const HomeButton = styled.button`
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.primary.main};
  border: 1px solid ${({ theme }) => theme.colors.primary.main};
  border-radius: ${({ theme }) => theme.borderRadius.round};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing[12]} ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[700]};
  }
`;

// 自定義 QR Code 下載按鈕
export const CustomQRCodeDownloadButton = styled(DownloadButton)`
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.round};
  padding: ${({ theme }) => theme.spacing[12]} ${({ theme }) => theme.spacing.lg};
  width: 100%;
  max-width: 100%;
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  white-space: nowrap;
  text-overflow: ellipsis;
  transition: all 0.3s ease;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
