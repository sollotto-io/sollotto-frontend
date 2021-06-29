import { createSlice } from '@reduxjs/toolkit';
import { Connection } from '@solana/web3.js';
const initialState = {
  holdingWalletId: process.env.REACT_APP_HOLDING_WALLET_PK_STRING,
  charities: [],
  selectedWallet: null,
  walletBalance: null,
  walletConnectedFlag: false,
  connection: new Connection('https://api.devnet.solana.com'),
};

const globalSlice = createSlice({
  name: 'globalData',
  initialState,
  reducers: {
    setData: (state, action) => {
      state = Object.assign(state, action.payload);
    },
    resetData: (state, action) => {
      state = Object.assign(state, initialState);
      state.charities = [];
    },
  },
});

export const { setData, resetData } = globalSlice.actions;
export default globalSlice;
