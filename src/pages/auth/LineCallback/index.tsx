// src/pages/auth/LineCallback/index.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateLineState, getLoginRole } from '../../../configs/lineConfig';
import axios from 'axios';
import {
  CallbackContainer,
  LoadingSpinner,
  Message,
  ErrorMessage,
  DebugSection,
  DebugInfo,
} from './styles';

const LineCallback = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<{
    code: string | null;
    state: string | null;
    role: string | null;
    localStorage: Record<string, string>;
  }>({
    code: null,
    state: null,
    role: null,
    localStorage: {},
  });
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        console.log('=== LINE 登入回調處理開始 ===');
        console.log('當前完整 URL:', window.location.href);

        // 從 URL 參數中獲取 code 和 state
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const state = urlParams.get('state');

        // 更新除錯資訊
        setDebugInfo({
          code,
          state,
          role: getLoginRole(),
          localStorage: {
            line_login_state: localStorage.getItem('line_login_state') || '',
            line_login_role: localStorage.getItem('line_login_role') || '',
          },
        });

        if (!code) {
          throw new Error('無法獲取授權碼');
        }

        if (!state || !validateLineState(state)) {
          throw new Error('無效的 state 參數，可能存在安全風險');
        }

        // 從 localStorage 獲取角色
        const userRole = getLoginRole();

        if (!userRole) {
          throw new Error('無法確定用戶角色');
        }

        try {
          // 將 code 發送給後端以換取 token
          const response = await axios.post('/api/auth/line/callback', {
            code,
            role: userRole,
          });

          // 處理後端回傳的資料
          const { accessToken, user } = response.data;

          // 將 token 儲存到 localStorage
          localStorage.setItem('auth_token', accessToken);
          localStorage.setItem('user_role', userRole);
          localStorage.setItem('user_data', JSON.stringify(user));

          // 清除登入相關的 state 資訊
          localStorage.removeItem('line_login_state');
          localStorage.removeItem('line_login_role');

          // 根據角色導向不同頁面，使用 navigate
          if (userRole === 'customer') {
            navigate('/customer', { replace: true });
          } else {
            navigate('/deliver', { replace: true });
          }
        } catch (apiError: unknown) {
          console.error('後端 API 錯誤:', apiError);
          if (axios.isAxiosError(apiError)) {
            throw new Error(`後端處理失敗: ${apiError.message}`);
          }
          throw new Error('後端處理失敗');
        }
      } catch (err: unknown) {
        console.error('LINE 登入失敗:', err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('登入過程中發生錯誤');
        }

        // 3 秒後返回登入頁面，使用 navigate
        // setTimeout(() => {
        //   // navigate('/auth/line-login', { replace: true });
        // }, 3000);
      } finally {
        setLoading(false);
      }
    };

    handleCallback();
  }, []);

  return (
    <CallbackContainer>
      {loading && (
        <>
          <LoadingSpinner />
          <Message>正在處理 LINE 登入，請稍候...</Message>
        </>
      )}

      {error && (
        <>
          <Message>登入失敗</Message>
          <ErrorMessage>{error}</ErrorMessage>
          <p>3 秒後自動返回登入頁面...</p>
        </>
      )}

      <DebugSection>
        <h3>除錯資訊</h3>
        <DebugInfo>
          <div>
            <strong>授權碼 (code):</strong>{' '}
            {debugInfo.code ? '✅ 已獲取' : '❌ 未獲取'}
          </div>
          <div>
            <strong>State 參數:</strong> {debugInfo.state || '未獲取'}
          </div>
          <div>
            <strong>用戶角色:</strong> {debugInfo.role || '未獲取'}
          </div>
          <div>
            <strong>localStorage 狀態:</strong>
            <pre>{JSON.stringify(debugInfo.localStorage, null, 2)}</pre>
          </div>
        </DebugInfo>
      </DebugSection>
    </CallbackContainer>
  );
};

export default LineCallback;
