import { createSlice } from '@reduxjs/toolkit';
import { Connection } from '@solana/web3.js';
const initialState = {
  holdingWalletId: process.env.REACT_APP_HOLDING_WALLET_PK_STRING,
  Pools:[{
    id:1,
    Pool:"SOL",
    PrizePool:1000,
    TimeRemaining:"2021-07-15T12:17:32+05:30",
    PoolARP:"1.28",
    TotalDeposit:1200,
    TotalLiquidity:2400,
    Odds: "1 in 42"
  
  }],
  charities: {refetch:null,charities:[]},
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
