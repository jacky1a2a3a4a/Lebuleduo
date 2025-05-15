import { Section, SectionMainTitle, SectionSubtitle } from './styled';
import { ReactNode } from 'react';

interface SectionTitleProps {
  mainTitle: string;
  subTitle: string;
  id?: string;
  children?: ReactNode;
}

const SectionTitle = ({
  mainTitle,
  subTitle,
  id,
  children,
}: SectionTitleProps) => {
  return (
    <Section id={id}>
      <div>
        <SectionMainTitle>{mainTitle}</SectionMainTitle>
        <SectionSubtitle>{subTitle}</SectionSubtitle>
      </div>

      <div>{children}</div>
    </Section>
  );
};

export default SectionTitle;
