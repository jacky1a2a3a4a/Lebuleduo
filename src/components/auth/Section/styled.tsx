import styled from 'styled-components';

export const LoginSectionStyled = styled.div`
  background: ${({ theme }) => theme.colors.primary.main};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image:
      radial-gradient(
        circle at 20% 20%,
        rgba(68, 93, 179, 0.05) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 80% 80%,
        rgba(247, 221, 151, 0.05) 0%,
        transparent 50%
      );
    pointer-events: none;
  }
`;
