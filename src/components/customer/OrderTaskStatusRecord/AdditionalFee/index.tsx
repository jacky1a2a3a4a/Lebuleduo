import {
  Container,
  Title,
  Amount,
  CountSection,
  ButtonsSection,
  Button,
} from './styled';
import { useNavigate } from 'react-router-dom';

interface AdditionalFeeProps {
  overweightAmount: number;
}

const AdditionalFee = ({ overweightAmount }: AdditionalFeeProps) => {
  const navigate = useNavigate();
  const additionalFee = overweightAmount * 40;

  return (
    <Container>
      <CountSection>
        <Title>補繳金額</Title>
        <Amount>NT$ {additionalFee}</Amount>
      </CountSection>
      <ButtonsSection>
        <Button onClick={() => navigate(-1)}>取消</Button>
        <Button>立即補款</Button>
      </ButtonsSection>
    </Container>
  );
};

export default AdditionalFee;
