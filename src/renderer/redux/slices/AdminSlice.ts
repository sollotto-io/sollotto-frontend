import { createSlice } from "@reduxjs/toolkit";
import { IAdminData } from "../../api/types/AdminData";
import { PayloadAction } from "@reduxjs/toolkit";

/*eslint-disable @typescript-eslint/no-non-null-assertion */
/*eslint-disable @typescript-eslint/no-unused-vars */

const initialState: IAdminData = {
  username: "",
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
