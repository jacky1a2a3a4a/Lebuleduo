// src/pages/auth/LineCallback/index.tsx
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateLineState, getLoginRole } from '../../../configs/lineConfig';
import axios from 'axios';
import {
  CallbackContainer,
  // LoadingSpinner,
  Message,
  ErrorMessage,
  // DebugSection,
  // DebugInfo,
} from './styled';

import AnimationLoading from '@/components/common/AnimationLoading';

const LineCallback = () => {
  const [loading, setLoading] = useState(true); // 頁面載入狀態
  const [error, setError] = useState<string | null>(null); // 儲存錯誤訊息
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
  }); // 儲存除錯資訊
  const navigate = useNavigate();
  const hasProcessed = useRef(false);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // 如果已經處理過，直接返回
        if (hasProcessed.current) {
          console.log('已經處理過授權碼，跳過重複處理');
          return;
        }
        hasProcessed.current = true;

        console.log('=== LINE 登入回調處理開始 ===');
        console.log('當前完整 URL:', window.location.href);

        // 從 URL 參數中獲取 code 和 state
        const searchParams = new URLSearchParams(window.location.search);
        const code = searchParams.get('code');
        const state = searchParams.get('state');

        console.log('URL 參數:', {
          search: window.location.search,
          code,
          state,
          hash: window.location.hash,
        });

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

        // 驗證授權碼(code)
        if (!code) {
          throw new Error('授權碼為空，請重新登入');
        }

        // 驗證 state 參數
        if (!state || !validateLineState(state)) {
          throw new Error('無效的 state 參數，可能存在安全風險');
        }

        // 從 localStorage 獲取角色和用戶ID
        const userRole = getLoginRole();
        const usersId = localStorage.getItem('UsersID');

        if (!userRole) {
          throw new Error('無法確定用戶角色');
        }

        // 打印要發送的 code 值
        console.log('要發送的 code 值:', code);
        console.log('要發送的 UsersID:', usersId);

        try {
          // 將 code 發送給後端以換取 token
          console.log('發送請求的參數:', {
            code,
            role: userRole,
            usersId,
          });

          const response = await axios.post(
            `/api/auth/line/callback`,
            {
              code,
              role: userRole,
              usersId,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          );

          console.log('後端回傳的資料:', response.data);

          if (response.status === 400) {
            console.error('後端返回 400 錯誤:', response.data);
            throw new Error(
              `後端處理失敗: ${response.data.message || '未知錯誤'}`,
            );
          }

          // 處理後端回傳的資料
          const {
            token,
            profileData,
            roleName,
            usersId: newUsersId,
          } = response.data;

          console.log('後端返回的原始資料:', response.data);
          console.log('後端返回的資料:', {
            token,
            profileData,
            roleName,
            usersId: newUsersId,
          });

          // 將 token 和用戶資料儲存到 localStorage
          localStorage.setItem('auth_token', token);
          localStorage.setItem('user_role', roleName);

          // 只有在後端返回有效的 UsersID 時才更新
          if (newUsersId) {
            console.log('更新 UsersID:', newUsersId);
            localStorage.setItem('UsersID', newUsersId);
          } else {
            console.warn('後端未返回有效的 UsersID');
          }

          localStorage.setItem(
            'user_data',
            JSON.stringify({
              displayName: profileData.displayName,
              userId: profileData.userId,
              pictureUrl: profileData.pictureUrl,
            }),
          );

          // 清除登入相關的 state 資訊，但保留 UsersID
          localStorage.removeItem('line_login_state');
          localStorage.removeItem('line_login_role');

          console.log('登入成功後的 localStorage:', {
            auth_token: localStorage.getItem('auth_token'),
            user_role: localStorage.getItem('user_role'),
            UsersID: localStorage.getItem('UsersID'),
            user_data: localStorage.getItem('user_data'),
          });

          // 標記為已處理，避免重複請求token，第二次會失敗
          hasProcessed.current = true;

          // 顯示成功訊息
          setLoading(false);
          setError(null);

          // 清除 URL 參數
          window.history.replaceState({}, '', '/');

          // 3 秒後根據角色導向不同頁面
          setTimeout(() => {
            if (roleName === 'customer') {
              navigate('/customer', { replace: true });
            } else {
              navigate('/deliver', { replace: true });
            }
          }, 3000);
        } catch (apiError: unknown) {
          if (axios.isAxiosError(apiError)) {
            console.error('後端 API 錯誤詳細資訊:', {
              status: apiError.response?.status,
              data: apiError.response?.data,
              headers: apiError.response?.headers,
            });
            throw new Error(`後端處理失敗: ${apiError.message}`);
          }
          console.error('未知錯誤:', apiError);
          throw new Error('後端處理失敗');
        }
      } catch (err: unknown) {
        console.error('LINE 登入失敗:', err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('登入過程中發生錯誤');
        }
        setLoading(false);

        // 獲取用戶角色
        const userRole = getLoginRole();

        // 清除相關的 localStorage 資料
        localStorage.removeItem('line_login_state');
        localStorage.removeItem('line_login_role');
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_role');
        localStorage.removeItem('user_data');

        // 清除 URL 參數，避免重複觸發登入流程
        window.history.replaceState({}, '', window.location.pathname);

        // 3 秒後根據角色返回對應的登入頁面
        setTimeout(() => {
          if (userRole === 'deliver') {
            navigate('/auth/line-login-deliver', { replace: true });
          } else {
            navigate('/auth/line-login-customer', { replace: true });
          }
        }, 3000);
      }
    };

    handleCallback();
  }, []); //沒有依賴，只會執行一次

  return (
    <CallbackContainer>
      {loading && (
        <>
          {/* <LoadingSpinner /> */}
          <AnimationLoading size="normal" loadingText=" " showEllipsis={false} />
          {/* <Message>正在處理 LINE 登入，請稍候...</Message> */}
        </>
      )}

      {error && (
        <>
          <Message>登入失敗</Message>
          <ErrorMessage>{error}</ErrorMessage>
          <p>3 秒後自動返回登入頁面...</p>
        </>
      )}

      {!loading && !error && (
        <>
          <Message>登入成功！</Message>
          <Message>正在為您導向頁面...</Message>
        </>
      )}

      {/* 除錯資訊 */}
      {/* <DebugSection>
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
      </DebugSection> */}
    </CallbackContainer>
  );
};

export default LineCallback;
