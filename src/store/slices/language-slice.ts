import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Language = "ko" | "en";

type LanguageState = {
  current: Language;
};

const initialState: LanguageState = {
  current: "ko",
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<Language>) {
      state.current = action.payload;
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
