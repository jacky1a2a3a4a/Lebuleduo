import truckImage from '../../../assets/images/img-Lebuledou-truck.png';
import trashCanImage from '../../../assets/images/img-Lebuledou-trashcan-anime.png';
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
  showEllipsis?: boolean;
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
  showEllipsis = true,
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
      <LoadingText $size={size} $showEllipsis={showEllipsis}>
        {loadingText}
      </LoadingText>
    </LoadingContainer>
  );
};

export default AnimationLoading;
