import styled from 'styled-components';

export const AppLayoutStyled = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  width: ${({ theme }) => theme.breakpoints.mobile};
  height: 100vh;
  margin: 0 auto;
`;

export const Main = styled.main`
  background-color: ${({ theme }) => theme.colors.gray[200]};
  height: 100%;
  overflow: hidden;
`; 