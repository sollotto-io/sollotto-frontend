import { combineReducers } from "redux";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import purchaseSlice from "../slices/purchaseSlice";
import globalSlice from "../slices/globalSlice";
import lotterySlice from "../slices/lotterySlice";
import adminSlice from "../slices/AdminSlice";

const combinedReducer = combineReducers({
  purchaseData: purchaseSlice.reducer,
  globalData: globalSlice.reducer,
  lotteryData: lotterySlice.reducer,
  adminData: adminSlice.reducer,
});

type RootReducerType = typeof combinedReducer;

const rootReducer: RootReducerType = (state, action) =>
  combinedReducer(state, action);

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
export type AppState = ReturnType<typeof combinedReducer>;
export type AppStateKeys = keyof ReturnType<typeof combinedReducer>;
