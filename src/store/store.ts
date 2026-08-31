import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

import languageReducer from "./slices/language-slice";
import themeReducer from "./slices/theme-slice";
import toastReducer from "./slices/toast-slice";

const rootReducer = combineReducers({
  language: languageReducer,
  theme: themeReducer,
  toast: toastReducer,
});

const persistConfig = {
  key: "root", // 로컬 스토리지에 저장될 key
  storage, // 사용할 스토리지 (= localStorage)
  whitelist: ["language", "theme"], // 저장할 slice만 지정
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare({
      serializableCheck: false, // redux-persist 관련 경고 방지
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
