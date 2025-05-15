import styled, { keyframes } from 'styled-components';

const slideUp = keyframes`
  from {
    transform: translate(-50%, 100%);
    opacity: 0;
  }
  to {
    transform: translate(-50%, 0);
    opacity: 1;
  }
`;

const slideDown = keyframes`
  from {
    transform: translate(-50%, 0);
    opacity: 1;
  }
  to {
    transform: translate(-50%, 100%);
    opacity: 0;
  }
`;

export const ReportModal = styled.div<{ $isOpen: boolean }>`
  background: var(--color-background-primary);
  border: 2px solid var(--color-neutral-300);
  border-radius: var(--border-radius-xl) var(--border-radius-xl) 0 0;
  box-shadow: var(--shadow-lg);

  display: flex;
  flex-direction: column;

  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  width: 100%;
  max-width: var(--mobile-min-width);
  z-index: 1000;

  padding: var(--spacing-md);

  animation: ${({ $isOpen }) => ($isOpen ? slideUp : slideDown)} 0.3s ease-out;
  animation-fill-mode: forwards;
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transition: visibility 0.3s ease-out;
  pointer-events: ${({ $isOpen }) => ($isOpen ? 'auto' : 'none')};
`;

export const ReportModalTitle = styled.h2`
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-md);
  color: var(--color-text-primary);
`;

export const ReportSection = styled.div`
  margin-bottom: var(--spacing-xs);
`;

export const ReportSectionTitle = styled.h3`
  color: var(--color-text-tertiary);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--spacing-12);
`;

export const ReportOption = styled.div<{ $selected: boolean }>`
  background-color: ${({ $selected }) =>
    $selected
      ? 'var(--color-background-error)'
      : 'var(--color-background-primary)'};
  color: ${({ $selected }) =>
    $selected ? 'var(--color-error)' : 'var(--color-text-secondary)'};
  border: 1px solid
    ${({ $selected }) =>
      $selected ? 'var(--color-error)' : 'var(--color-neutral-300)'};
  border-radius: var(--border-radius-lg);

  padding: var(--spacing-sm) var(--spacing-sm) var(--spacing-sm)
    var(--spacing-md);
  margin-bottom: var(--spacing-sm);

  font-size: var(--font-size-sm);

  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--color-error);
  }
`;

export const ReportTextarea = styled.textarea`
  width: 100%;
  min-height: 50px;
  padding: var(--spacing-12);
  border: 1px solid var(--color-neutral-300);
  border-radius: var(--border-radius-lg);
  resize: vertical;
  font-size: var(--font-size-xs);
  line-height: 1.5;

  &:focus {
    outline: none;
    border-color: var(--color-error);
  }

  &::placeholder {
    color: var(--color-text-disabled);
  }
`;

export const ReportButtonGroup = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 2fr;
  gap: var(--spacing-12);
  margin-top: var(--spacing-md);
`;

export const ReportSubmitButton = styled.button`
  background-color: var(--color-primary);
  color: var(--color-white);
  border-radius: var(--border-radius-round);

  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--color-primary-hover);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: var(--color-primary);
  }
`;

export const ReportCancelButton = styled.button`
  background-color: var(--color-background-secondary);
  color: var(--color-text-tertiary);
  border: 1px solid var(--color-neutral-300);
  border-radius: var(--border-radius-round);

  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--color-background-secondary-hover);
  }
`;
