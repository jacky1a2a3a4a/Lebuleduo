import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--backdrop-color);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid var(--color-gray-200);
  border-top: 5px solid var(--color-primary);
  border-radius: var(--border-radius-round);
  animation: ${spin} 1s linear infinite;
`;

export const LoadingText = styled.p`
  margin-top: var(--spacing-lg);
  font-size: var(--font-size-lg);
  color: var(--color-text-primary);
  font-weight: var(--font-weight-medium);
`;
