import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { IconType } from 'react-icons';
import { useLocation } from 'react-router-dom';

export type FooterNavItem = {
  icon: IconType;
  label: string;
  path: string;
};

interface FooterProps {
  navItems: FooterNavItem[];
}

const minWidthMobilePlus = 403;

// 頁尾外層容器
const FooterWrapper = styled.div<{ $primary?: boolean; $secondary?: boolean }>`
  background-color: ${({ $primary, $secondary }) => {
    if ($primary) return 'var(--color-primary)';
    if ($secondary) return 'var(--color-background-secondary)';
    return 'transparent';
  }};
  width: 100%;
  z-index: 99;
`;

// 頁尾容器
const FooterContainer = styled.footer`
  background-color: var(--color-white);
  border-radius: var(--border-radius-xl) var(--border-radius-xl) 0 0;

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
  const location = useLocation();

  const isPrimary = location.pathname === '/customer/my-order';
  const isSecondary = location.pathname === '/customer/Plan';
  console.log(location);

  return (
    <FooterWrapper $primary={isPrimary} $secondary={isSecondary}>
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
