
import { MainLayout } from "../Layout/MainLayout";
import { useForm } from "../../hooks";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCiudades } from "../../store/Cities/thunks";
import { createCliente } from "../../store/Clients/thunks";
import { validations } from "../../helpers";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Autocomplete from "@mui/material/Autocomplete";
import { Stack } from "@mui/system";




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
      validations.validarTamaño(target.value)
      validations.validarTexto(target.value)
  }
  const onApellidoBlur = ({target})=>{
    validations.validarTamaño(target.value)
      validations.validarTexto(target.value)    
  }
  const onDomicilioBlur = ({target})=>{
    validations.validarTamaño(target.value)
      validations.validarTexto(target.value)
  }
  const onEmailBlur = ({target})=>{
      validations.validarEmail(target.value)
  }
  const onPasswordBlur = ({target})=>{
    validations.validarPassword(target.value)
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
            <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                justifyContent="center"
                mt={5}
              >
                <Button variant="outlined" startIcon={<ArrowBackIcon />}>
                  <Link to={`/`}>Volver</Link>
                </Button>
              <Button type='submit' variant="contained" endIcon={<PersonAddIcon/>}>
                Crear Cliente
              </Button>
            </Stack>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </MainLayout>
  );
};
