import { configureStore } from "@reduxjs/toolkit";
import filesReducer from "./slices/FilesSlice";
import settingsReducer from "./slices/settingsSlice";
import { useDispatch, useSelector } from "react-redux";

const store = configureStore({
  reducer: {
    files: filesReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;
