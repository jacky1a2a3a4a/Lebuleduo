import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { IconType } from 'react-icons';

// ts interface定義屬性類型
// 需要導出是因為它定義了外部組件（如 CustomerFooter）需要提供的數據結構
export interface FooterNavItem {
  icon: IconType;
  label: string;
  path: string;
}

// 通用組件內部使用，接收上方定義的導航項目
interface FooterProps {
  navItems: FooterNavItem[];
}

const minWidthMobilePlus = 403;

const FooterWrapper = styled.div`
  width: 100%;
  background-color: var(--color-gray-200);
  z-index: 999;
`;

// footer容器
const FooterContainer = styled.footer`
  background-color: var(--color-gray-200);
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

// footer導航連結
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
    color: var(--color-gray-800);
  }
`;

//icon 容器
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

function Footer({ navItems }: FooterProps) {
  return (
    <FooterWrapper>
      <FooterContainer>
        {navItems.map((item, index) => (
          <ListItem key={index}>
            <FooterNavLink to={item.path} end>
              <IconContainer>{<item.icon />}</IconContainer>
              <span>{item.label}</span>
            </FooterNavLink>
          </ListItem>
        ))}
      </FooterContainer>
    </FooterWrapper>
  );
}

export default Footer;
