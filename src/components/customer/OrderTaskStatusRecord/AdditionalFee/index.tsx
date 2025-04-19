import { Container, Title, Amount } from './styled';

interface AdditionalFeeProps {
  overweightAmount: number;
}

const AdditionalFee = ({ overweightAmount }: AdditionalFeeProps) => {
  const additionalFee = overweightAmount * 40;

  return (
    <Container>
      <Title>補繳金額</Title>
      <Amount>NT$ {additionalFee}</Amount>
    </Container>
  );
};

export default AdditionalFee;
