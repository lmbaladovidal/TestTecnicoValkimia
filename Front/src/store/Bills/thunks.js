import { billsApi } from "../../Api/BillsApi";
import { setFacturas, startLoadingfacturas } from "./BillsSlice";


export const getFacturas=(id)=>{
    return async(dispatch,getState)=>{
        dispatch(startLoadingfacturas());
        const {data} = await billsApi.get(`/list/${id}`)
        console.log(data.data);
        dispatch(setFacturas({facturas:data.data.facturas,amount:data.data.amount}))
    }
}

export const createFactura = (data)=>{
    return async(dispatch)=>{
        dispatch(startLoadingfacturas());
        await billsApi.post(`/create`)
        getClientes()
    }
}