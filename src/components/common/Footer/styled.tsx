import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const minWidthMobilePlus = 403;

// 頁尾外層容器
export const FooterWrapper = styled.div`
  background-color: transparent;
  width: 100%;
  z-index: 99;
`;

// 頁尾容器
export const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.xl} ${({ theme }) => theme.borderRadius.xl} 0 0;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
  height: 64px;
  width: 100%;
  max-width: ${minWidthMobilePlus}px;
  margin: 0 auto;
  z-index: 999;
`;

// 列表項目
export const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
`;

// 頁尾導航連結
export const FooterNavLink = styled(NavLink)<{
  $active?: boolean;
  $disabled?: boolean;
}>`
  color: ${(props) =>
    props.$disabled ? ({ theme }) => theme.colors.gray[400] : ({ theme }) => theme.colors.gray[400]};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  transition: color 0.1s ease;
  pointer-events: ${(props) => (props.$disabled ? 'none' : 'auto')};

  &:hover {
    color: ${(props) =>
      props.$disabled ? ({ theme }) => theme.colors.gray[400] : ({ theme }) => theme.colors.gray[600]};
  }

  &.active {
    color: ${(props) =>
      props.$disabled ? ({ theme }) => theme.colors.gray[400] : ({ theme }) => theme.colors.primary.main};
  }
`;

// 圖標容器
export const IconContainer = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
  margin-bottom: 0.25rem;

  & > svg {
    width: 100%;
    height: 100%;
  }
`;

// 圖標文字
export const IconText = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
`;
