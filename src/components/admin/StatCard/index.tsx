import { ReactNode } from 'react';
import {
  StatCardContainer,
  Title,
  Content,
  Icon,
  Numbers,
  Value,
  Subtitle,
} from './styles';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: ReactNode;
}

const StatCard = ({ title, value, subtitle, icon }: StatCardProps) => {
  return (
    <StatCardContainer>
      <Icon>{icon}</Icon>
      <Content>
        <Title>{title}</Title>
        <Numbers>
          <Value>{value}</Value>
          <Subtitle>{subtitle}</Subtitle>
        </Numbers>
      </Content>
    </StatCardContainer>
  );
};

export default StatCard;
