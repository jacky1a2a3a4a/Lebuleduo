import styled from 'styled-components';

// 最外層 大容器
export const ScanOrderSectionStyled = styled.section`
  background-color: var(--color-primary);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: var(--spacing-xl);
  min-height: 100%;
`;

// 掃描器容器
export const ScannerContainer = styled.div`
  width: 100%;
  max-width: 500px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 掃描文字
export const ScanText = styled.div`
  color: var(--color-white);
  font-size: var(--font-size-md);
  margin-top: var(--spacing-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  line-height: 1;

  svg {
    display: flex;
    align-items: center;
    margin-bottom: -2px;
    font-size: var(--font-size-lg);
    line-height: 1;
  }
`;

// 狀態訊息
export const StatusMessage = styled.div`
  color: var(--color-error);
  font-size: var(--font-size-sm);
  margin-top: var(--spacing-sm);
  text-align: center;
`;
