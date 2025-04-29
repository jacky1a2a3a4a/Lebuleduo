import styled from 'styled-components';

export const Logo = styled.img`
  width: 185px;
  height: 100%;
  margin-bottom: var(--spacing-12);
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

export const WelcomeText = styled.h1`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  margin-bottom: var(--spacing-2xl);
`;

export const LogoType = styled.img`
  color: var(--color-white);
  width: 100%;
  max-width: 160px;
  margin: var(--spacing-md) 0 var(--spacing-sm);
`;

export const TextSub = styled.span`
  color: var(--color-white);
  width: 100%;
  text-align: center;
  font-size: var(--font-size-sm);
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    display: block;
    text-align: center;
    flex: 1;
  }
`;
