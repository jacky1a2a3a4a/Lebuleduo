import styled from 'styled-components';

// 登入頁面 最外層容器
export const CallbackContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background.secondary};
  padding: ${({ theme }) => theme.spacing.lg};
`;

// 登入頁面 載入中
export const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid ${({ theme }) => theme.colors.gray[200]};
  border-top: 5px solid ${({ theme }) => theme.colors.primary.main};
  border-radius: ${({ theme }) => theme.borderRadius.round};
  animation: spin 1s linear infinite;
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

// 登入頁面 訊息
export const Message = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

// 登入頁面 錯誤訊息
export const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.red[500]};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  margin: ${({ theme }) => theme.spacing.sm} 0;
`;

// 除錯資訊區塊
export const DebugSection = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.card};
  width: 100%;
  max-width: 600px;

  h3 {
    color: ${({ theme }) => theme.colors.text.primary};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

// 除錯資訊內容
export const DebugInfo = styled.div`
  font-family: monospace;
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.tertiary};
  line-height: 1.5;

  div {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }

  strong {
    color: ${({ theme }) => theme.colors.text.primary};
    margin-right: ${({ theme }) => theme.spacing.sm};
  }

  pre {
    background-color: ${({ theme }) => theme.colors.background.secondary};
    padding: ${({ theme }) => theme.spacing.sm};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    overflow-x: auto;
    margin-top: ${({ theme }) => theme.spacing['2xs']};
  }
`;
