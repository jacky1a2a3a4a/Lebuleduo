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
  background: ${({ theme }) => theme.colors.background.primary};
  border: 2px solid ${({ theme }) => theme.colors.neutral[300]};
  border-radius: ${({ theme }) => theme.borderRadius.xl} ${({ theme }) => theme.borderRadius.xl} 0 0;
  box-shadow: ${({ theme }) => theme.shadows.lg};

  display: flex;
  flex-direction: column;

  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  width: 100%;
  max-width: ${({ theme }) => theme.breakpoints.mobile};
  z-index: 1000;

  padding: ${({ theme }) => theme.spacing.md};

  animation: ${({ $isOpen }) => ($isOpen ? slideUp : slideDown)} 0.3s ease-out;
  animation-fill-mode: forwards;
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transition: visibility 0.3s ease-out;
  pointer-events: ${({ $isOpen }) => ($isOpen ? 'auto' : 'none')};
`;

export const ReportModalTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const ReportSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const ReportSectionTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text.tertiary};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  margin-bottom: ${({ theme }) => theme.spacing[12]};
`;

export const ReportOption = styled.div<{ $selected: boolean }>`
  background-color: ${({ $selected, theme }) =>
    $selected
      ? theme.colors.background.error
      : theme.colors.background.primary};
  color: ${({ $selected, theme }) =>
    $selected ? theme.colors.error.main : theme.colors.text.secondary};
  border: 1px solid
    ${({ $selected, theme }) =>
      $selected ? theme.colors.error.main : theme.colors.neutral[300]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};

  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.sm} ${theme.spacing.sm} ${theme.spacing.md}`};
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  font-size: ${({ theme }) => theme.typography.fontSizes.sm};

  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.error.main};
  }
`;

export const ReportTextarea = styled.textarea`
  width: 100%;
  min-height: 50px;
  padding: ${({ theme }) => theme.spacing[12]};
  border: 1px solid ${({ theme }) => theme.colors.neutral[300]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  resize: vertical;
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  line-height: 1.5;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.error.main};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.disabled};
  }
`;

export const ReportButtonGroup = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 2fr;
  gap: ${({ theme }) => theme.spacing[12]};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

export const ReportSubmitButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.round};

  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.hover};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: ${({ theme }) => theme.colors.primary.main};
  }
`;

export const ReportCancelButton = styled.button`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  color: ${({ theme }) => theme.colors.text.tertiary};
  border: 1px solid ${({ theme }) => theme.colors.neutral[300]};
  border-radius: ${({ theme }) => theme.borderRadius.round};

  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.secondaryHover};
  }
`;
