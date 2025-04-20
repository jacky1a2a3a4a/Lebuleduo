import styled from 'styled-components';

interface TaskContainerProps {
  children: React.ReactNode;
}

const Container = styled.div`
  background-color: var(--color-background-secondary);
  min-height: calc(100vh - var(--header-height));
  display: flex;
  flex-direction: column;
  padding: var(--spacing-md);

  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const TaskContainer: React.FC<TaskContainerProps> = ({ children }) => {
  return <Container>{children}</Container>;
};
