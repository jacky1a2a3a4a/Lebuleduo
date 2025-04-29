import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-sm);
  background-color: var(--color-white);
  border-bottom: 1px solid var(--color-gray-200);
`;

export const SearchInput = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--color-gray-100);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-xs) var(--spacing-sm);
  width: 200px;

  font-size: var(--font-size-2xs);

  input {
    border: none;
    background: none;
    margin-left: var(--spacing-sm);
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
