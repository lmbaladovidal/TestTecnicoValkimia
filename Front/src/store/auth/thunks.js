
import { clientesApi } from "../../Api/ClientsApi"
import { checkingCredentials, noLogin, setLogin } from "./AuthSlice"

export const checkingAuthentication = (email,password)=>{
    return async(dispatch)=>{
        dispatch(checkingCredentials())
    }
}

export const loginUser = (email,password)=>{
    return async(dispatch,getState)=>{
        dispatch(checkingCredentials())
        const {data} = await clientesApi.post('/login/auth',{
            email:email,
            password:password,
        })
        if(data.result.status!=200)return dispatch(noLogin())
        dispatch(setLogin({email:data.result.cliente.email,displayName:data.result.cliente.nombre}))
    } 
}



