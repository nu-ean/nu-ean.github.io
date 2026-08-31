import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState, AppDispatch } from "../store";

type ToastType = "info" | "success" | "error" | "warning";

type ToastState = {
  isOpen: boolean;
  message: string | null;
  type: ToastType;
};

const initialState: ToastState = {
  isOpen: false,
  message: null,
  type: "info",
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    open(state, action: PayloadAction<{ message: string; type?: ToastType }>) {
      state.isOpen = true;
      state.message = action.payload.message;
      state.type = action.payload.type ?? "info";
    },
    close(state) {
      state.isOpen = false;
      state.message = null;
      state.type = "info";
    },
  },
});

export const { open, close } = toastSlice.actions;
export default toastSlice.reducer;

// selector
export const selectToast = (state: RootState) => state.toast;

// thunk
let hideTimer: number | undefined;
export const showToast =
  (message: string, opts?: { type?: ToastType; duration?: number }) =>
  (dispatch: AppDispatch) => {
    if (hideTimer) window.clearTimeout(hideTimer);
    dispatch(open({ message, type: opts?.type }));
    hideTimer = window.setTimeout(
      () => dispatch(close()),
      opts?.duration ?? 1800
    );
  };
