import styled from 'styled-components';

export const DownloadButton = styled.button`
  background-color: var(--color-primary);
  color: var(--color-white);
  border-radius: var(--border-radius-round);
  max-width: 150px;
  padding: var(--spacing-sm) var(--spacing-md);
  margin: var(--spacing-xs) auto;

  cursor: pointer;
  font-size: var(--font-size-xs);
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--color-primary-hover);
  }
`;
