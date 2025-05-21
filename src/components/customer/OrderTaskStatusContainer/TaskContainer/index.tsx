import styled from 'styled-components';

type TaskContainerProps = {
  children: React.ReactNode;
};

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  min-height: calc(100vh - var(--header-height));
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.md};

  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const TaskContainer: React.FC<TaskContainerProps> = ({ children }) => {
  return <Container>{children}</Container>;
};
