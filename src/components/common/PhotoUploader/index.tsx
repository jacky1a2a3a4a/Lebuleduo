import { useCallback, useState, useEffect } from 'react';
import { MdAdd, MdDelete } from 'react-icons/md';
import Camera from '../Camera/Camera';
import {
  PhotoUploadContainer,
  PhotoUploadBox,
  PreviewImage,
  PlusIcon,
  UploadText,
  DeleteButton,
  ValidationMessage,
} from './styled';

interface PhotoUploaderProps {
  photos: string[];
  onChange: (photos: string[]) => void;
  maxPhotos?: number;
  validationMessage?: string;
  showValidation?: boolean;
}

const PhotoUploader = ({
  photos,
  onChange,
  maxPhotos = 2,
  validationMessage = '請上傳照片',
  showValidation = false,
}: PhotoUploaderProps) => {
  const [showCamera, setShowCamera] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number | null>(
    null,
  );
  const [isWebCameraSupported, setIsWebCameraSupported] = useState<
    boolean | null
  >(null);

  // 檢查是否支援網頁相機
  useEffect(() => {
    const checkCameraSupport = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        stream.getTracks().forEach((track) => track.stop());
        setIsWebCameraSupported(true);
      } catch {
        setIsWebCameraSupported(false);
      }
    };
    checkCameraSupport();
  }, []);

  // 開啟相機
  const handleOpenCamera = useCallback(
    (index: number) => {
      if (isWebCameraSupported === null) return;

      // 如果該位置已經有照片，則不允許再次拍照
      if (photos[index]) return;

      if (isWebCameraSupported) {
        // 使用網頁相機
        setCurrentPhotoIndex(index);
        setShowCamera(true);
      } else {
        // 使用手機內建相機
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.capture = 'environment';

        input.onchange = (e) => {
          const file = (e.target as HTMLInputElement).files?.[0];
          if (file) {
            // 檢查檔案大小（5MB = 5 * 1024 * 1024 bytes）
            if (file.size > 5 * 1024 * 1024) {
              alert('照片大小不能超過 5MB');
              return;
            }
            const reader = new FileReader();
            reader.onload = (event) => {
              const newPhotos = [...photos];
              newPhotos[index] = event.target?.result as string;
              onChange(newPhotos);
            };
            reader.readAsDataURL(file);
          }
        };

        input.click();
      }
    },
    [isWebCameraSupported, photos, onChange],
  );

  // 拍照
  const handleTakePhoto = useCallback(
    (photoData: string) => {
      if (currentPhotoIndex !== null) {
        const newPhotos = [...photos];
        newPhotos[currentPhotoIndex] = photoData;
        onChange(newPhotos);
      }
    },
    [currentPhotoIndex, photos, onChange],
  );

  // 刪除照片
  const handleDeletePhoto = useCallback(
    (index: number) => {
      const newPhotos = [...photos];
      newPhotos[index] = '';
      onChange(newPhotos);
    },
    [photos, onChange],
  );

  return (
    <>
      <PhotoUploadContainer>
        {Array.from({ length: maxPhotos }).map((_, index) => (
          <PhotoUploadBox key={index} onClick={() => handleOpenCamera(index)}>
            {photos[index] ? (
              <div style={{ position: 'relative' }}>
                <PreviewImage src={photos[index]} alt={`照片 ${index + 1}`} />
                <DeleteButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeletePhoto(index);
                  }}
                >
                  <MdDelete />
                </DeleteButton>
              </div>
            ) : (
              <>
                <PlusIcon>
                  <MdAdd />
                </PlusIcon>
                <UploadText>
                  {isWebCameraSupported === null
                    ? '載入中...'
                    : isWebCameraSupported
                      ? '點擊拍照'
                      : '開啟相機'}
                </UploadText>
              </>
            )}
          </PhotoUploadBox>
        ))}
      </PhotoUploadContainer>
      {showValidation && !photos.some(Boolean) && (
        <ValidationMessage>{validationMessage}</ValidationMessage>
      )}

      {showCamera && isWebCameraSupported && (
        <Camera
          onPhotoTaken={handleTakePhoto}
          onClose={() => setShowCamera(false)}
        />
      )}
    </>
  );
};

export default PhotoUploader;
