import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page:0,
  clientes:[],
  amount:0,
  isLoading:false
};

export const ClientsSlice = createSlice({
  name: "Clients",
  initialState,
  reducers: {
    startLoadingClientes: (state) => {
      state.isLoading = true;
    },
    setClientes: (state, action) => {
      state.isLoading=false;
      state.page = action.payload.page
      state.amount = action.payload.amount
      state.clientes = action.payload.clientes
    },
  },
});

export const { startLoadingClientes,setClientes,setCliente } = ClientsSlice.actions;
