import styled from 'styled-components';

interface ContainerStyledProps {
  children: React.ReactNode;
}

const Container = styled.div`
  background-color: var(--color-background-secondary);
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 0 auto;
  width: var(--mobile-min-width);
  height: 100vh;
  overflow: hidden;
`;

export const ContainerStyled: React.FC<ContainerStyledProps> = ({
  children,
}) => {
  return <Container>{children}</Container>;
};
