// src/pages/auth/LineCallback/index.tsx
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { setUsersID, getLineLoginState } from '@/utils/authUtils';
import { validateLineState, getLoginRole } from '@/configs/lineConfig';
import { useAppDispatch } from '@/store/hooks';
import { setAuthData, clearLineLoginState, logout } from '@/store/slices/userSlice';
import { lineCallbackApi } from '@/apis/auth/lineCallback';
import {
  CallbackContainer,
  Message,
  ErrorMessage,
} from './styled';

import AnimationLoading from '@/components/common/AnimationLoading';

const LineCallback = () => {
  const [loading, setLoading] = useState(true); // 頁面載入狀態
  const [error, setError] = useState<string | null>(null); // 儲存錯誤訊息
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const hasProcessed = useRef(false);

  // 清除 URL 參數的通用函數
  const clearUrlParams = () => {
    window.history.replaceState({}, '', window.location.pathname);
  };

  // 延遲跳轉的通用函數
  const navigateWithDelay = (targetPath: string, delay: number = 3000) => {
    setTimeout(() => {
      navigate(targetPath, { replace: true });
    }, delay);
  };

  // 處理登入成功
  const handleLoginSuccess = (roleName: string) => {
    // 清除 LINE 登入狀態（登入流程完成）
    dispatch(clearLineLoginState());

    console.log('登入成功，資料已保存到 Redux');

    // 標記為已處理，避免重複請求token，第二次會失敗
    hasProcessed.current = true;

    // 顯示成功訊息
    setLoading(false);
    setError(null);

    // 清除 URL 參數
    window.history.replaceState({}, '', '/');

    // 根據角色跳轉
    console.log('準備跳轉，角色資訊:', {
      roleName,
      typeof_roleName: typeof roleName,
      isCustomer: roleName === 'customer',
      isDeliver: roleName === 'deliver',
    });

    if (roleName === 'customer') {
      console.log('跳轉到顧客頁面: /customer');
      navigateWithDelay('/customer');
    } else if (roleName === 'deliver') {
      console.log('跳轉到汪汪員頁面: /deliver');
      navigateWithDelay('/deliver');
    } else {
      console.error('未知的角色:', roleName);
      navigateWithDelay('/auth/line-login-customer');
    }
  };

  // 處理登入失敗
  const handleLoginError = (errorMessage: string) => {
    setError(errorMessage);
    setLoading(false);

    // 獲取用戶角色
    const userRole = getLoginRole();

    // 清除 Redux 中的認證相關資料
    dispatch(logout());
    dispatch(clearLineLoginState());

    // 清除 URL 參數
    clearUrlParams();

    // 根據角色跳轉到對應的登入頁面
    if (userRole === 'deliver') {
      navigateWithDelay('/auth/line-login-deliver');
    } else {
      navigateWithDelay('/auth/line-login-customer');
    }
  };

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

        // 驗證授權碼(code)
        if (!code) {
          throw new Error('授權碼為空，請重新登入');
        }

        // 驗證 state 參數
        console.log('State 驗證詳細資訊:', {
          receivedState: state,
          reduxLineLoginState: JSON.stringify(getLineLoginState()),
        });
        
        if (!state || !validateLineState(state)) {
          throw new Error('無效的 state 參數，可能存在安全風險');
        }

        // 獲取角色
        const userRole = getLoginRole();

        if (!userRole) {
          throw new Error('無法確定用戶角色');
        }

        // 打印要發送的 code 值
        console.log('要發送的 code 值:', code);

        try {
          // 將 code 發送給後端以換取 token
          const responseData = await lineCallbackApi({
            code,
            role: userRole,
          });

          // 處理後端回傳的資料
          const {
            token,
            profileData,
            roleName,
            usersId: newUsersId,
          } = responseData;

          console.log('後端返回的資料:', {
            token,
            profileData,
            roleName,
            usersId: newUsersId,
          });

          // 使用 Redux 保存認證資料
          if (newUsersId) {
            console.log('設置 UsersID:', newUsersId);
            setUsersID(newUsersId);
          } else {
            console.warn('後端未返回有效的 UsersID');
          }

          dispatch(setAuthData({
            userId: newUsersId,
            authToken: token,
            userRole: roleName,
            userData: {
              displayName: profileData.displayName,
              userId: profileData.userId,
              pictureUrl: profileData.pictureUrl,
            },
          }));

          // 處理登入成功
          handleLoginSuccess(roleName);

        } catch (apiError: unknown) {
          console.error('LINE 登入處理失敗:', apiError);
          if (apiError instanceof Error) {
            throw new Error(`API 處理失敗: ${apiError.message}`);
          } else {
            throw new Error('API 處理失敗');
          }
        }
      } catch (err: unknown) {
        console.error('LINE 登入失敗:', err);
        const errorMessage = err instanceof Error ? err.message : '登入過程中發生錯誤';
        handleLoginError(errorMessage);
      }
    };

    handleCallback();
  }, []); //沒有依賴，只會執行一次

  return (
    <CallbackContainer>
      {loading && (
        <>
          <AnimationLoading size="normal" loadingText=" " showEllipsis={false} />
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
    </CallbackContainer>
  );
};

export default LineCallback;
