import { createSlice } from "@reduxjs/toolkit";
import { IAdminData } from "../../api/types/AdminData";
import { PayloadAction } from "@reduxjs/toolkit";

const initialState: IAdminData = {
  user: {
    username: "",
    id: "",
  },
  authenticated: false,
};

const adminSlice = createSlice({
  initialState,
  name: "adminData",
  reducers: {
    setData: (
      state: IAdminData,
      action: PayloadAction<Partial<IAdminData>>
    ) => {
      state = Object.assign(state, action.payload);
    },
    resetData: (state: IAdminData, _action: PayloadAction<null>) => {
      state = Object.assign(state, initialState);
    },
  },
});

export const { setData, resetData } = adminSlice.actions;
export default adminSlice;
