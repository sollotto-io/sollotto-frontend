import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IlotteryData } from "../../api/types/lotteryData";

/*eslint-disable @typescript-eslint/no-unused-vars */
const initialState: IlotteryData = {
  loading: true,
  lotteryData: [],
  refetch: null,
};
const lotterySlice = createSlice({
  name: "lotteryData",
  initialState,
  reducers: {
    setData: (
      state: IlotteryData,
      action: PayloadAction<Partial<IlotteryData>>
    ) => {
      state = Object.assign(state, action.payload);
    },
    resetData: (state: IlotteryData, _action: PayloadAction<null>) => {
      state = Object.assign(state, initialState);
    },
  },
});

export const { setData, resetData } = lotterySlice.actions;
export default lotterySlice;
