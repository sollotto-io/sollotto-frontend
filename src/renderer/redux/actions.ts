import * as purchaseSlice from "./slices/purchaseSlice";
import * as globalSlice from "./slices/globalSlice";
import * as lotterySlice from "./slices/lotterySlice";
export const actions = {
  SET_PURCHASE_DATA: purchaseSlice.setData,
  RESET_PURCHASE_DATA: purchaseSlice.resetData,
  SET_GLOBAL_DATA: globalSlice.setData,
  RESET_GLOBAL_DATA: globalSlice.resetData,
  SET_LOTTERY_DATA: lotterySlice.setData,
  RESET_LOTTERY_DATA: lotterySlice.resetData,
};

export type ActionKeys = keyof typeof actions;
