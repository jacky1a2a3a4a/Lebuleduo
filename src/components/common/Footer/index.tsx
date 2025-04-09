import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { IconType } from 'react-icons';

/**
 * 底部導航項目接口
 */
export type FooterNavItem = {
  /** 導航圖標 */
  icon: IconType;
  /** 導航文字標籤 */
  label: string;
  /** 導航目標路徑 */
  path: string;
};

/**
 * 通用頁尾屬性接口
 */
interface FooterProps {
  /** 導航項目陣列 */
  navItems: FooterNavItem[];
}

const minWidthMobilePlus = 403;

// 頁尾外層容器
const FooterWrapper = styled.div`
  background-color: var(--color-white);
  width: 100%;
  z-index: 999;
`;

// 頁尾容器
const FooterContainer = styled.footer`
  background-color: var(--color-white);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
  height: 64px;
  width: 100%;
  max-width: ${minWidthMobilePlus}px;
  margin: 0 auto;
  z-index: 999;
`;

// 列表項目
const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
`;

// 頁尾導航連結
const FooterNavLink = styled(NavLink)`
  color: var(--color-gray-400);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);

  transition: color 0.1s ease;

  &:hover {
    color: var(--color-gray-600);
  }

  &.active {
    color: var(--color-primary);
  }
`;

// 圖標容器
const IconContainer = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
  margin-bottom: 0.25rem;

  & > svg {
    width: 100%;
    height: 100%;
  }
`;

// 圖標文字
const IconText = styled.span`
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
`;

/**
 * 通用頁尾組件
 * 顯示底部導航列表
 */
function CommonFooter({ navItems }: FooterProps) {
  return (
    <FooterWrapper>
      <FooterContainer>
        {navItems.map((item, index) => (
          <ListItem key={index}>
            <FooterNavLink to={item.path} end={item.path === '/deliver'}>
              <IconContainer>{<item.icon />}</IconContainer>
              <IconText>{item.label}</IconText>
            </FooterNavLink>
          </ListItem>
        ))}
      </FooterContainer>
    </FooterWrapper>
  );
}

export default CommonFooter;
