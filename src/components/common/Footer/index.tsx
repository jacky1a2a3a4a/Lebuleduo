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
};

interface FooterProps {
  navItems: FooterNavItem[];
}

function CommonFooter({ navItems }: FooterProps) {
  const location = useLocation();

  const isPrimary = location.pathname === '/customer/my-order';
  const isSecondary = location.pathname === '/customer/Plan';
  console.log(location);

  return (
    <FooterWrapper $primary={isPrimary} $secondary={isSecondary}>
      <FooterContainer $secondary={isSecondary}>
        {navItems.map((item, index) => (
          <ListItem key={index}>
            <FooterNavLink
              to={item.path}
              end={item.path === '/deliver'}
              $secondary={isSecondary}
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
