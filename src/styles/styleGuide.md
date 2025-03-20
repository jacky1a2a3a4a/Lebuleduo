# 樣式指南

## CSS-in-JS 編寫規範

### 屬性排序規則

```typescript
const StyledComponent = styled.div`
  /* 1. 顏色相關 */
  background-color: xxx;
  color: xxx;
  border-相關屬性;

  /* 2. 定位相關 */
  position: xxx;
  z-index: xxx;
  top/right/bottom/left: xxx;
  transform: xxx;
  display: xxx;
  flex-相關屬性;

  /* 3. 尺寸相關 */
  font-相關屬性;
  width: xxx;
  height: xxx;
  margin: xxx;
  padding: xxx;

  /* 4. 其他樣式 */
  transition: xxx;
  其他特效;

  /* 5. 偽元素和媒體查詢等 */
  &:hover/after/before {
    /* 依照上述順序 */
  }
  @media {
    /* 依照上述順序 */
  }
`;
```

### 格式規範

1. **屬性排序**

   - 顏色相關屬性優先
   - 接著是定位相關屬性
   - 然後是尺寸相關屬性
   - 最後是其他樣式屬性
   - 特殊效果（如偽元素、媒體查詢）放在最後

2. **Props 使用方式**

   ```typescript
   // 推薦
   ${({ prop }) => prop}

   // 不推薦
   ${(props) => props.prop}
   ```

3. **TypeScript 類型定義**

   ```typescript
   type ComponentProps = {
     prop1: string;
     prop2: number;
   };

   const StyledComponent = styled.div<ComponentProps>``;
   ```

### 註釋規範

1. **需要註解的情況**

   - 複雜的邏輯實現
   - 特殊的計算方式
   - 動態樣式的處理
   - 特殊效果的實現方式

2. **註解示例**

   ```typescript
   const ComplexComponent = styled.div`
     /* 實現橫向滾動，同時隱藏滾動條 */
     overflow-x: auto;
     overflow-y: hidden;
     -webkit-overflow-scrolling: touch;
     &::-webkit-scrollbar {
       display: none;
     }

     /* 動態計算容器高度，確保底部留有空間 */
     height: calc(100vh - ${(props) => props.topPosition}px - 4rem);

     /* 右側漸層淡出效果 */
     &::after {
       content: '';
       position: absolute;
       right: 0;
       background: linear-gradient(to right, transparent, white);
     }
   `;
   ```

### 範例

```typescript
// 分類標籤容器
const CategoryContainer = styled.div`
  background-color: var(--color-gray-100);
  position: fixed;
  z-index: 15;
  top: ${({ topPosition }) => `${topPosition}px`};
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  padding: 0.75rem var(--spacing-sm);
  display: flex;
  gap: 0.75rem;

  /* 實現橫向滾動，同時隱藏滾動條 */
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }

  /* 確保最後一個標籤有足夠空間 */
  &::after {
    content: '';
    padding-right: 2rem;
  }
`;
```

## 使用說明

1. 按照規定的順序編寫樣式屬性
2. 只在必要時添加註解（複雜邏輯、特殊計算等）
3. Code Review 時檢查是否符合規範

## 注意事項

1. 保持一致性是最重要的
2. 基本樣式屬性（顏色、定位、尺寸）不需要註解
3. 複雜的邏輯實現必須添加註解說明
4. 規範可以根據專案需求調整
