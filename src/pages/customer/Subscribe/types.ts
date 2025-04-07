// styled-components 組件屬性類型
export interface StyledProps {
  $active?: boolean; // 定義元件是否處於活動狀態
  $light?: boolean; // 定義元件是否使用淺色樣式
  $open?: boolean; // 定義元件（如下拉選單）是否展開
  $error?: boolean; // 定義元件是否顯示錯誤狀態
}

// 方案類型
export interface Plan {
  PlanID: number;
  PlanName: string;
  Liter: number;
  kg: number;
  Price: number;
  PlanPeople?: string; // 收運方案適用人數
  PlanDescription?: string; // 方案描述
}
