import styled from 'styled-components';

export const SelectContainer = styled.div<{ width?: string }>`
  position: relative;
  width: ${(props) => props.width || '80px'};
`;

export const SelectButton = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing['2xs']} ${({ theme }) => theme.spacing.xs};
  border: 1px solid ${({ theme }) => theme.colors.neutral[300]};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: ${({ theme }) => theme.colors.white};
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.fontSizes['3xs']};
  color: ${({ theme }) => theme.colors.text.primary};

  &:hover {
    border-color: ${({ theme }) => theme.colors.neutral[400]};
  }
`;

export const OptionsContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.neutral[300]};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  margin-top: ${({ theme }) => theme.spacing['2xs']};
  max-height: 160px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

export const Option = styled.div<{ selected?: boolean }>`
  padding: ${({ theme }) => theme.spacing['2xs']} ${({ theme }) => theme.spacing.sm};
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.fontSizes['3xs']};
  color: ${({ theme }) => theme.colors.text.primary};
  background-color: ${(props) =>
    props.selected ? props.theme.colors.neutral[200] : 'transparent'};

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral[200]};
  }
`;
