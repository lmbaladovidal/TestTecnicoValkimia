import { clientesApi } from "../../Api/ClientsApi";
import { setClientes,startLoadingClientes } from "./ClientsSlice"


export const getClientes=(page = 0)=>{
    return async(dispatch,getState)=>{
        dispatch(startLoadingClientes());
        const {data} = await clientesApi.get(`/list/${page}`)
        dispatch(setClientes({clientes:data.result.clientes,page:data.result.page,amount:data.result.amount}))
    }
}

export const getCliente=(id)=>{
    return async(dispatch,getState)=>{
        dispatch(startLoadingClientes());
        const {data} = await clientesApi.get(`/getClient/${id}`)
        dispatch(setClientes({clientes:[data.result.cliente]}))
    }
}

export const createCliente = (data)=>{
    return async(dispatch)=>{
        dispatch(startLoadingClientes());
        await clientesApi.post(`/create`)
        getClientes()
    }
}

export const DeleteCliente = (id)=>{
    return async(dispatch)=>{
        dispatch(startLoadingClientes());
        const {data} = await clientesApi.delete(`/clients/delete/${id}`)
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
