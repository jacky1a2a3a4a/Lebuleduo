import styled from 'styled-components';

type ContainerStyledProps = {
  children: React.ReactNode;
};

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 0 auto;
  width: ${({ theme }) => theme.breakpoints.mobile};
  height: 100vh;
  overflow: hidden;
`;

export const ContainerStyled: React.FC<ContainerStyledProps> = ({
  children,
}) => {
  return <Container>{children}</Container>;
};
