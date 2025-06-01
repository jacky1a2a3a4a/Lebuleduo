import storage from 'redux-persist/lib/storage'; // 使用 localStorage

export const persistConfig = {
  key: 'lebuleduo-root',
  version: 1,
  // 使用localStorage作為儲存媒介
  storage,
  // 只持久化 user 相關的狀態
  whitelist: ['user'],
  // 排除臨時狀態，避免持久化
  transforms: [],
};

// 針對 user slice 的持久化配置
export const userPersistConfig = {
  key: 'user',
  // 使用localStorage作為儲存媒介
  storage,
  // 持久化所有狀態，包括 lineLogin（LOGIN 流程需要跨頁面保持狀態）
}; 