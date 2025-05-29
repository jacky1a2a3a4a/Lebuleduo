import styled from 'styled-components';
import { HiBell } from 'react-icons/hi2';

// 鈴鐺容器，控制位置
export const BellContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

// 鈴鐺圖標按鈕
export const BellIcon = styled(HiBell)`
  width: 1.5rem;
  height: 1.5rem;
  color: ${({ theme }) => theme.colors.tertiary.main};
  cursor: pointer;
  pointer-events: none;

  &:hover {
    color: ${({ theme }) => theme.colors.tertiary.hover};
  }
`; 