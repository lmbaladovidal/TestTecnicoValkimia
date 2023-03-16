import { clientesApi } from "../../Api/ClientsApi";
import { setClientes,startLoadingClientes } from "./ClientsSlice"


export const getClientes=(page = 0)=>{
    return async(dispatch,getState)=>{
        dispatch(startLoadingClientes());
        const {data} = await clientesApi.get(`/list/${page}`)
        dispatch(setClientes({clientes:data.result.clientes,page:data.result.page,amount:data.result.amount}))
    }
}

export const getAllClientes=()=>{
    return async(dispatch,getState)=>{
        dispatch(startLoadingClientes());
        const {data} = await clientesApi.get(`/list/all`)
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
        await clientesApi.post(`/create`,{
            nombre:data.nombre,
            apellido:data.apellido,
            domicilio:data.domicilio,
            email:data.email,
            idCiudad:data.idCiudad,
            password:data.password,
            habilitado:data.habilitado,
        })
        dispatch(getClientes())
    }
}

export const deleteCliente = (id)=>{
    return async(dispatch)=>{
        const {data} = await clientesApi.delete(`/delete/${id}`)
        dispatch(getClientes())
        
    }
}

export const updateCliente = (data)=>{
    return async(dispatch)=>{
        await clientesApi.put(`/put/${data.id}`,{
            nombre:data.nombre,
            apellido:data.apellido,
            domicilio:data.direccion,
            email:data.email,
            idCiudad:data.idCiudad,
            password:data.password,
            habilitado:data.habilitado,
        }, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    }
}
