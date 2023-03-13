import { ciudadesApi } from "../../Api/CitiesApi";
import { setCiudades, startLoadingCiudades } from "./CitiesSlice";




export const getCiudades=()=>{
    return async(dispatch,getState)=>{
        dispatch(startLoadingCiudades());
        const {data} = await ciudadesApi.get('/list')
        dispatch(setCiudades({ciudades:data.result.ciudades,amount:data.result.amount}))
    }
}