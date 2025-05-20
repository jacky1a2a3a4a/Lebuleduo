import styled from 'styled-components';

export const FullHeightContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background.primary};
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;
