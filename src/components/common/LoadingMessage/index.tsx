import truckImage from '../../../assets/Lebuledou_truck.png';
import {
  LoadingContainer,
  TruckContainer,
  MovingTruck,
  LoadingText,
} from './styles';

interface LoadingMessageProps {
  size?: 'normal' | 'mini';
}

const LoadingMessage = ({ size = 'normal' }: LoadingMessageProps) => (
  <LoadingContainer $size={size}>
    <TruckContainer $size={size}>
      <MovingTruck src={truckImage} alt="Loading truck" $size={size} />
    </TruckContainer>
    <LoadingText $size={size}>汪汪努力載入中 </LoadingText>
  </LoadingContainer>
);

export default LoadingMessage;
