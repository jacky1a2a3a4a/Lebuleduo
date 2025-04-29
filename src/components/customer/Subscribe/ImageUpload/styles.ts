import styled from 'styled-components';

export const DeliveryOptionImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const DeliveryOptionImages = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-md);
`;

export const DeliveryOptionImage = styled.div`
  position: relative;
  width: 100px;
  height: 125px;
  border-radius: var(--border-radius-xl);
  overflow: hidden;
`;

export const DeliveryOptionImagePhoto = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const DeleteImageButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
`;

export const DeliveryOptionImageUpload = styled.div`
  width: 100px;
  height: 125px;
  background-color: var(--color-gray-200);
  border: 2px dashed var(--color-gray-400);
  border-radius: var(--border-radius-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--color-gray-500);

  &:hover {
    background-color: var(--color-gray-300);
  }
`;

export const PhotoInstructions = styled.p`
  font-size: var(--font-size-xs);
  color: var(--color-gray-400);
  margin-top: var(--spacing-sm);
`;

export const ErrorMessage = styled.p`
  color: var(--color-red-500);
  font-size: var(--font-size-xs);
  margin-top: var(--spacing-sm);
`;
