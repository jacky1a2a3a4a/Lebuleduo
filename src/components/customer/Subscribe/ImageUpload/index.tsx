import { useRef } from 'react';
import { IoAdd, IoClose } from 'react-icons/io5';
import {
  DeliveryOptionImageContainer,
  DeliveryOptionImages,
  DeliveryOptionImage,
  DeliveryOptionImagePhoto,
  DeleteImageButton,
  DeliveryOptionImageUpload,
  PhotoInstructions,
} from './styles';

interface FixedPointImage {
  id: string;
  url: string;
  file: File;
}

interface ImageUploadProps {
  fixedPointImages: FixedPointImage[];
  setFixedPointImages: (images: FixedPointImage[]) => void;
  photoError: string | null;
  setPhotoError: (error: string | null) => void;
}

const ImageUpload = ({
  fixedPointImages,
  setFixedPointImages,
  photoError,
  setPhotoError,
}: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      if (!file.type.startsWith('image/')) {
        setPhotoError('*請上傳圖片格式的檔案');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setPhotoError('*圖片大小不得超過5MB');
        return;
      }

      if (fixedPointImages.length >= 2) {
        setPhotoError('*最多只能上傳兩張照片');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target?.result as string;
        const imageId = Date.now().toString();

        setFixedPointImages([
          ...fixedPointImages,
          {
            id: imageId,
            url: base64String,
            file,
          },
        ]);

        setPhotoError(null);
        e.target.value = '';
      };
      reader.readAsDataURL(file);
    }
  };

  const openFileSelector = () => {
    fileInputRef.current?.click();
  };

  const handleDeletePhoto = (id: string) => {
    const newImages = fixedPointImages.filter((image) => image.id !== id);
    setFixedPointImages(newImages);
  };

  return (
    <DeliveryOptionImageContainer>
      <DeliveryOptionImages>
        {fixedPointImages.map((image) => (
          <DeliveryOptionImage key={image.id}>
            <DeliveryOptionImagePhoto
              style={{ backgroundImage: `url(${image.url})` }}
            />
            <DeleteImageButton
              onClick={(e) => {
                e.stopPropagation();
                handleDeletePhoto(image.id);
              }}
            >
              <IoClose />
            </DeleteImageButton>
          </DeliveryOptionImage>
        ))}

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handlePhotoUpload}
        />

        {fixedPointImages.length < 2 && (
          <DeliveryOptionImageUpload
            onClick={(e) => {
              e.stopPropagation();
              openFileSelector();
            }}
          >
            <IoAdd size={24} />
          </DeliveryOptionImageUpload>
        )}
      </DeliveryOptionImages>

      {photoError && <ErrorMessage>{photoError}</ErrorMessage>}

      <PhotoInstructions>
        *請務必上傳兩張固定點照片，每張不超過5MB
      </PhotoInstructions>
    </DeliveryOptionImageContainer>
  );
};

export default ImageUpload;
