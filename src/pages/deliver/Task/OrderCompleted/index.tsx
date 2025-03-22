import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { HiDocumentText, HiCamera } from 'react-icons/hi2';
import { useState } from 'react';

// 最外層容器
const FullHeightContainer = styled.div`
  background-color: var(--color-gray-100);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  padding: 1rem;
`;

// 頁面標題容器
const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: calc(var(--min-width-mobile) - 2rem);
  margin-top: var(--spacing-sm);
  margin-bottom: var(--spacing-xs);
`;

const PageTitle = styled.div`
  font-size: var(--font-size-lg);
  font-weight: 800;
`;

const PageSubtitle = styled.div`
  color: var(--color-gray-400);
  font-size: var(--font-size-sm);
  font-weight: 500;
`;

//訂單詳情 卡片
const DetailCard = styled.div`
  background-color: var(--color-gray-0);
  border: 1.5px solid var(--color-gray-300);
  border-radius: var(--border-radius-lg);
  width: 100%;
  max-width: calc(var(--min-width-mobile) - 2rem);
  padding: var(--spacing-md);
  margin-bottom: 1rem;
`;

// 照片上傳區域
const PhotoUploadArea = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-sm);
  margin-top: var(--spacing-md);
`;

const PhotoUploadBox = styled.label`
  background-color: var(--color-gray-200);
  border: 2px dashed var(--color-gray-400);
  border-radius: var(--border-radius-lg);
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:hover {
    background-color: var(--color-gray-300);
  }
`;

const PhotoPreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PhotoUploadIcon = styled.div`
  font-size: 2rem;
  color: var(--color-gray-500);
  margin-bottom: 0.5rem;
`;

const PhotoUploadText = styled.div`
  font-size: var(--font-size-sm);
  color: var(--color-gray-500);
`;

const HiddenInput = styled.input`
  display: none;
`;

//訂單詳情 容器 均分排列
const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-xs);
`;

//訂單詳情 卡片 時間
const DetailTime = styled.div`
  font-size: var(--font-size-2xl);
  font-weight: 600;
`;

const DetailStatus = styled.div`
  background-color: var(--color-gray-300);
  color: var(--color-gray-700);
  border-radius: var(--border-radius-round);
  font-size: var(--font-size-sm);
  font-weight: 700;
  padding: 0.25rem 0.75rem;
`;

const DetailSign = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 2rem;
  height: 2rem;
`;

const DetailLabel = styled.div`
  color: var(--color-gray-600);
  display: flex;
  align-items: center;
  font-weight: 500;
`;

const DetailValue = styled.div`
  font-weight: 600;
  text-align: right;
`;

// 按鈕容器
const DetailButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--spacing-md);
  width: 100%;
  margin-top: auto;
  max-width: calc(var(--min-width-mobile) - 2rem);
`;

// 確認按鈕
const Button = styled.button`
  padding: 0.75rem 1rem;
  border-radius: var(--border-radius-round);
  font-weight: 500;
  cursor: pointer;
  border: none;

  &:first-child {
    background-color: var(--color-gray-200);
    color: var(--color-gray-600);
    flex: 1;

    &:hover {
      background-color: var(--color-gray-300);
    }
  }

  &:last-child {
    background-color: var(--color-gray-700);
    color: var(--color-gray-0);
    flex: 2;

    &:hover {
      background-color: var(--color-gray-800);
    }
  }
`;

function TaskRecord() {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const [photos, setPhotos] = useState<{ [key: string]: string }>({
    before1: '',
    before2: '',
    after1: '',
    after2: '',
  });

  const handleBack = () => {
    navigate(-1);
  };

  const handlePhotoUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    photoKey: string,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotos((prev) => ({
          ...prev,
          [photoKey]: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    // 在這裡處理提交邏輯
    console.log('提交照片和記錄', photos);
    // 可以導航到成功頁面或返回任務列表
    navigate('/deliver');
  };

  return (
    <FullHeightContainer>
      <HeaderContainer>
        <PageTitle>任務記錄</PageTitle>
        <PageSubtitle>請上傳任務執行前後的照片</PageSubtitle>
      </HeaderContainer>

      <DetailCard>
        <DetailRow>
          <DetailTime>09:00 am</DetailTime>
          <DetailStatus>代收運</DetailStatus>
        </DetailRow>
        <DetailRow>
          <DetailLabel>
            <DetailSign>
              <HiDocumentText />
            </DetailSign>
            訂單編號
          </DetailLabel>
          <DetailValue>{taskId || 'ORD-12345'}</DetailValue>
        </DetailRow>

        <HeaderContainer>
          <PageTitle>執行前照片</PageTitle>
          <PageSubtitle>請拍攝垃圾放置處的現況</PageSubtitle>
        </HeaderContainer>

        <PhotoUploadArea>
          <PhotoUploadBox>
            <HiddenInput
              type="file"
              accept="image/*"
              onChange={(e) => handlePhotoUpload(e, 'before1')}
            />
            {photos.before1 ? (
              <PhotoPreview src={photos.before1} alt="執行前照片1" />
            ) : (
              <>
                <PhotoUploadIcon>
                  <HiCamera />
                </PhotoUploadIcon>
                <PhotoUploadText>上傳照片</PhotoUploadText>
              </>
            )}
          </PhotoUploadBox>
          <PhotoUploadBox>
            <HiddenInput
              type="file"
              accept="image/*"
              onChange={(e) => handlePhotoUpload(e, 'before2')}
            />
            {photos.before2 ? (
              <PhotoPreview src={photos.before2} alt="執行前照片2" />
            ) : (
              <>
                <PhotoUploadIcon>
                  <HiCamera />
                </PhotoUploadIcon>
                <PhotoUploadText>上傳照片</PhotoUploadText>
              </>
            )}
          </PhotoUploadBox>
        </PhotoUploadArea>

        <HeaderContainer>
          <PageTitle>執行後照片</PageTitle>
          <PageSubtitle>請拍攝清運後的環境照片</PageSubtitle>
        </HeaderContainer>

        <PhotoUploadArea>
          <PhotoUploadBox>
            <HiddenInput
              type="file"
              accept="image/*"
              onChange={(e) => handlePhotoUpload(e, 'after1')}
            />
            {photos.after1 ? (
              <PhotoPreview src={photos.after1} alt="執行後照片1" />
            ) : (
              <>
                <PhotoUploadIcon>
                  <HiCamera />
                </PhotoUploadIcon>
                <PhotoUploadText>上傳照片</PhotoUploadText>
              </>
            )}
          </PhotoUploadBox>
          <PhotoUploadBox>
            <HiddenInput
              type="file"
              accept="image/*"
              onChange={(e) => handlePhotoUpload(e, 'after2')}
            />
            {photos.after2 ? (
              <PhotoPreview src={photos.after2} alt="執行後照片2" />
            ) : (
              <>
                <PhotoUploadIcon>
                  <HiCamera />
                </PhotoUploadIcon>
                <PhotoUploadText>上傳照片</PhotoUploadText>
              </>
            )}
          </PhotoUploadBox>
        </PhotoUploadArea>
      </DetailCard>

      <DetailButtons>
        <Button onClick={handleBack}>返回任務</Button>
        <Button onClick={handleSubmit}>完成記錄</Button>
      </DetailButtons>
    </FullHeightContainer>
  );
}

export default TaskRecord;
