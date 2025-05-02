import { LoadingContainer, Spinner, LoadingText } from './styles';

interface CommonLoadingProps {
  text?: string;
}

const CommonLoading = ({ text = '載入中，請稍候' }: CommonLoadingProps) => {
  return (
    <LoadingContainer>
      <Spinner />
      <LoadingText>{text}</LoadingText>
    </LoadingContainer>
  );
};

export default CommonLoading;
