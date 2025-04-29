import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const rotateShake = keyframes`
  0%, 100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-3deg);
  }
  50% {
    transform: rotate(0deg);
  }
  75% {
    transform: rotate(3deg);
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

export const Title = styled.h2`
  color: var(--color-primary);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-sm);
  animation: ${fadeIn} 0.5s ease-out 0.3s both;
`;

export const Message = styled.p`
  color: var(--color-text-tertiary);
  font-size: var(--font-size-md);
  text-align: center;
  animation: ${fadeIn} 0.5s ease-out 0.5s both;
`;

export const ImageWrapper = styled.div`
  margin-bottom: var(--spacing-xl);
  animation: ${fadeIn} 0.5s ease-out 0.7s both;

  img {
    width: 200px;
    height: auto;
    animation: ${rotateShake} 0.8s linear infinite;
    transform-origin: center center;
  }
`;
