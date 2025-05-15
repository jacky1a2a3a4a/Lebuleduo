import styled from 'styled-components';

export const CameraPreview = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  z-index: 1001;
`;

export const CameraContainer = styled.div`
  width: 100%;
  max-width: 500px;
  height: 70vh;
  overflow: hidden;
  position: relative;
`;

export const CameraVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const CameraControls = styled.div`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 20px;
`;

export const CameraButton = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 24px;
  color: #333;
`;
