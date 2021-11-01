import * as purchaseSlice from "./slices/purchaseSlice";
import * as globalSlice from "./slices/globalSlice";
import * as lotterySlice from "./slices/lotterySlice";
import * as adminSlice from "./slices/AdminSlice";
export const actions = {
  SET_PURCHASE_DATA: purchaseSlice.setData,
  RESET_PURCHASE_DATA: purchaseSlice.resetData,
  SET_GLOBAL_DATA: globalSlice.setData,
  RESET_GLOBAL_DATA: globalSlice.resetData,
  SET_LOTTERY_DATA: lotterySlice.setData,
  RESET_LOTTERY_DATA: lotterySlice.resetData,
  SET_ADMIN_DATA: adminSlice.setData,
  RESET_ADMIN_DATA: adminSlice.resetData,
};

export type ActionKeys = keyof typeof actions;
