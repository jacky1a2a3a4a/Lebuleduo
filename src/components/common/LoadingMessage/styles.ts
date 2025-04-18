import styled from 'styled-components';

// === 最外層大容器 ===
export const LoadingContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 20px;
`;

// === 車子容器 ===
export const TruckContainer = styled.div`
  position: relative;
  width: 200px;
  height: 100px;
  overflow: hidden;
`;

// 車子圖片
export const MovingTruck = styled.img`
  position: absolute;
  width: 80px;
  height: auto;
  animation: moveTruck 4s ease-in-out infinite;
  left: 0;
  top: 50%;
  transform: translateY(-50%);

  @keyframes moveTruck {
    0% {
      left: 0;
      transform: translateY(-50%) scaleX(1);
    }
    49% {
      left: calc(100% - 80px);
      transform: translateY(-50%) scaleX(1);
    }
    50% {
      left: calc(100% - 80px);
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
export const LoadingText = styled.p`
  color: var(--color-text-tertiary);
  font-size: var(--font-size-sm);
`;
