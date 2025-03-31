import { getLineLoginUrl } from '../../../services/lineAuth';

const LineLoginButton = () => {
  const handleLineLogin = () => {
    window.location.href = getLineLoginUrl();
  };

  return <button onClick={handleLineLogin}>使用 LINE 登入</button>;
};

export default LineLoginButton;
