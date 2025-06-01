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
