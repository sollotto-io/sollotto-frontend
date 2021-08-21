import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Connection } from "@solana/web3.js";
import { IglobalData } from "../../api/types/globalData";
/*eslint-disable @typescript-eslint/no-non-null-assertion */
/*eslint-disable @typescript-eslint/no-unused-vars */
const initialState: IglobalData = {
  holdingWalletId: process.env.REACT_APP_HOLDING_WALLET_PK_STRING as string,
  charities: { refetch: null, charities: [] },
  selectedWallet: null,
  raffles: { refetch: null, raffles: [] },
  pools: { refetch: null, pools: [] },
  walletBalance: 0,
  walletConnectedFlag: false,
  connection: new Connection("https://api.devnet.solana.com"),
  user: null,
};

const globalSlice = createSlice({
  name: "globalData",
  initialState,
  reducers: {
    setData: (
      state: IglobalData,
      action: PayloadAction<Partial<IglobalData>>
    ) => {
      state = Object.assign(state, action.payload);
    },
    resetData: (state: IglobalData, _action: PayloadAction<null>) => {
      state = Object.assign(state, initialState);
      state.charities.charities = [];
    },
  },
});

export const { setData, resetData } = globalSlice.actions;
export default globalSlice;
