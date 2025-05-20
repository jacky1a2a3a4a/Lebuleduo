import styled from 'styled-components';
import Webcam from 'react-webcam';

export const ScannerContainer = styled.div`
  width: 100%;
  max-width: 500px;
  aspect-ratio: 1/1;
  margin: 0 auto;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  position: relative;
`;

export const ScannerPlaceholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
`;

export const ShutterTop = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50%;
  background-color: black;
  transform-origin: top;
  transform: ${(props) => (props.$isOpen ? 'scaleY(0)' : 'scaleY(1)')};
  transition: transform 0.5s ease-in-out;
  z-index: 2;
`;

export const ShutterBottom = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50%;
  background-color: black;
  transform-origin: bottom;
  transform: ${(props) => (props.$isOpen ? 'scaleY(0)' : 'scaleY(1)')};
  transition: transform 0.5s ease-in-out;
  z-index: 2;
`;

export const CameraLens = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(0, 0, 0, 0) 70%
  );
  position: relative;
  animation: pulse 2s infinite;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.2);
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 0.5;
    }
    50% {
      transform: scale(1.1);
      opacity: 0.8;
    }
    100% {
      transform: scale(1);
      opacity: 0.5;
    }
  }
`;

export const ScannerWebcam = styled(Webcam)`
  width: 100%;
  max-width: 500px;
  aspect-ratio: 1/1;
  margin: 0 auto;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
`;

export const ScannerCanvas = styled.canvas`
  display: none;
`;

export const ScannerFrame = styled.div<{ $isSuccess: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 85%;
  height: 85%;
  border: 3px solid rgba(255, 255, 255, 0.7);
  border-radius: 20px;
  box-shadow: 0 0 0 1000px rgba(0, 0, 0, 0.3);
  z-index: 1;
  animation: ${(props) =>
    props.$isSuccess ? 'success 0.5s ease-in-out' : 'none'};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 3px solid transparent;
    border-radius: 20px;
    animation: ${(props) =>
      props.$isSuccess ? 'focus 1s ease-in-out' : 'none'};
  }

  @keyframes success {
    0% {
      border-color: rgba(255, 255, 255, 0.7);
      box-shadow: 0 0 0 1000px rgba(0, 0, 0, 0.3);
    }
    50% {
      border-color: ${({ theme }) => theme.colors.tertiary.main};
      box-shadow: 0 0 20px 1000px rgba(0, 0, 0, 0.3);
    }
    100% {
      border-color: rgba(255, 255, 255, 0.7);
      box-shadow: 0 0 0 1000px rgba(0, 0, 0, 0.3);
    }
  }

  @keyframes focus {
    0% {
      border-color: rgba(255, 255, 255, 0.7);
      transform: scale(1);
    }
    50% {
      border-color: ${({ theme }) => theme.colors.tertiary.main};
      transform: scale(0.95);
    }
    100% {
      border-color: rgba(255, 255, 255, 0.7);
      transform: scale(1);
    }
  }
`;
