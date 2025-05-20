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

export const ModalOverlay = styled.div<{ $isClosing: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  opacity: ${({ $isClosing }) => ($isClosing ? 0 : 1)};
  transition: opacity 0.3s ease;
`;

export const ModalContainer = styled.div<{ $isClosing: boolean }>`
  background: ${({ theme }) => theme.colors.background.primary};
  border: 2px solid ${({ theme }) => theme.colors.neutral[300]};
  border-radius: ${({ theme }) => `${theme.borderRadius.xl} ${theme.borderRadius.xl} 0 0`};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  width: 100%;
  max-width: ${({ theme }) => theme.breakpoints.mobile};
  max-height: 90vh;
  overflow-y: auto;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 1000;
  padding: ${({ theme }) => theme.spacing.md};
  animation: ${({ $isClosing }) => ($isClosing ? slideDown : slideUp)} 0.3s
    ease-out;
  animation-fill-mode: forwards;
  visibility: ${({ $isClosing }) => ($isClosing ? 'hidden' : 'visible')};
  transition: visibility 0.3s ease-out;
  pointer-events: ${({ $isClosing }) => ($isClosing ? 'none' : 'auto')};
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const ModalTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const ModalContent = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const CalendarContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};

  .react-calendar {
    width: 100%;
    border: none;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    background-color: ${({ theme }) => theme.colors.background.primary};
    font-family: inherit;
  }

  .react-calendar__navigation {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .react-calendar__navigation button {
    min-width: 44px;
    background: none;
    font-size: ${({ theme }) => theme.typography.fontSizes.lg};
    color: ${({ theme }) => theme.colors.text.tertiary};
    transition: color 0.2s ease;
    padding: 0;
    line-height: 1;
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.colors.primary.main};
    }
  }

  .react-calendar__navigation__label {
    font-size: ${({ theme }) => theme.typography.fontSizes.md};
    font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
    color: ${({ theme }) => theme.colors.text.primary};
    margin: 0;
    pointer-events: none;
  }

  .react-calendar__navigation__prev2-button,
  .react-calendar__navigation__next2-button {
    display: none;
  }

  .react-calendar__month-view__weekdays {
    text-align: center;
    text-transform: uppercase;
    font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
    font-size: ${({ theme }) => theme.typography.fontSizes.xs};
    color: ${({ theme }) => theme.colors.text.tertiary};
    padding: ${({ theme }) => theme.spacing[12]} 0;
  }

  .react-calendar__month-view__weekdays__weekday abbr {
    text-decoration: none;
  }

  .react-calendar__tile {
    max-width: 100%;
    padding: ${({ theme }) => theme.spacing[12]} 0;
    background: none;
    text-align: center;
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    cursor: pointer;
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    transition: all 0.2s ease;
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background-color: ${({ theme }) => theme.colors.background.secondary};
    color: ${({ theme }) => theme.colors.primary.main};
  }

  .react-calendar__tile--now {
    background: ${({ theme }) => theme.colors.secondary.main};
    color: ${({ theme }) => theme.colors.text.primary};
    font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  }

  .react-calendar__tile--active {
    background: ${({ theme }) => theme.colors.primary.main};
    color: ${({ theme }) => theme.colors.white};
    font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  }

  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: ${({ theme }) => theme.colors.primary.hover};
    color: ${({ theme }) => theme.colors.white};
  }

  .booked-date {
    background-color: ${({ theme }) => theme.colors.neutral[200]};
    color: ${({ theme }) => theme.colors.neutral[600]};
    cursor: not-allowed;
  }

  .original-date {
    background-color: ${({ theme }) => theme.colors.tertiary.main};
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

export const DateInfo = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  padding: 0 ${({ theme }) => theme.spacing.md};
`;

export const DateInfoTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const DateInfoContent = styled.div`
  background-color: ${({ theme }) => theme.colors.neutral[100]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.sm} 0;
`;

export const DateInfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};

  &:last-child {
    margin-bottom: 0;
  }
`;

export const DateLabel = styled.span<{
  $bold?: boolean;
  $primary?: boolean;
  $tertiary?: boolean;
  $scheduled?: boolean;
}>`
  background-color: ${({ $primary, $tertiary, $scheduled, theme }) =>
    $primary
      ? theme.colors.primary.main
      : $tertiary
        ? theme.colors.tertiary.main
        : $scheduled
          ? theme.colors.neutral[200]
          : 'transparent'};
  color: ${({ $primary, $tertiary, $scheduled, theme }) =>
    $primary
      ? theme.colors.white
      : $tertiary
        ? theme.colors.primary.main
        : $scheduled
          ? theme.colors.neutral[600]
          : 'transparent'};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  font-weight: ${({ $bold, theme }) =>
    $bold ? theme.typography.fontWeights.bold : theme.typography.fontWeights.normal};
`;

export const DateValue = styled.span<{ $bold?: boolean }>`
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: ${({ $bold, theme }) =>
    $bold ? theme.typography.fontWeights.bold : theme.typography.fontWeights.normal};
`;

export const NoticeText = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const ButtonGroup = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 2fr;
  gap: ${({ theme }) => theme.spacing[12]};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

export const CancelButton = styled.button`
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

export const ConfirmButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.round};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.primary.hover};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.background.secondary};
    cursor: not-allowed;
  }
`;

export const StatusMessage = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
`;
