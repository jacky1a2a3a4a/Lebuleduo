import truckImage from '../../../assets/images/Lebuledou_truck.png';
import trashCanImage from '../../../assets/images/Lebuledou_trashcan_anime.png';
import {
  LoadingContainer,
  TruckContainer,
  MovingTruck,
  LoadingText,
} from './styles';

interface AnimationLoadingProps {
  size?: 'normal' | 'mini';
  animationType?: 'moving' | 'bounce';
  loadingText?: string;
}

const ANIMATION_CONFIG = {
  bounce: {
    image: trashCanImage,
    alt: 'Bouncing trash can',
  },
  moving: {
    image: truckImage,
    alt: 'Moving truck',
  },
} as const;

const AnimationLoading = ({
  size = 'normal',
  animationType = 'bounce',
  loadingText = '汪汪努力載入中',
}: AnimationLoadingProps) => {
  const { image, alt } = ANIMATION_CONFIG[animationType];

  return (
    <LoadingContainer $size={size}>
      <TruckContainer $size={size}>
        <MovingTruck
          src={image}
          alt={alt}
          $size={size}
          $animationType={animationType}
        />
      </TruckContainer>
      <LoadingText $size={size}>{loadingText}</LoadingText>
    </LoadingContainer>
  );
};

export default AnimationLoading;
