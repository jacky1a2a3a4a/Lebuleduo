import styled from 'styled-components';

export const canvasStyles = {
  display: 'none',
} as const;

export const QRCodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;

  svg {
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
  }
`;

export const QRCodeDownloadButton = styled.button`
  background-color: var(--color-white);
  color: var(--color-gray-700);
  border-radius: var(--border-radius-round);
  margin-top: 10px;
  padding: 8px 16px;
  cursor: pointer;
`;
