import { IconType } from 'react-icons';
import { useLocation } from 'react-router-dom';
import {
  FooterWrapper,
  FooterContainer,
  ListItem,
  FooterNavLink,
  IconContainer,
  IconText,
} from './styles';

export type FooterNavItem = {
  icon: IconType;
  label: string;
  path: string;
  disabled?: boolean;
};

interface FooterProps {
  navItems: FooterNavItem[];
}

function CommonFooter({ navItems }: FooterProps) {
  const location = useLocation();

  return (
    <FooterWrapper>
      <FooterContainer>
        {navItems.map((item, index) => (
          <ListItem key={index}>
            <FooterNavLink
              to={item.disabled ? '#' : item.path}
              end={item.path === '/customer' || item.path === '/deliver'}
              $active={location.pathname.startsWith(item.path)}
              $disabled={item.disabled}
            >
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
