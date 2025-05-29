import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};
`;

export const SearchInput = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.gray[100]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  width: 200px;
  font-size: ${({ theme }) => theme.typography.fontSizes['2xs']};

  input {
    border: none;
    background: none;
    margin-left: ${({ theme }) => theme.spacing.sm};
    width: 100%;
    outline: none;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-right: ${({ theme }) => theme.spacing.sm};

  .avatar {
    color: ${({ theme }) => theme.colors.white};
    width: 25px;
    height: 25px;
    background-color: ${({ theme }) => theme.colors.primary.main};
    border-radius: ${({ theme }) => theme.borderRadius.round};

    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  }

  span {
    font-size: ${({ theme }) => theme.typography.fontSizes['2xs']};
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;
