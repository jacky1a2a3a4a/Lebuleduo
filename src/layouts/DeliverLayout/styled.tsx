import styled from 'styled-components';

export const AppLayoutStyled = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  width: ${({ theme }) => theme.breakpoints.mobile};
  height: 100vh;
  margin: 0 auto;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  overflow: hidden;
`;

export const Main = styled.main`
  background-color: ${({ theme }) => theme.colors.gray[200]};
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
`; 