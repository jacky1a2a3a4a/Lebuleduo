import styled from 'styled-components';

// ===拍照上傳 大容器===
export const PhotoUploadContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-md);
  margin-top: var(--spacing-md);
`;

// ===照片 容器===
export const PhotoUploadBox = styled.div`
  background-color: var(--color-gray-100);
  border-radius: var(--border-radius-lg);
  width: 100%;
  aspect-ratio: 3/4;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
`;

export const PlusIcon = styled.div`
  font-size: 24px;
  color: ${({ theme }) => theme.colors.neutral[500]};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const UploadText = styled.div`
  font-size: var(--font-size-sm);
  color: var(--color-neutral-500);
`;

export const PreviewImage = styled.img`
  width: 100%;
  aspect-ratio: 3/4;
  object-fit: cover;
  border-radius: var(--border-radius-lg);
`;

// 刪除按鈕
export const DeleteButton = styled.button`
  background: var(--color-white);
  color: var(--color-text-secondary);
  border-radius: var(--border-radius-round);

  position: absolute;
  top: var(--spacing-xs);
  right: var(--spacing-xs);
  border: none;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  opacity: 0.5;

  &:hover {
    opacity: 0.7;
  }
`;

export const ValidationMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;
