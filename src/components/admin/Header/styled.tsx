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
  gap: var(--spacing-sm);
  margin-right: var(--spacing-sm);

  .avatar {
    color: var(--color-white);
    width: 25px;
    height: 25px;
    background-color: var(--color-primary);
    border-radius: var(--border-radius-round);

    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-bold);
  }

  span {
    font-size: var(--font-size-2xs);
    color: var(--color-text-primary);
  }
`;
