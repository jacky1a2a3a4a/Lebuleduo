import styled from 'styled-components';

//容器
const TaskCardWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: calc(var(--min-width-mobile) - 2rem);
  margin-bottom: 1rem;
`;

const TaskCardItem = styled.div`
  border: 1.5px solid var(--color-gray-300);
  border-radius: var(--border-radius-lg);
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem;
`;

const TaskCardContent = styled.div`
  display: grid;
  grid-template-columns: minmax(60px, 1fr) minmax(180px, 3fr);
  align-items: start;
  gap: 1rem;
  margin-bottom: 1rem;
  width: 100%;
`;

const TaskImg = styled.div`
  background-color: var(--color-gray-200);
  border-radius: var(--border-radius-lg);
  width: 100%;
  aspect-ratio: 1/1;
`;

const TaskDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

const TaskCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.25rem;
`;

const TaskTitle = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
`;

const TaskTag = styled.div`
  background-color: var(--color-gray-200);
  color: var(--color-gray-600);

  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.25rem 1rem;
  border-radius: var(--border-radius-round);
`;

const TaskAddress = styled.div`
  font-size: 0.875rem;
  font-weight: 400;
  margin-top: 0.25rem;
`;

const TaskUser = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
`;

const TaskCardButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-between;
`;

const TaskCardButton = styled.button`
  padding: 0.75rem 1rem;
  border-radius: var(--border-radius-round);
  font-weight: 500;
  cursor: pointer;
  border: none;

  &:first-child {
    background-color: var(--color-gray-700);
    color: var(--color-gray-0);
    flex: 2;

    &:hover {
      background-color: var(--color-gray-800);
    }
  }

  &:last-child {
    background-color: var(--color-gray-200);
    color: var(--color-gray-600);
    flex: 1;

    &:hover {
      background-color: var(--color-gray-300);
    }
  }
`;

function TaskCard() {
  return (
    <TaskCardWrapper>
      <TaskCardItem>
        <TaskCardContent>
          <TaskImg />
          <TaskDetailContainer>
            <TaskCardHeader>
              <TaskTitle>10:00am</TaskTitle>
              <TaskTag>代收運</TaskTag>
            </TaskCardHeader>
            <TaskAddress>高雄市三民區和平一路124號5F</TaskAddress>
            <TaskUser>林先生</TaskUser>
          </TaskDetailContainer>
        </TaskCardContent>

        <TaskCardButtons>
          <TaskCardButton>確認前往</TaskCardButton>
          <TaskCardButton>訂單詳情</TaskCardButton>
        </TaskCardButtons>
      </TaskCardItem>
    </TaskCardWrapper>
  );
}

export default TaskCard;
