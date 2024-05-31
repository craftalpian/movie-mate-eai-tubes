import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configReducer } from "./reducer/config.reducer";

export const makeStore = () => {
  return configureStore({
    reducer: {},
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
export const store = configureStore({
  reducer: configReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
