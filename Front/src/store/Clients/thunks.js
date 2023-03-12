import { clientesApi } from "../../Api/ClientsApi";
import { setClientes,startLoadingClientes } from "./ClientsSlice"


export const getClientes=(page = 0)=>{
    return async(dispatch,getState)=>{
        dispatch(startLoadingClientes());
        const {data} = await clientesApi.get(`/clients/list/${page}`)
        dispatch(setClientes({clientes:data.result.data,page:data.result.page}))
    }
}

export const createCliente = (params)=>{
    return async(dispatch)=>{
        await dispatch(checkingCredentials())
    }
}

export const DeleteCliente = (params)=>{
    return async(dispatch)=>{
        await dispatch(checkingCredentials())
    }
}

export const UpdateClienteCliente = (params)=>{
    return async(dispatch)=>{
        await dispatch(checkingCredentials())
    }
}
