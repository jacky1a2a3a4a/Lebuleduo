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
  background: var(--color-background-primary);
  border: 2px solid var(--color-neutral-300);
  border-radius: var(--border-radius-xl) var(--border-radius-xl) 0 0;
  box-shadow: var(--shadow-lg);
  width: 100%;
  max-width: var(--mobile-min-width);
  max-height: 90vh;
  overflow-y: auto;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 1000;
  padding: var(--spacing-md);
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
  margin-bottom: var(--spacing-sm);
`;

export const ModalTitle = styled.h2`
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
`;

export const ModalContent = styled.div`
  margin-bottom: var(--spacing-md);
`;

export const CalendarContainer = styled.div`
  margin-bottom: var(--spacing-md);

  .react-calendar {
    width: 100%;
    border: none;
    border-radius: var(--border-radius-md);
    background-color: var(--color-background-primary);
    font-family: inherit;
  }

  .react-calendar__navigation {
    margin-bottom: var(--spacing-sm);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .react-calendar__navigation button {
    min-width: 44px;
    background: none;
    font-size: var(--font-size-lg);
    color: var(--color-text-tertiary);
    transition: color 0.2s ease;
    padding: 0;
    line-height: 1;
    cursor: pointer;

    &:hover {
      color: var(--color-primary);
    }
  }

  .react-calendar__navigation__label {
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-bold);
    color: var(--color-text-primary);
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
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-xs);
    color: var(--color-text-tertiary);
    padding: var(--spacing-12) 0;
  }

  .react-calendar__month-view__weekdays__weekday abbr {
    text-decoration: none;
  }

  .react-calendar__tile {
    max-width: 100%;
    padding: var(--spacing-12) 0;
    background: none;
    text-align: center;
    font-size: var(--font-size-sm);
    cursor: pointer;
    border-radius: var(--border-radius-lg);
    transition: all 0.2s ease;
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background-color: var(--color-background-secondary);
    color: var(--color-primary);
  }

  .react-calendar__tile--now {
    background: var(--color-secondary);
    color: var(--color-text-primary);
    font-weight: var(--font-weight-bold);
  }

  .react-calendar__tile--active {
    background: var(--color-primary);
    color: var(--color-white);
    font-weight: var(--font-weight-bold);
  }

  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: var(--color-primary-hover);
    color: var(--color-white);
  }

  .booked-date {
    background-color: var(--color-neutral-200);
    color: var(--color-neutral-600);
    cursor: not-allowed;
  }

  .original-date {
    background-color: var(--color-tertiary);
    color: var(--color-primary);
  }
`;

export const DateInfo = styled.div`
  margin-bottom: var(--spacing-sm);
  padding: 0 var(--spacing-md);
`;

export const DateInfoTitle = styled.h3`
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-sm);
`;

export const DateInfoContent = styled.div`
  background-color: var(--color-neutral-100);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-sm) 0;
`;

export const DateInfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--spacing-sm);
  font-size: var(--font-size-sm);

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
  background-color: ${({ $primary, $tertiary, $scheduled }) =>
    $primary
      ? 'var(--color-primary)'
      : $tertiary
        ? 'var(--color-tertiary)'
        : $scheduled
          ? 'var(--color-neutral-200)'
          : 'transparent'};
  color: ${({ $primary, $tertiary, $scheduled }) =>
    $primary
      ? 'var(--color-white)'
      : $tertiary
        ? 'var(--color-primary)'
        : $scheduled
          ? 'var(--color-neutral-600)'
          : 'transparent'};
  border-radius: var(--border-radius-sm);
  padding: var(--spacing-xs) var(--spacing-sm);
  font-weight: ${({ $bold }) =>
    $bold ? 'var(--font-weight-bold)' : 'var(--font-weight-normal)'};
`;

export const DateValue = styled.span<{ $bold?: boolean }>`
  color: var(--color-text-primary);
  font-weight: ${({ $bold }) =>
    $bold ? 'var(--font-weight-bold)' : 'var(--font-weight-normal)'};
`;

export const NoticeText = styled.div`
  color: var(--color-text-secondary);
  font-size: var(--font-size-2xs);
  padding: 0 var(--spacing-md);
  margin-bottom: var(--spacing-md);
  line-height: 1.5;
`;

export const ButtonGroup = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 2fr;
  gap: var(--spacing-12);
  margin-top: var(--spacing-md);
`;

export const CancelButton = styled.button`
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

export const ConfirmButton = styled.button`
  background-color: var(--color-primary);
  color: var(--color-white);
  border-radius: var(--border-radius-round);
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover:not(:disabled) {
    background-color: var(--color-primary-hover);
  }

  &:disabled {
    background-color: var(--color-background-secondary);
    cursor: not-allowed;
  }
`;

export const StatusMessage = styled.div`
  text-align: center;
  padding: var(--spacing-lg);
  color: var(--color-text-secondary);
`;
