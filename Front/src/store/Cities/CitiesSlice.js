import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ciudades:[],
  amount:0,
  isLoadingCities:false
};

export const CitiesSlice = createSlice({
  name: "Cities",
  initialState,
  reducers: {
    startLoadingCiudades: (state) => {
      state.isLoadingCities = true;
    },
    setCiudades: (state, action) => {
      state.isLoadingCities = false;
      state.amount = action.payload.amount
      state.ciudades  = action.payload.ciudades.map( ciudad => { 
        return { label: ciudad.nombre , id : ciudad.id }; 
      });
    },
  },
});

export const { startLoadingCiudades,setCiudades } = CitiesSlice.actions;
