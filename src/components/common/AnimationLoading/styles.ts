import styled from 'styled-components';

interface SizeProps {
  $size: 'normal' | 'mini';
}

interface AnimationProps {
  $animationType: 'moving' | 'bounce';
}

// === 最外層大容器 ===
export const LoadingContainer = styled.div<SizeProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: var(--spacing-lg);
  ${({ $size }) =>
    $size === 'normal'
      ? `
    position: fixed;
    z-index: 9999;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `
      : `
    position: relative;
  `}
`;

// === 車子容器 ===
export const TruckContainer = styled.div<SizeProps>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ $size }) => ($size === 'normal' ? '220px' : '150px')};
  height: ${({ $size }) => ($size === 'normal' ? '120px' : '80px')};
  margin-bottom: ${({ $size }) =>
    $size === 'normal' ? '0' : 'var(--spacing-xs)'};
  background-color: transparent;
`;

// 車子圖片
export const MovingTruck = styled.img<SizeProps & AnimationProps>`
  position: absolute;
  width: ${({ $size, $animationType }) => {
    if ($animationType === 'bounce') {
      return $size === 'normal' ? '60px' : '50px';
    }
    return $size === 'normal' ? '80px' : '70px';
  }};
  height: auto;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  opacity: ${({ $size }) => ($size === 'normal' ? '1' : '0.8')};
  animation: ${({ $animationType }) =>
      $animationType === 'moving' ? 'moveTruck' : 'bounceTruck'}
    3s cubic-bezier(0.4, 0, 0.2, 1) infinite;

  @keyframes moveTruck {
    0% {
      left: 30%;
      transform: translate(-50%, -50%) scaleX(1);
    }
    49% {
      left: 70%;
      transform: translate(-50%, -50%) scaleX(1);
    }
    50% {
      left: 70%;
      transform: translate(-50%, -50%) scaleX(-1);
    }
    99% {
      left: 30%;
      transform: translate(-50%, -50%) scaleX(-1);
    }
    100% {
      left: 30%;
      transform: translate(-50%, -50%) scaleX(1);
    }
  }

  @keyframes bounceTruck {
    0% {
      left: 30%;
      transform: translateY(-50%) translateX(-50%) scaleX(1) translateY(0);
    }
    8% {
      left: 35%;
      transform: translateY(-50%) translateX(-50%) scaleX(1) translateY(-8px);
    }
    16% {
      left: 40%;
      transform: translateY(-50%) translateX(-50%) scaleX(1) translateY(0);
    }
    24% {
      left: 45%;
      transform: translateY(-50%) translateX(-50%) scaleX(1) translateY(-8px);
    }
    32% {
      left: 50%;
      transform: translateY(-50%) translateX(-50%) scaleX(1) translateY(0);
    }
    40% {
      left: 55%;
      transform: translateY(-50%) translateX(-50%) scaleX(1) translateY(-8px);
    }
    48% {
      left: 60%;
      transform: translateY(-50%) translateX(-50%) scaleX(1) translateY(0);
    }
    56% {
      left: 65%;
      transform: translateY(-50%) translateX(-50%) scaleX(1) translateY(-8px);
    }
    64% {
      left: 70%;
      transform: translateY(-50%) translateX(-50%) scaleX(-1) translateY(0);
    }
    72% {
      left: 65%;
      transform: translateY(-50%) translateX(-50%) scaleX(-1) translateY(-8px);
    }
    80% {
      left: 60%;
      transform: translateY(-50%) translateX(-50%) scaleX(-1) translateY(0);
    }
    88% {
      left: 55%;
      transform: translateY(-50%) translateX(-50%) scaleX(-1) translateY(-8px);
    }
    96% {
      left: 50%;
      transform: translateY(-50%) translateX(-50%) scaleX(-1) translateY(0);
    }
    100% {
      left: 30%;
      transform: translateY(-50%) translateX(-50%) scaleX(1) translateY(0);
    }
  }
`;

// === 載入文字 ===
export const LoadingText = styled.p<SizeProps>`
  color: ${({ $size }) =>
    $size === 'normal'
      ? 'var(--color-text-tertiary)'
      : 'var(--color-text-disabled)'};
  font-size: var(--font-size-sm);

  &::after {
    content: '';
    animation: loadingDots 1.5s infinite;
  }

  @keyframes loadingDots {
    0% {
      content: '';
    }
    25% {
      content: '.';
    }
    50% {
      content: '..';
    }
    75% {
      content: '...';
    }
    100% {
      content: '';
    }
  }
`;
