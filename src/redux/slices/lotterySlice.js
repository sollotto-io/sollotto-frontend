import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: true,
  lotteryData: [],
  refetch: null,
};
const lotterySlice = createSlice({
  name: 'lotteryData',
  initialState,
  reducers: {
    setData: (state, action) => {
      state = Object.assign(state, action.payload);
    },
    resetData: (state, action) => {
      state = Object.assign(state, initialState);
    },
  },
});

export const { setData, resetData } = lotterySlice.actions;
export default lotterySlice;
