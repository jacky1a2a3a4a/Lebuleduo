import { StatusTagContainer, StatusTagText } from './styled';

interface StatusTagProps {
  status: string;
}

const StatusTag = ({ status }: StatusTagProps) => {
  return (
    <StatusTagContainer $status={status}>
      <StatusTagText $status={status}>{status}</StatusTagText>
    </StatusTagContainer>
  );
};

export default StatusTag;
