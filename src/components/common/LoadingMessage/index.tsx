import truckImage from '../../../assets/Lebuledou_truck.png';
import {
  LoadingContainer,
  TruckContainer,
  MovingTruck,
  LoadingText,
} from './styles';

const LoadingMessage = () => (
  <LoadingContainer>
    <TruckContainer>
      <MovingTruck src={truckImage} alt="Loading truck" />
    </TruckContainer>
    <LoadingText>汪汪努力載入中 ...</LoadingText>
  </LoadingContainer>
);

export default LoadingMessage;
