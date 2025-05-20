import styled from 'styled-components';

export const DeliveryOptionImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const DeliveryOptionImages = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const DeliveryOptionImage = styled.div`
  position: relative;
  width: 100px;
  height: 125px;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
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
  background-color: ${({ theme }) => theme.colors.gray[200]};
  border: 2px dashed ${({ theme }) => theme.colors.gray[400]};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.gray[500]};

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[300]};
  }
`;

export const PhotoInstructions = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  color: ${({ theme }) => theme.colors.gray[400]};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

export const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.red[500]};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;
