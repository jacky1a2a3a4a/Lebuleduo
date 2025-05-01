import { LoadingContainer, Spinner, LoadingText } from './styles';

const Loading = () => {
  return (
    <LoadingContainer>
      <Spinner />
      <LoadingText>任務分派中，請稍候...</LoadingText>
    </LoadingContainer>
  );
};

export default Loading;
