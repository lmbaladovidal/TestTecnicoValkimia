import { billsApi } from "../../Api/BillsApi";
import { setFacturas, startLoadingfacturas } from "./BillsSlice";


export const getFacturas=(id)=>{
    return async(dispatch,getState)=>{
        dispatch(startLoadingfacturas());
        const {data} = await billsApi.get(`/list/${id}`)
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