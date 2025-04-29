import { ReactNode } from 'react';
import { LoginSectionStyled } from './styles';

interface SectionProps {
  children: ReactNode;
}

const Section = ({ children }: SectionProps) => {
  return <LoginSectionStyled>{children}</LoginSectionStyled>;
};

export default Section;
