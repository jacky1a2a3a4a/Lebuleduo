import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import {
  HiInboxStack,
  HiShoppingCart,
  HiMiniUserCircle,
  HiMiniChatBubbleOvalLeftEllipsis,
} from 'react-icons/hi2';

const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FooterStyled = styled.footer`
  background-color: var(--color-gray-200);

  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  height: 64px;
`;

const FooterNavLink = styled(NavLink)`
  color: var(--color-gray-400);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  font-size: var(--font-size-sm);
  font-weight: 600;

  transition: color 0.2s ease;
  &:hover {
    color: var(--color-gray-600);
  }
`;

const StyledIcon = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
  margin-bottom: 0.25rem;

  & > svg {
    width: 100%;
    height: 100%;
  }
`;

function Footer() {
  return (
    <FooterStyled>
      <ListItem>
        <FooterNavLink to="/">
          <StyledIcon>
            <HiInboxStack />
          </StyledIcon>
          <span>我的訂單</span>
        </FooterNavLink>
      </ListItem>

      <ListItem>
        <FooterNavLink to="/">
          <StyledIcon>
            <HiShoppingCart />
          </StyledIcon>
          <span>訂閱方案</span>
        </FooterNavLink>
      </ListItem>

      <ListItem>
        <FooterNavLink to="/">
          <StyledIcon>
            <HiMiniUserCircle />
          </StyledIcon>
          <span>會員資訊</span>
        </FooterNavLink>
      </ListItem>

      <ListItem>
        <FooterNavLink to="/">
          <StyledIcon>
            <HiMiniChatBubbleOvalLeftEllipsis />
          </StyledIcon>
          <span>聯絡我們</span>
        </FooterNavLink>
      </ListItem>
    </FooterStyled>
  );
}

export default Footer;
