import styled from 'styled-components';

export const SelectContainer = styled.div<{ width?: string }>`
  position: relative;
  width: ${(props) => props.width || '80px'};
`;

export const SelectButton = styled.button`
  width: 100%;
  padding: var(--spacing-2xs) var(--spacing-xs);
  border: 1px solid var(--color-neutral-300);
  border-radius: var(--border-radius-sm);
  background: var(--color-white);
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-size: var(--font-size-3xs);
  color: var(--color-text-primary);

  &:hover {
    border-color: var(--color-neutral-400);
  }
`;

export const OptionsContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--color-white);
  border: 1px solid var(--color-neutral-300);
  border-radius: var(--border-radius-sm);
  margin-top: var(--spacing-2xs);
  max-height: 160px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: var(--shadow-sm);
`;

export const Option = styled.div<{ selected?: boolean }>`
  padding: var(--spacing-2xs) var(--spacing-sm);
  cursor: pointer;
  font-size: var(--font-size-3xs);
  color: var(--color-text-primary);
  background-color: ${(props) =>
    props.selected ? 'var(--color-neutral-200)' : 'transparent'};

  &:hover {
    background-color: var(--color-neutral-200);
  }
`;
