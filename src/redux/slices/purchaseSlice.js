import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ticketNumberArr: Array(6),
  selectedCharity: null,
  valid: true,
};

const purchaseSlice = createSlice({
  name: 'purchaseData',
  initialState,
  reducers: {
    setData: (state, action) => {
      state = Object.assign(state, action.payload);
      if (action.payload.ticketNumberArr)
        state.ticketNumberArr = [...action.payload.ticketNumberArr];
    },
    resetData: (state, action) => {
      state = Object.assign(state, initialState);
      state.ticketNumberArr = Array(6);
    },
  },
});

export const { setData, resetData } = purchaseSlice.actions;

export default purchaseSlice;
