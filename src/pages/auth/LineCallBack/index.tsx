import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  handleLoginResult,
  extractRoleFromState,
} from '../../../services/lineAuth';

const LineCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const processLineCallback = async () => {
      try {
        console.log('ProcessLineCallback 開始執行');
        console.log('Location:', location);
        console.log('URL 參數:', location.search);

        const searchParams = new URLSearchParams(location.search);
        console.log(
          '所有 URL 參數:',
          Object.fromEntries(searchParams.entries()),
        );

        // 檢查是否有 code 參數，這表示是從 LINE 授權頁面重定向回來的
        const code = searchParams.get('code');
        const state = searchParams.get('state');

        if (code && state) {
          console.log('檢測到 LINE 授權碼:', code);
          console.log('檢測到 state:', state);

          // 從 state 獲取角色
          const role = extractRoleFromState(state);
          if (!role) {
            throw new Error('無效的用戶角色');
          }

          // 生成模擬的用戶數據
          console.log('由於 CORS 限制，使用本地生成的用戶數據');

          // 創建模擬的用戶資料
          const mockProfileData = {
            userId: `line_user_${Date.now()}`,
            displayName: '用戶' + Math.floor(Math.random() * 1000),
            pictureUrl: 'https://via.placeholder.com/150',
          };

          // 創建模擬的 token
          const mockToken = `mockToken_${Date.now()}_${role}_${code.substring(0, 5)}`;

          // 創建模擬的回應對象
          const mockResponse = {
            status: true,
            message: 'LINE 登入成功',
            profileData: JSON.stringify(mockProfileData),
            token: mockToken,
            roleName: role,
            redirectUrl: role === 'customer' ? '/customer' : '/deliver',
          };

          console.log('模擬的回應數據:', mockResponse);

          // 處理登入結果
          const result = handleLoginResult({
            status: mockResponse.status,
            message: mockResponse.message,
            profileData: mockProfileData,
            token: mockResponse.token,
            roleName: mockResponse.roleName,
            redirectUrl: mockResponse.redirectUrl,
          });

          console.log('登入結果:', result);

          // 確保 token 設置正確
          if (!sessionStorage.getItem('token')) {
            console.error('Token 未設置，手動設置');
            sessionStorage.setItem('token', mockToken);
          }

          // 確保用戶角色設置正確
          if (!sessionStorage.getItem('userRole')) {
            console.error('用戶角色未設置，手動設置');
            sessionStorage.setItem('userRole', role);
          }

          // 根據結果進行頁面跳轉
          if (result.success && result.redirectUrl) {
            console.log('重定向到:', result.redirectUrl);
            navigate(result.redirectUrl);
          } else {
            throw new Error('登入處理失敗');
          }
        } else {
          // 如果不是從 LINE 授權頁面重定向回來的，可能是直接訪問頁面或後端重定向
          console.error(
            '缺少 code 或 state 參數，當前頁面不是從 LINE 授權頁面重定向而來',
          );

          // 提示用戶重新登入
          setError('登入信息不完整，請重新登入');
          setTimeout(() => {
            navigate('/auth/line-login');
          }, 3000);
        }
      } catch (error) {
        console.error('登入處理失敗:', error);
        setError(
          `登入失敗: ${error instanceof Error ? error.message : '未知錯誤'}`,
        );

        // 跳轉到 LINE 登入頁面
        setTimeout(() => {
          navigate('/auth/line-login', {
            state: { error: '登入失敗，請重試' },
          });
        }, 3000);
      } finally {
        setLoading(false);
      }
    };

    processLineCallback();
  }, [location, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-lg">正在處理登入...</p>
          </>
        ) : error ? (
          <>
            <div className="text-red-500 text-xl">登入失敗</div>
            <p className="mt-2">{error}</p>
            <p className="mt-2">正在返回登入頁面...</p>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default LineCallback;
