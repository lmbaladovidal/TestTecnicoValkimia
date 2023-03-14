import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  facturas:[],
  amount:0,
  isLoadingBills:false
};

export const FacturasSlice = createSlice({
  name: "Facturas",
  initialState,
  reducers: {
    startLoadingfacturas: (state) => {
      state.isLoading = true;
    },
    setFacturas: (state, action) => {
      state.isLoadingBills = false;
      state.amount = action.payload.amount
      state.facturas  = action.payload.facturas
    },
  },
});

export const { startLoadingfacturas,setFacturas } = FacturasSlice.actions;
