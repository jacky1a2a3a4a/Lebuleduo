import styled from 'styled-components';
import { StyledProps } from './types';

//最外層容器
export const MyOrderSectionStyled = styled.section`
  background-color: var(--color-primary);
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;

  padding: 0 var(--spacing-md) var(--spacing-md);

  overflow: hidden;
`;

// 使用者卡片 最外層區塊
export const UserCardSection = styled.section`
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  margin-bottom: var(--spacing-sm);
  padding: 0 var(--spacing-md);
`;

// 狗圖容器
export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed; /* 改為 fixed 定位 */
  top: 78px; /* 調整固定垂直位置 */
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
  color: var(--color-white);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--spacing-sm);
`;

// 使用者卡片 項目
export const UserCardItem = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  gap: var(--spacing-sm);
  width: 100%;
  height: 100%;
  margin-bottom: var(--spacing-xs);
`;

export const UserCardItemColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;

  margin-bottom: var(--spacing-xs);
`;

// 使用者卡片 標題
export const UserCardTitle = styled.div`
  color: var(--color-tertiary);

  display: flex;
  align-items: flex-end;
  height: 100%;

  margin-right: var(--spacing-sm);

  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
`;

// 使用者卡片 查看詳情按鈕
export const UserCardButton = styled.button`
  color: var(--color-tertiary);
  opacity: 0.7;

  display: flex;
  align-items: center;
  gap: 2px;
  height: 100%;

  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  text-decoration: underline;

  svg {
    padding-top: 1px;
    font-size: var(--font-size-xs);
  }
`;

// 使用者卡片 收運日期
export const UserCardDate = styled.div`
  color: var(--color-white);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-normal);
`;

// 使用者卡片 收運時間
export const UserCardTime = styled.div`
  color: var(--color-white);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  letter-spacing: 0.05em;
`;

// 使用者卡片 圖示
export const UserIconItem = styled.div`
  color: var(--color-gray-600);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: var(--spacing-sm);
`;

// 使用者卡片 文字 - 修改為 span 避免 p 嵌套
export const UserTextItem = styled.span`
  color: var(--color-gray-500);

  text-align: center;

  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
`;

// 使用者卡片 內容
export const UserCardContent = styled.div`
  color: var(--color-gray-600);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  font-weight: var(--font-weight-medium);
`;

// 使用者卡片 訂單狀態
export const OrderStatus = styled.div`
  background-color: var(--color-gray-0);
  color: var(--color-gray-600);
  border-radius: var(--border-radius-round);
  box-shadow: var(--card-shadow);

  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);

  padding: var(--spacing-xs) var(--spacing-sm);
`;

// ===== 進度條相關組件 =====

// 進度條 最外層區塊
export const ProgressBarSection = styled.div`
  width: 100%;
  margin-bottom: var(--spacing-md);
`;

// 進度條 白底圓角容器
export const BackgroundContainer = styled.div`
  background-color: var(--color-background-secondary);
  border: 3px solid var(--color-secondary);
  border-radius: var(--border-radius-round);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: var(--spacing-lg) var(--spacing-2xl) var(--spacing-sm);
`;

// 進度條 容器
export const ProgressBarContainer = styled.div`
  background-color: var(--color-neutral-300);
  border-radius: var(--border-radius-round);

  position: relative;
  width: 100%;
  height: 5px;

  padding: 0 var(--spacing-sm);
`;

// 進度條 填充
export const ProgressBarFill = styled.div<StyledProps>`
  background-color: var(--color-primary);
  width: ${({ $progress }) => ($progress ? `${$progress}%` : '0%')};

  height: 100%;

  transition: width 0.3s ease;
`;

// 進度點容器
export const ProgressDotContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

// 進度圖標
export const DogTruckImage = styled.img<StyledProps>`
  position: absolute;
  z-index: 3;
  top: -15px;
  left: ${({ $progress }) =>
    $progress === 0 ? '0' : $progress === 50 ? '50%' : '100%'};
  transform: ${({ $progress }) =>
    $progress === 0
      ? 'translateX(-50%)'
      : $progress === 50
        ? 'translateX(-50%)'
        : 'translateX(-50%)'};
  width: 40px;
  object-fit: contain;
`;

// 進度點
export const ProgressDot = styled.div<StyledProps>`
  position: absolute;
  left: ${({ $position }) =>
    $position === 0 ? '0' : $position === 50 ? '50%' : '100%'};
  top: 50%;
  transform: ${({ $position }) =>
    $position === 0
      ? 'translateY(-50%)'
      : $position === 100
        ? 'translate(-100%, -50%)'
        : 'translate(-50%, -50%)'};
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: ${({ $isActive, $isPassed }) =>
    $isActive || $isPassed ? 'none' : '2px solid var(--color-secondary)'};
  background-color: ${({ $isActive, $isPassed }) =>
    $isActive || $isPassed ? 'var(--color-primary)' : 'var(--color-white)'};
  z-index: 2;
`;

// 進度條 狀態 文字
export const ProgressStatus = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: var(--spacing-xs);
`;

// 進度狀態 文字
export const ProgressItem = styled.div<StyledProps>`
  // isActive 是否為當前狀態 900
  // isPassed 是否已通過 600
  // 已完成 400
  // isUnscheduled 未排定狀態
  color: ${({ $isActive, $isPassed, $isUnscheduled }) =>
    $isUnscheduled
      ? 'var(--color-gray-400)'
      : $isActive
        ? 'var(--color-primary)'
        : $isPassed
          ? 'var(--color-gray-600)'
          : 'var(--color-gray-400)'};

  font-weight: ${({ $isActive, $isPassed }) =>
    $isActive || $isPassed
      ? 'var(--font-weight-bold)'
      : 'var(--font-weight-normal)'};

  z-index: 1;
  position: relative;

  text-align: center;
  padding-top: var(--spacing-sm);

  font-size: var(--font-size-xs);
`;

// ===== 訂單卡片相關組件 =====

// 訂單列表 區塊
export const OrderListSection = styled.div`
  background-color: var(--color-background-secondary);
  border-radius: var(--border-radius-xl);
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: var(--spacing-12);
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

// 訂單列表 容器
export const OrderList = styled.div`
  /* background-color: var(--color-gray-100); */
  flex: 1; /* 佔據OrderListSection中的所有可用空間 */
  display: flex;
  flex-direction: column;
`;

// 訂單卡片 容器
export const OrderCard = styled.div<{ $isCompleted?: boolean }>`
  background-color: ${({ $isCompleted }) =>
    $isCompleted ? 'var(--color-neutral-200)' : 'var(--color-white)'};
  border: 1px solid var(--color-neutral-400);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  position: relative;
  z-index: 1;
  overflow: hidden;
  cursor: pointer;
  width: 100%;
  padding: var(--spacing-12);
  margin-bottom: var(--spacing-md);
  border-radius: var(--border-radius-lg);
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--color-gray-300);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-4px);
  }

  &:active {
    background-color: var(--color-gray-50);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px) scale(0.98);
  }
`;

// 訂單卡片 排版
export const OrderCardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  width: 100%;
`;

// 訂單照片容器
export const OrderPhotoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: var(--spacing-12);
  width: 100%;
`;

// 訂單照片 - 無圖片時的佔位元素
export const OrderPhoto = styled.div`
  background-color: var(--color-gray-200);
  color: var(--color-gray-400);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  aspect-ratio: 3/4;
  border-radius: var(--border-radius-lg);
  font-size: var(--font-size-xl);
`;

// 訂單照片圖片
export const OrderPhotoImage = styled.img`
  object-fit: cover;
  width: 100%;
  aspect-ratio: 3/4;
  border-radius: var(--border-radius-lg);
`;

// 訂單 文字資訊
export const OrderCardData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  overflow: hidden;
  width: 100%;
`;

// 訂單卡片 標題
export const OrderCardTitle = styled.div`
  color: var(--color-text-primary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--spacing-12);
`;

// 訂單卡片 項目容器
export const OrderCardItems = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: var(--spacing-xs);
`;

// 訂單卡片 項目
export const OrderCardItem = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  gap: var(--spacing-xs);
`;

// 訂單卡片 副標題 - 修改為 div 避免 p 嵌套問題
export const OrderCardSubtitle = styled.div<StyledProps>`
  color: ${({ $primary }) =>
    $primary ? 'var(--color-primary)' : 'var(--color-neutral-400)'};

  font-size: var(--font-size-xs);
  min-width: 70px;
  flex-shrink: 0;
`;

// 訂單卡片 詳情 - 修改為 div 避免 p 嵌套問題
export const OrderCardDetail = styled.div<StyledProps>`
  color: ${({ $primary }) =>
    $primary ? 'var(--color-primary)' : 'var(--color-neutral-400)'};
  text-align: right;
  overflow: hidden;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  flex: 1;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

// ===== 標籤相關組件 =====

// 訂單列表容器（包含標籤和列表）
export const OrderContainer = styled.div`
  display: grid;
  grid-template-columns: 40px 1fr;
  width: 100%;
  flex: 1;
  min-height: 0;
`;

// 標籤容器
export const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  z-index: 1;
`;

// 標籤項目
export const TabItem = styled.div<StyledProps>`
  background-color: ${({ $isActive }) =>
    $isActive ? 'var(--color-background-secondary)' : 'var(--color-secondary)'};
  color: ${({ $isActive }) =>
    $isActive ? 'var(--color-primary)' : 'var(--color-text-primary)'};
  border-radius: var(--border-radius-lg);
  box-shadow: ${({ $isActive }) =>
    $isActive ? '0 0 10px 0 rgba(0, 0, 0, 0.1)' : 'none'};

  font-weight: var(--font-weight-medium);
  letter-spacing: 0.2em;
  writing-mode: vertical-rl; /* 垂直文字，從右到左 */
  text-orientation: upright; /* 讓單個字符直立顯示 */
  min-height: 160px; /* 確保有足夠的高度顯示垂直文字 */

  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: ${({ $isActive }) => ($isActive ? 2 : 1)};
  margin-bottom: -20px; /* 讓標籤重疊 */
  padding: var(--spacing-md) var(--spacing-12);
  cursor: pointer;
  transition:
    all 0.3s ease,
    z-index 0s;

  /* 斜角效果 - 左右翻轉 */
  clip-path: polygon(
    100% 0%,
    /* 右上角 */ 0% 0%,
    /* 左上角 */ 0% 90%,
    /* 左側中間點開始斜角 */ 60% 100%,
    /* 底部左側結束斜角 */ 100% 100% /* 右下角 */
  );
`;
