import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MainLayout } from "../Layout/MainLayout";
import { getCliente, UpdateCliente } from "../../store/Clients/thunks";
import { getCiudades } from "../../store/Cities/thunks";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from '@mui/material/MenuItem';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export const ClientUpdate = () => {

  const { idCliente } = useParams();
  const { clientes,isLoading } = useSelector((state) => state.client);
  const {ciudades, isLoadingCities} = useSelector((state) => state.cities);
  const dispatch = useDispatch();
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [direccion, setDireccion] = useState('')
  const [email, setEmail] = useState('')
  const [ciudad, setCiudad] = useState('')
  const [habilitado, setHabilitado] = useState(false)
  const [password, setPassword] = useState('')
  

  useEffect(() => {
    dispatch(getCliente(idCliente));
  }, []);

  useEffect(() => {
    if(clientes.length>0&&(clientes[0].id == idCliente)){
      console.log(clientes[0]);
      setNombre(clientes[0].nombre)
      setApellido(clientes[0].apellido)
      setDireccion(clientes[0].domicilio)
      setEmail(clientes[0].email)
      setCiudad(clientes[0].idCiudad)
      setHabilitado(clientes[0].habilitado)
    }
  }, [isLoading])
  

  useEffect(() => {
    dispatch(getCiudades());
    if(ciudades.length>0){
      setCiudad(obtenerCiudad())
    }
  }, [])
  
  const obtenerCiudad=()=>{
    return ciudades.filter(ciudadItem=>{return ciudadItem.id==ciudad})[0];
  }

  const onNombreChange = ({target})=>{
    setNombre(target.value)
  }
  const onApellidoChange = ({target})=>{
    setApellido(target.value)
  }
  const onDireccionChange = ({target})=>{
    setDireccion(target.value)
  }
  const onEmailChange = ({target})=>{
    setEmail(target.value)
  }
  const handleChange = (event) => {
    console.log(event.target.value);
    setCiudad(event.target.value);
  };
  const onPasswordChange = ({target})=>{
    setPassword(target.value)
  }
  const onHabilitadoChange = ({target})=>{
    console.log(target);
    setHabilitado(target.checked)
  }
  
  
  const onSubmit = (event) => {
    event.preventDefault();
    const clientData = { 
        id:idCliente,
        nombre,
        apellido,
        direccion,
        idCiudad:ciudad,
        email,
        password:password==''?clientes[0].password:password,
        habilitado
    }
    console.log(clientData);
    dispatch(UpdateCliente(clientData))
  };
  return (
    <MainLayout>
      <h1>Editar Cliente</h1>
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Nombre"
              type="text"
              placeholder="John"
              fullWidth
              value={nombre}
              onChange={onNombreChange}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Apellido"
              type="text"
              placeholder="Doe"
              value={apellido}
              onChange={onApellidoChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Domicilio"
              type="text"
              placeholder="Calle 1 Nro 1"
              value={direccion}
              onChange={onDireccionChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
          <FormControl fullWidth sx={{textAlign:"left"}}>
            <InputLabel id="demo-simple-select-label">Ciudad</InputLabel>
            <Select value={ciudad} onChange={handleChange}>
                {ciudades&&ciudades.map((ciudad)=>(<MenuItem key={ciudad.id} value={ciudad.id}>{ciudad.label}</MenuItem>))}
              </Select>
          </FormControl>
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="Correo@google.com"
              value={email}
              onChange={onEmailChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={onPasswordChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Repetir Contraseña"
              type="password"
              placeholder="Repetir Contraseña"
              fullWidth
            />
          </Grid>
          <Grid>
            <FormControlLabel control={<Checkbox onClick={onHabilitadoChange} checked={habilitado}/>} label="Habilitado" />
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth>
                Guardar Cambios
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </MainLayout>
  );
};
