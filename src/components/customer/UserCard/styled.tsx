import styled from 'styled-components';

// 使用者卡片 最外層區塊
export const UserCardSection = styled.section`
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  padding: 0 ${({ theme }) => theme.spacing.md};
`;

// 狗圖容器
export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 82px; /* 調整固定垂直位置 */
  left: calc(50% + 90px); /* 從中心點向右偏移固定距離 */
  transform: translateX(-50%); /* 修正偏移 */
  width: 120px;
  height: 120px;
  z-index: 10;
`;

// 狗圖
export const DogImage = styled.img`
  background-color: transparent;
  width: 100%;
  object-fit: contain; /* 改為 contain 以保持圖片比例 */
`;

// 使用者卡片
export const UserCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

// 使用者卡片 問候語
export const UserGreeting = styled.h1`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

// 使用者卡片 項目
export const UserCardItem = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  gap: ${({ theme }) => theme.spacing.sm};
  width: 100%;
  height: 100%;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const UserCardItemColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;

  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

// 使用者卡片 標題
export const UserCardTitle = styled.div`
  color: ${({ theme }) => theme.colors.tertiary.main};

  display: flex;
  align-items: flex-end;
  height: 100%;

  margin-right: ${({ theme }) => theme.spacing.sm};

  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
`;

// 使用者卡片 查看詳情按鈕
export const UserCardButton = styled.button`
  color: ${({ theme }) => theme.colors.tertiary.main};
  opacity: 0.7;

  display: flex;
  align-items: center;
  gap: 2px;
  height: 100%;

  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  text-decoration: underline;

  svg {
    padding-top: 1px;
    font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  }
`;

// 使用者卡片 收運日期
export const UserCardDate = styled.div`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.normal};
`;

// 使用者卡片 收運時間
export const UserCardTime = styled.div`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  letter-spacing: 0.05em;
`; 