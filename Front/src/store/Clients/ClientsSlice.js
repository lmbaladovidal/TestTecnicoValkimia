import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page:0,
  clientes:[],
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
      state.clientes = action.payload.clientes
    },
  },
});

export const { startLoadingClientes,setClientes } = ClientsSlice.actions;
