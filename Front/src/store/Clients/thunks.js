import { clientesApi } from "../../Api/ClientsApi";
import { setClientes,startLoadingClientes } from "./ClientsSlice"


export const getClientes=(page = 0)=>{
    return async(dispatch,getState)=>{
        dispatch(startLoadingClientes());
        const {data} = await clientesApi.get(`/clients/list/${page}`)
        dispatch(setClientes({clientes:data.result.clientes,page:data.result.page,amount:data.result.amount}))
    }
}

export const getCliente=(id)=>{
    return async(dispatch,getState)=>{
        dispatch(startLoadingClientes());
        const {data} = await clientesApi.get(`/clients/getClient/${id}`)
        dispatch(setClientes({clientes:[data.result.cliente]}))
    }
}

export const createCliente = (data)=>{
    return async(dispatch)=>{
        dispatch(startLoadingClientes());
        const {data} = await clientesApi.get(`/clients/create`)
        dispatch(setClientes({clientes:data.result.clientes,page:data.result.page,amount:data.result.amount}))
    }
}

export const DeleteCliente = (id)=>{
    return async(dispatch)=>{
        dispatch(startLoadingClientes());
        const {data} = await clientesApi.get(`/clients/delete/${id}`)
        dispatch(setClientes({clientes:data.result.clientes,page:data.result.page,amount:data.result.amount}))
    }
}

export const UpdateClienteCliente = (id)=>{
    return async(dispatch)=>{
        dispatch(startLoadingClientes());
        const {data} = await clientesApi.get(`/clients/put/${id}`)
        dispatch(setClientes({clientes:data.result.clientes,page:data.result.page,amount:data.result.amount}))
    }
}
