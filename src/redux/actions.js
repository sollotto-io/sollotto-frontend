import * as purchaseSlice from './slices/purchaseSlice';
import * as globalSlice from './slices/globalSlice';
export const actions = {
  SET_PURCHASE_DATA: purchaseSlice.setData,
  RESET_PURCHASE_DATA: purchaseSlice.resetData,
  SET_GLOBAL_DATA: globalSlice.setData,
  RESET_GLOBAL_DATA: globalSlice.resetData,
};
