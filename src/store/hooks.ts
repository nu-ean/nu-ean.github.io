import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";
import { type AppDispatch, type RootState } from "./store";

// dispatch의 타입을 AppDispatch로 지정해주는 커스텀 훅 (편리함 + 타입 안정성을 위해)
export const useAppDispatch = () => useDispatch<AppDispatch>();
// selector의 타입을 RootState로 지정한 커스텀 훅 (편리함 + 타입 안정성을 위해)
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
