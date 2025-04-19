import {
  StatusContainer,
  StatusList,
  StatusItem,
  StatusTitle,
  StatusTime,
  StatusDot,
  StatusLine,
  StatusContent,
  StatusProgress,
} from './styled';

interface StatusStep {
  title: string;
  time: string;
  isCompleted: boolean;
  isLast?: boolean;
}

interface OrderTaskStatusRecordStatusProps {
  steps: StatusStep[];
}

const OrderTaskStatusRecordStatus = ({
  steps,
}: OrderTaskStatusRecordStatusProps) => {
  return (
    <StatusContainer>
      <StatusList>
        {steps.map((step, index) => (
          <StatusItem key={index}>
            <StatusProgress>
              <StatusDot $isCompleted={step.isCompleted}>
                {step.isCompleted && '✓'}
              </StatusDot>
              {!step.isLast && <StatusLine $isCompleted={step.isCompleted} />}
            </StatusProgress>
            <StatusContent>
              <StatusTitle>{step.title}</StatusTitle>
              <StatusTime>{step.time}</StatusTime>
            </StatusContent>
          </StatusItem>
        ))}
      </StatusList>
    </StatusContainer>
  );
};

export default OrderTaskStatusRecordStatus;
