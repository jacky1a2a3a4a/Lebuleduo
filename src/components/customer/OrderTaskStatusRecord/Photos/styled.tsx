import styled from 'styled-components';

export const PhotoSection = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-md);
`;

export const Photo = styled.img`
  background-color: var(--color-neutral-200);
  border-radius: var(--border-radius-xl);

  width: 100%;
  height: 150px;
  object-fit: cover;
  aspect-ratio: 3/4;
`;
