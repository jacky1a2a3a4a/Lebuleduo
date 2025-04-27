import { useEffect } from 'react';
import { Container, Title, Message, ImageWrapper } from './styled';
import scoreImage from '../../../assets/images/Lebuledou_score.png';

interface SuccessMessageProps {
  onFinish: () => void;
  delay?: number;
}

const SuccessMessage = ({ onFinish, delay = 2000 }: SuccessMessageProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, delay);

    return () => clearTimeout(timer);
  }, [onFinish, delay]);

  return (
    <Container>
      <ImageWrapper>
        <img src={scoreImage} alt="Lebuledou Score" />
      </ImageWrapper>
      <Title>任務完成！</Title>
      <Message>繼續接單，即將返回首頁</Message>
    </Container>
  );
};

export default SuccessMessage;
