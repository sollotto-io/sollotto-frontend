import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IpurchaseData } from "../../api/types/purchaseData";

/*eslint-disable @typescript-eslint/no-unused-vars */
const initialState: IpurchaseData = {
  ticketNumberArr: Array(6),
  selectedCharity: null,
  valid: true,
};

const purchaseSlice = createSlice({
  name: "purchaseData",
  initialState,
  reducers: {
    setData: (
      state: IpurchaseData,
      action: PayloadAction<Partial<IpurchaseData>>
    ) => {
      state = Object.assign(state, action.payload);
      if (action.payload.ticketNumberArr)
        state.ticketNumberArr = [...action.payload.ticketNumberArr];
    },
    resetData: (state: IpurchaseData, _action: PayloadAction<null>) => {
      state = Object.assign(state, initialState);
      state.ticketNumberArr = Array(6);
    },
  },
});

export const { setData, resetData } = purchaseSlice.actions;

export default purchaseSlice;
