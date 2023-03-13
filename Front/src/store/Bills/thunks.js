import { billsApi } from "../../Api/BillsApi";
import { setFacturas, startLoadingfacturas } from "./BillsSlice";


export const getCiudades=()=>{
    return async(dispatch,getState)=>{
        dispatch(startLoadingfacturas());
        const {data} = await billsApi.get('/list')
        dispatch(setFacturas({facturas:data.result.facturas,amount:data.result.amount}))
    }
}

export const createFactura = (data)=>{
    return async(dispatch)=>{
        dispatch(startLoadingfacturas());
        await billsApi.post(`/create`)
        getClientes()
    }
}