import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LineCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLineCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const state = urlParams.get('state');

      if (code && state) {
        try {
          // 從 state 中提取角色資訊
          const roleMatch = state.match(/^role_(customer|deliver)_/);
          const role = roleMatch ? roleMatch[1] : null;

          if (!role) {
            throw new Error('無效的角色資訊');
          }

          // 呼叫後端 API 交換 access token
          const response = await fetch(
            'http://4.240.61.223/GET/auth/line-login',
            {
              method: 'POST',
              body: JSON.stringify({ code, role }),
              headers: {
                'Content-Type': 'application/json',
              },
            },
          );

          if (!response.ok) {
            throw new Error('API 請求失敗');
          }

          const data = await response.json();

          // 儲存 token 和角色資訊
          localStorage.setItem('token', data.token);
          localStorage.setItem('userRole', role);

          // 根據角色導向到相應的頁面
          navigate(role === 'customer' ? '/customer' : '/deliver');
        } catch (error) {
          console.error('LINE 登入失敗:', error);
          navigate('/auth/line-login');
        }
      } else {
        console.error('缺少必要的參數');
        navigate('/auth/line-login');
      }
    };

    handleLineCallback();
  }, [navigate]);

  return <div>處理登入中...</div>;
};

export default LineCallback;
