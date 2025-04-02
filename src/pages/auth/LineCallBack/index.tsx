import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import {
  extractJsonFromPage,
  FINAL_REDIRECT,
} from '../../../services/lineAuth';

const LineCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleLineCallback = async () => {
      try {
        // 輸出調試信息
        console.log('LineCallback 組件啟動，處理 LINE 登入回調');
        console.log(
          '當前 URL 參數:',
          Object.fromEntries(searchParams.entries()),
        );

        // 嘗試從頁面提取 JSON 響應
        const jsonResponse = extractJsonFromPage();
        console.log('提取的 JSON 響應:', jsonResponse);

        if (jsonResponse && jsonResponse.status === true) {
          // 從 JSON 響應中獲取數據
          const { token, role, roleName, redirectUrl } = jsonResponse;
          console.log('成功獲取用戶數據:', {
            token: '已隱藏',
            role,
            roleName,
            redirectUrl,
          });

          // 儲存用戶數據和 token
          localStorage.setItem('token', token);
          localStorage.setItem('userRole', roleName);

          // 優先使用 JSON 中提供的重定向 URL
          if (redirectUrl) {
            console.log('使用 redirectUrl 重定向到:', redirectUrl);
            window.location.href = redirectUrl;
            return;
          }

          // 使用預設的重定向頁面
          const targetPage =
            roleName === 'customer'
              ? FINAL_REDIRECT.customer
              : FINAL_REDIRECT.deliver;
          console.log('使用預設路徑重定向到:', targetPage);
          navigate(targetPage);
          return;
        }

        // 如果沒有 JSON 響應，則嘗試從 URL 參數獲取數據
        const code = searchParams.get('code');
        const state = searchParams.get('state');
        console.log('從 URL 獲取參數:', {
          code: code ? '存在' : '不存在',
          state,
        });

        if (!code || !state) {
          console.error('缺少必要參數');
          setError('登入失敗：缺少必要的參數');
          setIsLoading(false);
          setTimeout(() => navigate('/auth/line-login'), 3000);
          return;
        }

        // 根據state判斷用戶角色
        const userRole = state === '1' ? 'customer' : 'deliver';
        console.log('確定用戶角色:', userRole);

        // 儲存用戶角色
        localStorage.setItem('userRole', userRole);
        // 儲存一個臨時 token，在實際環境中這應該通過後端 API 獲取
        localStorage.setItem('token', code);
        console.log('已將用戶角色和臨時 token 存入 localStorage');

        // 使用預設的重定向頁面
        const targetPage =
          userRole === 'customer'
            ? FINAL_REDIRECT.customer
            : FINAL_REDIRECT.deliver;
        console.log('使用預設路徑重定向到:', targetPage);
        navigate(targetPage);
      } catch (error) {
        console.error('登入處理錯誤:', error);
        setError('登入處理出錯，請重試');
        setIsLoading(false);
        setTimeout(() => navigate('/auth/line-login'), 3000);
      }
    };

    handleLineCallback();
  }, [navigate, searchParams]);

  return (
    <LoadingContainer>
      {error ? (
        <>
          <ErrorText>{error}</ErrorText>
          <RetryButton onClick={() => navigate('/auth/line-login')}>
            返回登入頁面
          </RetryButton>
        </>
      ) : (
        <>
          <LoadingSpinner />
          <LoadingText>登入處理中...</LoadingText>
        </>
      )}
    </LoadingContainer>
  );
};

// 載入中容器
const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: var(--color-gray-50);
  padding: var(--spacing-4);
`;

// 載入中動畫
const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid var(--color-gray-200);
  border-top: 5px solid var(--color-green-line-0);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: var(--spacing-4);

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

// 載入中文字
const LoadingText = styled.div`
  font-size: var(--font-size-lg);
  color: var(--color-gray-500);
`;

// 錯誤文字
const ErrorText = styled.div`
  font-size: var(--font-size-lg);
  color: var(--color-red-500);
  margin-bottom: var(--spacing-4);
  text-align: center;
`;

// 重試按鈕
const RetryButton = styled.button`
  background-color: var(--color-green-line-0);
  color: white;
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
  padding: var(--spacing-2) var(--spacing-4);
  border-radius: var(--border-radius-round);
  cursor: pointer;
  border: none;

  &:hover {
    background-color: var(--color-green-line-100);
  }
`;

export default LineCallback;
