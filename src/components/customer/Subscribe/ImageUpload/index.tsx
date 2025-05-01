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
import ErrorReport from '../../../common/ErrorReport';

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

const compressImage = async (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // 計算壓縮比例，保持原始比例
        const maxWidth = 1200; // 提高最大寬度限制
        const scale = Math.min(1, maxWidth / img.width);
        const width = img.width * scale;
        const height = img.height * scale;

        canvas.width = width;
        canvas.height = height;

        ctx?.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            } else {
              reject(new Error('圖片壓縮失敗'));
            }
          },
          'image/jpeg',
          0.8,
        );
      };
      img.onerror = () => {
        reject(new Error('圖片載入失敗'));
      };
    };
    reader.onerror = () => {
      reject(new Error('檔案讀取失敗'));
    };
  });
};

const ImageUpload = ({
  fixedPointImages,
  setFixedPointImages,
  photoError,
  setPhotoError,
}: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      if (!file.type.startsWith('image/')) {
        setPhotoError('*請上傳圖片格式的檔案');
        return;
      }

      if (file.size > 6 * 1024 * 1024) {
        setPhotoError('*圖片大小不得超過6MB，請選擇較小的圖片');
        return;
      }

      if (fixedPointImages.length >= 2) {
        setPhotoError('*最多只能上傳兩張照片');
        return;
      }

      try {
        const compressedFile = await compressImage(file);
        const reader = new FileReader();
        reader.onload = (event) => {
          const base64String = event.target?.result as string;
          const imageId = Date.now().toString();

          setFixedPointImages([
            ...fixedPointImages,
            {
              id: imageId,
              url: base64String,
              file: compressedFile,
            },
          ]);

          setPhotoError(null);
          e.target.value = '';
        };
        reader.onerror = () => {
          setPhotoError('*圖片處理失敗，請重試');
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        if (error instanceof Error) {
          setPhotoError(`*${error.message}`);
        } else {
          setPhotoError('*圖片處理失敗，請重試');
        }
      }
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

      {photoError && <ErrorReport title="" error={photoError} />}

      <PhotoInstructions>
        *請務必上傳兩張固定點照片，每張不超過6MB
      </PhotoInstructions>
    </DeliveryOptionImageContainer>
  );
};

export default ImageUpload;
