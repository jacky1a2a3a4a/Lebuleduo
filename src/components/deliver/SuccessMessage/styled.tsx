import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const scaleIn = keyframes`
  from {
    transform: scale(0.5);
  }
  to {
    transform: scale(1);
  }
`;

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--color-white);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  animation: ${fadeIn} 0.3s ease-out;
`;

export const IconWrapper = styled.div`
  width: 120px;
  height: 120px;
  background-color: var(--color-background-secondary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--spacing-xl);
  animation: ${scaleIn} 0.5s ease-out;

  svg {
    color: var(--color-primary);
    font-size: 60px;
  }
`;

export const Title = styled.h2`
  color: var(--color-text-primary);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-md);
  animation: ${fadeIn} 0.5s ease-out 0.3s both;
`;

export const Message = styled.p`
  color: var(--color-text-tertiary);
  font-size: var(--font-size-md);
  text-align: center;
  animation: ${fadeIn} 0.5s ease-out 0.5s both;
`;
