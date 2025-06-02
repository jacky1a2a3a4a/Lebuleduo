import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { persistConfig, userPersistConfig } from './persistConfig';
import userReducer from './slices/userSlice';

// 為 user reducer 應用持久化配置
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

// 組合所有 reducers
const rootReducer = combineReducers({
  user: persistedUserReducer,
});

// 配置 store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // 忽略 redux-persist 相關的 actions
        ignoredActions: [
          'persist/FLUSH',
          'persist/REHYDRATE',
          'persist/PAUSE',
          'persist/PERSIST',
          'persist/PURGE',
          'persist/REGISTER',
        ],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

// 建立 persistor
export const persistor = persistStore(store);

// 匯出類型
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
