// === 啟用相機拍照 ===

import { useCallback, useRef, useEffect } from 'react';
import {
  CameraPreview,
  CloseButton,
  CameraContainer,
  CameraVideo,
  CameraControls,
  CameraButton,
} from './styled';
import { MdClose, MdCamera } from 'react-icons/md';

interface CameraProps {
  onPhotoTaken: (photoData: string) => void;
  onClose: () => void;
}

const Camera = ({ onPhotoTaken, onClose }: CameraProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
    } catch (err) {
      console.error('無法開啟相機:', err);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  }, []);

  const handleTakePhoto = useCallback(() => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const photoData = canvas.toDataURL('image/jpeg');
        onPhotoTaken(photoData);
        stopCamera();
        onClose();
      }
    }
  }, [onPhotoTaken, onClose, stopCamera]);

  // 管理相機開啟關閉
  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, [startCamera, stopCamera]);

  return (
    <CameraPreview>
      <CloseButton onClick={onClose}>
        <MdClose />
      </CloseButton>
      <CameraContainer>
        <CameraVideo ref={videoRef} autoPlay playsInline />
      </CameraContainer>
      <CameraControls>
        <CameraButton onClick={handleTakePhoto}>
          <MdCamera />
        </CameraButton>
      </CameraControls>
    </CameraPreview>
  );
};

export default Camera;
