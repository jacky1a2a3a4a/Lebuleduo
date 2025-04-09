// 登入頁面 切版
import { FaLine, FaArrowLeft } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LoginSectionStyled,
  Logo,
  WelcomeText,
  TextMain,
  TextSub,
  TextContent,
  RoleSelection,
  RoleButton,
  SelectedRoleContainer,
  SelectedRoleText,
  ButtonGroup,
  LineButton,
  IconStyled,
  BackButton,
} from './styles';

// 定義回傳資料的介面
interface LineLoginResponse {
  statusCode: number;
  status: boolean;
  message: string;
  profileData: string;
  token: string;
  role: number;
  roleName: string;
  redirectUrl: string;
}

// 定義用戶資料介面
interface UserProfile {
  userId: string;
  displayName: string;
  pictureUrl: string;
}

const LineLogin = () => {
  const [selectedRole, setSelectedRole] = useState<
    'customer' | 'deliver' | null
  >(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isProcessingCallback, setIsProcessingCallback] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // LINE 登入 URL 設定
  const LINE_LOGIN_URL = 'https://access.line.me/oauth2/v2.1/authorize';
  const CLIENT_ID = '2007121127';
  const REDIRECT_URI = 'http://4.240.61.223/auth/line-login';

  // 處理 LINE 登入回調
  useEffect(() => {
    const handleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const state = urlParams.get('state');

      if (code && state) {
        setIsProcessingCallback(true);
        try {
          console.log('處理LINE登入回調', { code, state });
          const response = await fetch('http://4.240.61.223/auth/line-login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code, state }),
            credentials: 'include',
          });

          const data: LineLoginResponse = await response.json();
          console.log('LINE登入回應', data);

          if (data.status && data.statusCode === 200) {
            try {
              // 解析 profileData 字串為物件
              const profileData: UserProfile = JSON.parse(data.profileData);

              // 儲存必要資訊到 localStorage
              localStorage.setItem('token', data.token);
              localStorage.setItem('userRole', String(data.role));
              localStorage.setItem('roleName', data.roleName);
              localStorage.setItem('userProfile', JSON.stringify(profileData));

              console.log('用戶資料已儲存', {
                role: data.roleName,
                name: profileData.displayName,
              });

              // 清除 URL 參數
              const urlWithoutParams = window.location.pathname;
              window.history.replaceState({}, document.title, urlWithoutParams);

              // 根據角色進行跳轉
              if (data.roleName === 'customer') {
                navigate('/customer');
              } else {
                setError('無效的用戶角色');
              }
            } catch (parseError) {
              console.error('解析用戶資料失敗:', parseError);
              setError('用戶資料格式錯誤');
            }
          } else {
            console.error('登入失敗', data.message);
            setError(`登入失敗：${data.message || '請稍後再試'}`);
          }
        } catch (err) {
          console.error('登入錯誤:', err);
          setError('系統錯誤，請稍後再試');
        } finally {
          setIsProcessingCallback(false);
        }
      }
    };

    handleCallback();
  }, [navigate, location]);

  // 選擇身分
  const handleRoleSelect = (role: 'customer' | 'deliver') => {
    if (selectedRole === role) return;

    setIsExiting(true);

    setTimeout(() => {
      setIsExiting(false);
      setIsAnimating(true);
      setTimeout(() => {
        setSelectedRole(role);
        setIsAnimating(false);
      }, 200);
    }, 200);
  };

  // LINE 登入處理
  const handleLineLogin = () => {
    if (!selectedRole) return;

    // 根據選擇的身分設定 state 參數（顧客為 1）
    const state = selectedRole === 'customer' ? '1' : '2';

    // 構建 LINE 登入 URL
    const lineLoginUrl = `${LINE_LOGIN_URL}?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&state=${state}&scope=profile%20openid%20email`;

    console.log('重定向到LINE登入', lineLoginUrl);
    // 重定向到 LINE 登入頁面
    window.location.href = lineLoginUrl;
  };

  // 返回功能
  const handleBack = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsExiting(false);
      setIsAnimating(true);
      setTimeout(() => {
        setSelectedRole(null);
        setIsAnimating(false);
      }, 200);
    }, 200);
  };

  // 如果正在處理回調，顯示載入中
  if (isProcessingCallback) {
    return (
      <LoginSectionStyled>
        <div>登入處理中，請稍候...</div>
      </LoginSectionStyled>
    );
  }

  return (
    <LoginSectionStyled>
      {error && (
        <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>
      )}
      <Logo src={'/Lebuledou.png'} />
      <WelcomeText>
        <TextMain>Lebuledou</TextMain>
        <TextSub>垃不垃多</TextSub>
        <TextContent>歡迎使用最省事的垃圾代收服務</TextContent>
      </WelcomeText>

      {/* 身分選擇 */}
      {!selectedRole ? (
        <RoleSelection>
          <RoleButton
            $selected={selectedRole === 'customer'}
            onClick={() => handleRoleSelect('customer')}
            $isAnimating={isAnimating}
            $isExiting={isExiting}
          >
            我是顧客
          </RoleButton>
          <RoleButton
            $selected={selectedRole === 'deliver'}
            onClick={() => handleRoleSelect('deliver')}
            $isAnimating={isAnimating}
            $isExiting={isExiting}
          >
            我是汪汪員
          </RoleButton>
        </RoleSelection>
      ) : (
        <SelectedRoleContainer>
          <SelectedRoleText>
            {selectedRole === 'customer' ? '客戶' : '代收員'}登入
          </SelectedRoleText>
          <ButtonGroup>
            <LineButton
              onClick={handleLineLogin}
              $isAnimating={isAnimating}
              $isExiting={isExiting}
            >
              <IconStyled>
                <FaLine />
              </IconStyled>
              LINE 登入
            </LineButton>
            <BackButton
              onClick={handleBack}
              $isAnimating={isAnimating}
              $isExiting={isExiting}
            >
              <IconStyled>
                <FaArrowLeft />
              </IconStyled>
              返回
            </BackButton>
          </ButtonGroup>
        </SelectedRoleContainer>
      )}
    </LoginSectionStyled>
  );
};

export default LineLogin;
