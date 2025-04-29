import styled from 'styled-components';

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
  background-color: var(--color-white);
  border-radius: var(--border-radius-lg);
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  transform: ${({ $isClosing }) => ($isClosing ? 'scale(0.95)' : 'scale(1)')};
  transition: transform 0.3s ease;
`;

export const ModalHeader = styled.div`
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--color-neutral-200);
`;

export const ModalTitle = styled.h2`
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0;
`;

export const ModalContent = styled.div`
  padding: var(--spacing-md);
`;

export const CalendarContainer = styled.div`
  margin-bottom: var(--spacing-md);

  .react-calendar {
    width: 100%;
    border: none;
    border-radius: var(--border-radius-md);
    background-color: var(--color-white);
    font-family: inherit;
  }

  .react-calendar__navigation {
    margin-bottom: var(--spacing-sm);
  }

  .react-calendar__navigation button {
    min-width: 44px;
    background: none;
    font-size: var(--font-size-md);
    margin-top: 8px;
  }

  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: var(--color-neutral-100);
  }

  .react-calendar__month-view__weekdays {
    text-align: center;
    text-transform: uppercase;
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-xs);
  }

  .react-calendar__month-view__weekdays__weekday {
    padding: var(--spacing-xs);
  }

  .react-calendar__month-view__weekdays__weekday abbr {
    text-decoration: none;
  }

  .react-calendar__month-view__days__day--weekend {
    color: var(--color-error);
  }

  .react-calendar__tile {
    max-width: 100%;
    padding: var(--spacing-xs) 0;
    background: none;
    text-align: center;
    line-height: 16px;
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background-color: var(--color-neutral-100);
    color: var(--color-primary);
    border-radius: var(--border-radius-round);
  }

  .react-calendar__tile--now {
    background: var(--color-primary-light);
    border-radius: var(--border-radius-round);
  }

  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: var(--color-primary);
    color: var(--color-white);
  }

  .react-calendar__tile--hasActive {
    background: var(--color-primary);
    color: var(--color-white);
    border-radius: var(--border-radius-round);
  }

  .react-calendar__tile--active {
    background: var(--color-primary);
    color: var(--color-white);
    border-radius: var(--border-radius-round);
  }

  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: var(--color-primary-dark);
  }

  .react-calendar--selectRange .react-calendar__tile--hover {
    background-color: var(--color-neutral-100);
  }

  .booked-date {
    background-color: var(--color-neutral-200);
    color: var(--color-neutral-500);
    border-radius: var(--border-radius-round);
    cursor: not-allowed;
  }

  .original-date {
    background-color: var(--color-tertiary);
    color: var(--color-white);
    border-radius: var(--border-radius-round);
  }
`;

export const DateInfo = styled.div`
  margin-bottom: var(--spacing-md);
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
  padding: var(--spacing-md);
`;

export const DateInfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--spacing-sm);

  &:last-child {
    margin-bottom: 0;
  }
`;

export const DateLabel = styled.span<{ $bold?: boolean }>`
  color: var(--color-text-secondary);
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
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-md);
  line-height: 1.5;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-sm);
`;

export const CancelButton = styled.button`
  background-color: var(--color-neutral-200);
  color: var(--color-text-primary);
  border: none;
  border-radius: var(--border-radius-round);
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--color-neutral-300);
  }
`;

export const ConfirmButton = styled.button`
  background-color: var(--color-primary);
  color: var(--color-white);
  border: none;
  border-radius: var(--border-radius-round);
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background-color: var(--color-primary-dark);
  }

  &:disabled {
    background-color: var(--color-neutral-300);
    cursor: not-allowed;
  }
`;

export const StatusMessage = styled.div`
  text-align: center;
  padding: var(--spacing-lg);
  color: var(--color-text-secondary);
`;
