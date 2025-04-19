import styled from 'styled-components';

interface TaskContainerProps {
  children: React.ReactNode;
}

const Container = styled.div`
  background-color: var(--color-background-secondary);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: var(--spacing-md);
`;

export const TaskContainer: React.FC<TaskContainerProps> = ({ children }) => {
  return <Container>{children}</Container>;
};
