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
  z-index: 1001;

  padding: ${({ theme }) => theme.spacing.md};

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
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const CalendarNavButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const CalendarNavButton = styled.button`
  background: none;
  border: none;
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text.tertiary};
  cursor: pointer;
  padding: 0;
  line-height: 1;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

export const CalendarTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

export const CalendarCloseButton = styled.button`
  background: none;
  border: none;
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  color: ${({ theme }) => theme.colors.text.tertiary};
  cursor: pointer;
  padding: 0;
  line-height: 1;
`;

export const CalendarContent = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const CalendarWeekday = styled.div`
  text-align: center;
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text.tertiary};
  padding: ${({ theme }) => theme.spacing.xs} 0;
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
`;

export const CalendarDay = styled.div<{
  $isCurrentMonth: boolean;
  $isSelected: boolean;
  $isToday: boolean;
  $isDisabled?: boolean;
}>`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xs} 0;
  cursor: ${({ $isDisabled }) => ($isDisabled ? 'not-allowed' : 'pointer')};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: ${({ $isSelected, $isToday, $isDisabled, theme }) =>
    $isDisabled
      ? theme.colors.background.secondary
      : $isSelected
        ? theme.colors.primary.main
        : $isToday
          ? theme.colors.secondary.main
          : 'transparent'};
  color: ${({ $isCurrentMonth, $isSelected, $isToday, $isDisabled, theme }) =>
    $isToday
      ? theme.colors.text.primary
      : $isDisabled
        ? theme.colors.text.disabled
        : $isSelected
          ? theme.colors.white
          : $isCurrentMonth
            ? theme.colors.text.primary
            : theme.colors.text.disabled};
  font-weight: ${({ $isSelected, $isToday, theme }) =>
    $isSelected || $isToday
      ? theme.typography.fontWeights.bold
      : theme.typography.fontWeights.normal};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};

  &:hover {
    background: ${({ $isSelected, $isDisabled, theme }) =>
      $isDisabled
        ? theme.colors.background.secondary
        : $isSelected
          ? theme.colors.primary.main
          : theme.colors.background.secondary};
  }
`;

export const CalendarButtonGroup = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 2fr;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

export const CalendarSubmitButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.round};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.hover};
  }
`;

export const CalendarCancelButton = styled.button`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  color: ${({ theme }) => theme.colors.text.tertiary};
  border: 1px solid ${({ theme }) => theme.colors.neutral[300]};
  border-radius: ${({ theme }) => theme.borderRadius.round};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.secondaryHover};
  }
`;
