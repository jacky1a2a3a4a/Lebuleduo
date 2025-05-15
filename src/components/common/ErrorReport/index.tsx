import {
  ErrorReportContainer,
  ErrorTitle,
  ErrorMessage,
  ErrorImage,
} from './styled';
import errorImage from '../../../assets/images/img-Lebuledou-problem.png';

interface ErrorReportProps {
  title?: string;
  error: string;
  showImage?: boolean;
  titleColor?: string;
  errorColor?: string;
}

const ErrorReport = ({
  title = '錯誤',
  error,
  showImage = false,
  titleColor,
  errorColor,
}: ErrorReportProps) => {
  return (
    <ErrorReportContainer>
      {showImage && <ErrorImage src={errorImage} alt="錯誤圖片" />}
      <ErrorTitle color={titleColor}>{title}</ErrorTitle>
      <ErrorMessage color={errorColor}>{error}</ErrorMessage>
    </ErrorReportContainer>
  );
};

export default ErrorReport;
