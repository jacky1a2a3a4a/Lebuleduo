import { ReactNode } from 'react';
import {
  StatCardContainer,
  Title,
  Content,
  Icon,
  Numbers,
  Value,
  Subtitle,
  Text,
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
        <Text>
          <Title>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>
        </Text>
        <Numbers>
          <Value>{value}</Value>
        </Numbers>
      </Content>
    </StatCardContainer>
  );
};

export default StatCard;
