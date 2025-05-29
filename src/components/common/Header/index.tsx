// CommonHeader 通用Header
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import BurgerButton from './BuggerButton';
import { ActionButton, HeaderWrapper, HeaderContainer, HeaderTitle } from './styled';

// 通用頁首屬性接口
export type HeaderProps = {
  title: string; //頁首標題文字
  titlePath?: string; //點擊標題跳轉的路徑
  actionButton?: ReactNode; //右側自定義操作按鈕
  titleImage?: string; //標題圖片
  imageHeight?: string; // 標題圖片高度
};

/**
 * 通用頁首組件
 * 包含漢堡按鈕、標題和可選的右側操作按鈕
 */
function CommonHeader({
  title,
  titlePath = '/',
  actionButton,
  titleImage,
  imageHeight,
}: HeaderProps) {
  const navigate = useNavigate();

  return (
    <HeaderWrapper>
      <HeaderContainer>
        <BurgerButton />
        <HeaderTitle
          onClick={() => navigate(titlePath)}
          $imageHeight={imageHeight}
        >
          {titleImage ? <img src={titleImage} alt={title} /> : title}
        </HeaderTitle>
        {actionButton}
      </HeaderContainer>
    </HeaderWrapper>
  );
}

export { ActionButton };
export default CommonHeader;
