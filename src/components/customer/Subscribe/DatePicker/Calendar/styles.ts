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

export const StyledCalendar = styled.div<{ $isOpen: boolean }>`
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

export const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
`;

export const CalendarNavButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
`;

export const CalendarNavButton = styled.button`
  background: none;
  border: none;
  font-size: var(--font-size-lg);
  color: var(--color-text-tertiary);
  cursor: pointer;
  padding: 0;
  line-height: 1;
  transition: color 0.2s ease;

  &:hover {
    color: var(--color-primary);
  }
`;

export const CalendarTitle = styled.h2`
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0;
`;

export const CalendarCloseButton = styled.button`
  background: none;
  border: none;
  font-size: var(--font-size-xl);
  color: var(--color-text-tertiary);
  cursor: pointer;
  padding: 0;
  line-height: 1;
`;

export const CalendarContent = styled.div`
  margin-bottom: var(--spacing-md);
`;

export const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: var(--spacing-12);
`;

export const CalendarWeekday = styled.div`
  text-align: center;
  font-weight: var(--font-weight-medium);
  color: var(--color-text-tertiary);
  padding: var(--spacing-12) 0;
  font-size: var(--font-size-xs);
`;

export const CalendarDay = styled.div<{
  $isCurrentMonth: boolean;
  $isSelected: boolean;
  $isToday: boolean;
  $isDisabled?: boolean;
}>`
  text-align: center;
  padding: var(--spacing-12) 0;
  cursor: ${({ $isDisabled }) => ($isDisabled ? 'not-allowed' : 'pointer')};
  border-radius: var(--border-radius-lg);
  background: ${({ $isSelected, $isToday, $isDisabled }) =>
    $isDisabled
      ? 'var(--color-background-secondary)'
      : $isSelected
        ? 'var(--color-primary)'
        : $isToday
          ? 'var(--color-secondary)'
          : 'transparent'};
  color: ${({ $isCurrentMonth, $isSelected, $isToday, $isDisabled }) =>
    $isToday
      ? 'var(--color-text-primary)'
      : $isDisabled
        ? 'var(--color-text-disabled)'
        : $isSelected
          ? 'var(--color-white)'
          : $isCurrentMonth
            ? 'var(--color-text-primary)'
            : 'var(--color-text-disabled)'};
  font-weight: ${({ $isSelected, $isToday }) =>
    $isSelected || $isToday
      ? 'var(--font-weight-bold)'
      : 'var(--font-weight-regular)'};
  font-size: var(--font-size-sm);

  &:hover {
    background: ${({ $isSelected, $isDisabled }) =>
      $isDisabled
        ? 'var(--color-background-secondary)'
        : $isSelected
          ? 'var(--color-primary)'
          : 'var(--color-background-secondary)'};
  }
`;

export const CalendarButtonGroup = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 2fr;
  gap: var(--spacing-12);
  margin-top: var(--spacing-md);
`;

export const CalendarSubmitButton = styled.button`
  background-color: var(--color-primary);
  color: var(--color-white);
  border-radius: var(--border-radius-round);
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--color-primary-hover);
  }
`;

export const CalendarCancelButton = styled.button`
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
