import styled from 'styled-components';

// 登入頁面 最外層容器
export const CallbackContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
`;

// 登入頁面 載入中
export const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;

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
  font-size: 18px;
  color: #333;
  margin-bottom: 10px;
`;

// 登入頁面 錯誤訊息
export const ErrorMessage = styled.p`
  color: #e74c3c;
  font-size: 16px;
  margin: 10px 0;
`;

// 除錯資訊區塊
export const DebugSection = styled.div`
  margin-top: 30px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;

  h3 {
    color: #333;
    margin-bottom: 15px;
  }
`;

// 除錯資訊內容
export const DebugInfo = styled.div`
  font-family: monospace;
  font-size: 14px;
  color: #666;
  line-height: 1.5;

  div {
    margin-bottom: 10px;
  }

  strong {
    color: #333;
    margin-right: 10px;
  }

  pre {
    background-color: #f8f8f8;
    padding: 10px;
    border-radius: 4px;
    overflow-x: auto;
    margin-top: 5px;
  }
`;
