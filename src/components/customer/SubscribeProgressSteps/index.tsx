import {
  FixedStepsContainer,
  StepWrapper,
  StepItem,
  StepNumber,
  StepText,
  StepConnector,
  StepLine,
} from './styled';

interface ProgressStepsProps {
  currentStep: number;
  steps: {
    number: number;
    text: string;
  }[];
}

const ProgressSteps = ({
  currentStep,
  steps,
}: ProgressStepsProps) => {
  return (
    <FixedStepsContainer>
      <StepWrapper>
        {steps.map((step, index) => (
          <>
            <StepItem key={`step-${step.number}`}>
              <StepNumber $active={index < currentStep}>
                {step.number}
              </StepNumber>
              <StepText $active={index < currentStep}>{step.text}</StepText>
            </StepItem>
            {index < steps.length - 1 && (
              <StepConnector key={`connector-${step.number}`}>
                <StepLine
                  $active={index < currentStep - 1}
                />
              </StepConnector>
            )}
          </>
        ))}
      </StepWrapper>
    </FixedStepsContainer>
  );
};

export default ProgressSteps;
