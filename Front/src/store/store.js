import { configureStore } from "@reduxjs/toolkit";
import { ClientsSlice } from "./Clients/ClientsSlice";
import {CitiesSlice} from "./Cities/CitiesSlice"
import { FacturasSlice } from "./Bills/BillsSlice";

export default configureStore({
    reducer:{
        client:ClientsSlice.reducer,
        cities:CitiesSlice.reducer,
        facturas:FacturasSlice.reducer
    }
})