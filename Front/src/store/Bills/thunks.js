import { billsApi } from "../../Api/BillsApi";
import { setFacturas, startLoadingfacturas } from "./BillsSlice";


export const getFacturas=(id)=>{
    return async(dispatch,getState)=>{
        dispatch(startLoadingfacturas());
        const {data} = await billsApi.get(`/list/${id}`)
        dispatch(setFacturas({facturas:data.data.facturas,amount:data.data.amount}))
    }
}

export const createFactura = (data)=>{
    return async(dispatch)=>{
        dispatch(startLoadingfacturas());
        await billsApi.post(`/create`,{
            idCliente:data.idCliente,
            fecha:data.fecha,
            detalle:data.detalle,
            importe:data.importe,
        })
    }
}