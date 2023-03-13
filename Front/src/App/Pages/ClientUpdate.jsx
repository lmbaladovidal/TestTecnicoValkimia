import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MainLayout } from "../Layout/MainLayout";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { getCliente } from "../../store/Clients/thunks";
import { getCiudades } from "../../store/Cities/thunks";

export const ClientUpdate = () => {

  const { idCliente } = useParams();
  
  const { clientes,isLoading } = useSelector((state) => state.client);
  const {ciudades} = useSelector((state) => state.cities);
  const dispatch = useDispatch();
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [domicilio, setDomicilio] = useState('')
  const [email, setEmail] = useState('')
  const [ciudad, setCiudad] = useState('')
  const [habilitado, setHabilitado] = useState(false)
  const [options, setOptions] = useState([])
  

  useEffect(() => {
    dispatch(getCliente(idCliente));
    if(clientes.length>0){
        setNombre(clientes[0].nombre)
        setApellido(clientes[0].apellido)
        setDomicilio(clientes[0].domicilio)
        setEmail(clientes[0].email)
        setCiudad(clientes[0].ciudad)
        setHabilitado(clientes[0].habilitado)
    }
  }, []);

  useEffect(() => {
    dispatch(getCiudades());
    console.log("useEfect",options);
    if(ciudades.length>0){
      setOptions(ciudades)
      setCiudad(obtenerCiudad())
    }
  }, [ciudad])
  
  const obtenerCiudad=()=>{
    console.log("Encontre esto:",ciudades.filter(ciudad=>ciudad.id==ciudad)[0]);
  }
  
  const [value, setValue] = useState({label:'Alcalá de Guadaira',id:'53eddb7e-c78d-4b6a-a35d-c61b13994a3b'});
  const onSubmit = (event) => {
    event.preventDefault();
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
            //   onChange={onInputChange}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Apellido"
              type="text"
              placeholder="Doe"
              value={apellido}
            //   onChange={onInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Domicilio"
              type="text"
              placeholder="Calle 1 Nro 1"
              value={domicilio}
            //   onChange={onInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Autocomplete
              name={"city"}
              disablePortal
              id="combo-box-demo"
              options={options}
              onChange={(event, newValue) => {
                console.log(newValue);
                setValue(newValue);
              }}
              value={value}
              renderInput={(params) => <TextField {...params} label="Ciudad" />}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="Correo@google.com"
              value={email}
            //   onChange={onInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
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
            {/* <FormControlLabel control={<Checkbox />} label="Habilitado" /> */}
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
