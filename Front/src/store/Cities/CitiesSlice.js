import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ciudades:[],
  amount:0,
  isLoading:false
};

export const CitiesSlice = createSlice({
  name: "Cities",
  initialState,
  reducers: {
    startLoadingCiudades: (state) => {
      state.isLoading = true;
    },
    setCiudades: (state, action) => {
      state.isLoading = false;
      state.amount = action.payload.amount
      state.ciudades  = action.payload.ciudades.map( ciudad => { 
        return { label: ciudad.nombre , id : ciudad.id }; 
      });
    },
  },
});

export const { startLoadingCiudades,setCiudades } = CitiesSlice.actions;
