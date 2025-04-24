import styled from 'styled-components';

export const canvasStyles = {
  display: 'none',
} as const;

export const QRCodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const QRCodeDownloadButton = styled.button`
  background-color: var(--color-white);
  color: var(--color-gray-700);
  border-radius: var(--border-radius-round);
  margin-top: 10px;
  padding: 8px 16px;
  cursor: pointer;
`;
