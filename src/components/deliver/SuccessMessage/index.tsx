import { useEffect } from 'react';
import { MdCheckCircle } from 'react-icons/md';
import { Container, IconWrapper, Title, Message } from './styled';

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
      <IconWrapper>
        <MdCheckCircle />
      </IconWrapper>
      <Title>收運完成！</Title>
      <Message>感謝您的服務，即將返回首頁</Message>
    </Container>
  );
};

export default SuccessMessage;
