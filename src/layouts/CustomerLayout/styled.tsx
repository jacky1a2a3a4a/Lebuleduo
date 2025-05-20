import styled from 'styled-components';

export const AppLayoutStyled = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  width: var(--mobile-min-width);
  height: 100vh;
  margin: 0 auto;
`;

export const Main = styled.main`
  background-color: var(--color-gray-200);
  height: 100%;
  overflow: hidden;
`; 