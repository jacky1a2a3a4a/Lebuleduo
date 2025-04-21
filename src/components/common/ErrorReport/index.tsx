import { ErrorReportContainer, ErrorTitle, ErrorMessage } from './styled';

interface ErrorReportProps {
  title?: string;
  error: string;
}

const ErrorReport = ({ title = '發生錯誤', error }: ErrorReportProps) => {
  return (
    <ErrorReportContainer>
      <ErrorTitle>{title}</ErrorTitle>

      <ErrorMessage>{error}</ErrorMessage>
    </ErrorReportContainer>
  );
};

export default ErrorReport;
