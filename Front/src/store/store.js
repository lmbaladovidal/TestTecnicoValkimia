import { configureStore } from "@reduxjs/toolkit";
import { ClientsSlice } from "./Clients/ClientsSlice";

export default configureStore({
    reducer:{
        client:ClientsSlice.reducer
    }
})