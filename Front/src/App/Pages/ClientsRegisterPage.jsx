import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import { MainLayout } from "../Layout/MainLayout";
import { useForm } from "../../hooks";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { getCiudades } from "../../store/Cities/thunks";
import { createCliente } from "../../store/Clients/thunks";
import { validations } from "../../helpers";




export const ClientsRegisterPage = () => {
  const initialState= {
    nombre: "",
    apellido: "",
    domicilio: "",
    correo:"",
    password:"",
    vContraseña:""
  }
  const dispatch = useDispatch();
  const {ciudades} = useSelector((state) => state.cities);
  const { nombre,apellido,domicilio,email,password,vPassword, onInputChange, formState } = useForm(initialState);
  const [ciudad, setCiudad] = useState('')

  useEffect(() => {
    dispatch(getCiudades());
  }, [])

  const handleChange = (event) => {
    console.log(event.target.value);
    setCiudad(event.target.value);
  };

  const onSubmit=(event)=>{
    event.preventDefault();
    const clientData = { 
      nombre,
      apellido,
      domicilio,
      idCiudad:ciudad,
      email,
      password,
      habilitado:true
    }
    //console.log(clientData);
    dispatch(createCliente(clientData))
  }
  const onNombreBlur = ({target})=>{
      validations.validarTamaño()
      validations.validarTexto()
  }
  const onApellidoBlur = ({target})=>{
    validations.validarTamaño()
      validations.validarTexto()    
  }
  const onDomicilioBlur = ({target})=>{
    validations.validarTamaño()
      validations.validarTexto()
  }
  const onEmailBlur = ({target})=>{
      validations.validarEmail()
  }
  const onPasswordBlur = ({target})=>{
    validations.validarPassword()
  }

  const onVPasswordChange=({target})=>{
    onInputChange({target})
    console.log("password==vpassword",password==vPassword)
  }

  return (
    <MainLayout title="Registrar Cliente">
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Nombre"
              name="nombre"
              value={nombre}
              onChange={onInputChange}
              onBlur={onNombreBlur}
              type="text"
              placeholder="John"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              name="apellido"
              value={apellido}
              onBlur={onApellidoBlur}
              onChange={onInputChange}
              label="Apellido"
              type="text"
              placeholder="Doe"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              name="domicilio"
              value={domicilio}
              onBlur={onDomicilioBlur}
              onChange={onInputChange}
              label="Dirección"
              type="text"
              placeholder="Calle 1 Nro 1"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
          <FormControl fullWidth sx={{textAlign:"left"}}>
            <InputLabel id="demo-simple-select-label">Ciudad</InputLabel>
            <Select name={"ciudad"} value={ciudad} onChange={handleChange}>
                {ciudades.map((ciudad)=>(<MenuItem key={ciudad.id} value={ciudad.id}>{ciudad.label}</MenuItem>))}
              </Select>
          </FormControl>
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
            name="email"
            value={email}
            onBlur={onEmailBlur}
            onChange={onInputChange}
              label="Correo"
              type="email"
              placeholder="Correo@google.com"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
            name="password"
            value={password}
            onBlur={onPasswordBlur}
            onChange={onInputChange}
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
            name="vPassword"
            value={vPassword}
            onChange={onVPasswordChange}
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
            />
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12}>
              <Button type='submit' variant="contained" fullWidth>
                Crear Cliente
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </MainLayout>
  );
};
