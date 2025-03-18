import styled from 'styled-components';

interface DeliverCalendarProps {
  isVisible: boolean;
}

const CalendarContainer = styled.div<{ isVisible: boolean }>`
  background-color: var(--color-gray-0);
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  right: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${(props) => (props.isVisible ? '1rem' : '0')};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--color-gray-300);
  border-radius: var(--border-radius-lg);
  max-height: ${(props) => (props.isVisible ? '200px' : '0')};
  overflow: ${(props) => (props.isVisible ? 'auto' : 'hidden')};

  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform-origin: top center;
  transform: ${(props) => (props.isVisible ? 'scaleY(1)' : 'scaleY(0)')};
  transition:
    transform 0.25s ease,
    opacity 0.25s ease,
    max-height 0.25s ease,
    padding 0.25s ease;
  z-index: 5;
  pointer-events: ${(props) => (props.isVisible ? 'auto' : 'none')};
`;

const CalendarTitle = styled.h2`
  font-size: var(--font-size-lg);
  font-weight: 600;
  margin-bottom: 1rem;
`;

const CalendarContent = styled.div`
  width: 100%;
  min-height: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function DeliverCalendar({ isVisible = false }: DeliverCalendarProps) {
  return (
    <CalendarContainer isVisible={isVisible}>
      <CalendarTitle>行事曆</CalendarTitle>
      <CalendarContent>
        {/* 這裡將來會放置日曆實現 */}
        日曆內容將在這裡顯示
      </CalendarContent>
    </CalendarContainer>
  );
}

export default DeliverCalendar;
