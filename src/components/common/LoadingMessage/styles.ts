import styled from 'styled-components';

interface SizeProps {
  $size: 'normal' | 'mini';
}

// === 最外層大容器 ===
export const LoadingContainer = styled.div<SizeProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  padding: var(--spacing-lg);
  ${({ $size }) =>
    $size === 'normal'
      ? `
    justify-content: center;
    position: fixed;
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
  width: ${({ $size }) => ($size === 'normal' ? '200px' : '150px')};
  height: ${({ $size }) => ($size === 'normal' ? '90px' : '60px')};
  overflow: hidden;
  margin-bottom: ${({ $size }) =>
    $size === 'normal' ? '0' : 'var(--spacing-xs)'};
`;

// 車子圖片
export const MovingTruck = styled.img<SizeProps>`
  position: absolute;
  width: ${({ $size }) => ($size === 'normal' ? '80px' : '70px')};
  height: auto;
  animation: moveTruck 4s ease-in-out infinite;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  opacity: ${({ $size }) => ($size === 'normal' ? '1' : '0.8')};

  @keyframes moveTruck {
    0% {
      left: 0;
      transform: translateY(-50%) scaleX(1);
    }
    49% {
      left: calc(
        100% - ${({ $size }) => ($size === 'normal' ? '80px' : '70px')}
      );
      transform: translateY(-50%) scaleX(1);
    }
    50% {
      left: calc(
        100% - ${({ $size }) => ($size === 'normal' ? '80px' : '70px')}
      );
      transform: translateY(-50%) scaleX(-1);
    }
    99% {
      left: 0;
      transform: translateY(-50%) scaleX(-1);
    }
    100% {
      left: 0;
      transform: translateY(-50%) scaleX(1);
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
