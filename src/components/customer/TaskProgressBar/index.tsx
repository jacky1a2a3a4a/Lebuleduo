import { OrderStep } from '../../../pages/customer/MyOrder/types';
import dogTruckImage from '../../../assets/images/img-Lebuledou-truck.png';
import {
  ProgressBarSection,
  BackgroundContainer,
  ProgressBarContainer,
  ProgressBarFill,
  ProgressDotContainer,
  DogTruckImage,
  ProgressDot,
  ProgressStatus,
  ProgressItem,
} from './styled';

type TaskProgressBarProps = {
  progress: number;
  currentStep: number;
  orderSteps: OrderStep[];
  todayDataStatus: string;
};

const TaskProgressBar = ({
  progress,
  currentStep,
  orderSteps,
  todayDataStatus,
}: TaskProgressBarProps) => {
  return (
    <ProgressBarSection>
      <BackgroundContainer>
        {/* 進度條 */}
        <ProgressBarContainer>
          {/* 進度條填充 */}
          <ProgressBarFill $progress={progress} />

          {/* 進度點 */}
          <ProgressDotContainer>
            <DogTruckImage
              src={dogTruckImage}
              alt="狗車"
              $progress={progress}
            />
            {orderSteps.map((step, index) => (
              <ProgressDot
                key={index}
                $position={step.position}
                $isActive={index === currentStep}
                $isPassed={index < currentStep}
              />
            ))}
          </ProgressDotContainer>
        </ProgressBarContainer>

        {/* 進度文字 */}
        <ProgressStatus>
          {orderSteps.map((step, index) => (
            <ProgressItem
              key={index}
              $isActive={index === currentStep}
              $isPassed={index < currentStep}
              $isUnscheduled={todayDataStatus === '未排定'}
            >
              {step.label}
            </ProgressItem>
          ))}
        </ProgressStatus>
      </BackgroundContainer>
    </ProgressBarSection>
  );
};

export default TaskProgressBar; 