import { PhotoSection, Photo } from './styled';
import { MdError } from 'react-icons/md';
import styled from 'styled-components';
import { useEffect } from 'react';

interface PhotosProps {
  photos: string[];
}

const ErrorPhoto = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--color-text-tertiary);
  font-size: 2rem;
  z-index: 1;
`;

const PhotoWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 150px;
  background-color: var(--color-neutral-200);
  border-radius: var(--border-radius-xl);
  overflow: hidden;
`;

const Photos = ({ photos }: PhotosProps) => {
  // 只取前兩張照片
  const displayPhotos = photos.slice(0, 2);

  useEffect(() => {
    console.log('照片資料更新:', photos);
  }, [photos]);

  return (
    <PhotoSection>
      {displayPhotos.map((photo, index) => (
        <PhotoWrapper key={index}>
          <Photo src={photo} alt={`收運照片 ${index + 1}`} />
          <ErrorPhoto>
            <MdError />
          </ErrorPhoto>
        </PhotoWrapper>
      ))}
    </PhotoSection>
  );
};

export default Photos;
