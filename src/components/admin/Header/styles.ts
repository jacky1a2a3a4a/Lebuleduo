import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md);
  background-color: var(--color-white);
  border-bottom: 1px solid var(--color-gray-200);
`;

export const SearchInput = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--color-gray-100);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-sm) var(--spacing-md);
  width: 300px;

  font-size: var(--font-size-xs);

  input {
    border: none;
    background: none;
    margin-left: var(--spacing-sm);
    width: 100%;
    outline: none;
    font-size: var(--font-size-xs);
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);

  .avatar {
    color: var(--color-white);
    width: 30px;
    height: 30px;
    background-color: var(--color-primary);
    border-radius: var(--border-radius-round);

    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-bold);
  }

  span {
    font-size: var(--font-size-xs);
    color: var(--color-text-primary);
  }
`;
