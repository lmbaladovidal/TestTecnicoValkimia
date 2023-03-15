
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
import { ModalAlert } from "../components/Modals/ModalAlert"
import { ModalYesNo } from "../components/Modals/ModalYesNo";




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
  const { nombre,apellido,domicilio,email,password,vPassword, onInputChange } = useForm(initialState);
  const [cliente, setCliente] = useState({})
  const [ciudad, setCiudad] = useState('')
  const [titulo, setTitulo] = useState('')
  const [openAlert, setOpenAlert] = useState(false)
  const [openYesNo, setOpenYesNo] = useState(false)

  let error = [0,0,0,0,0]

  useEffect(() => {
    dispatch(getCiudades());
  }, [])

  const handleChange = (event) => {
    console.log(event.target.value);
    setCiudad(event.target.value);
  };

  
  const onNombreBlur = ({target})=>{
    console.log(target);
    if (!validations.validarTamaño(target.value,2)){
      error[0] = 0;
      console.log("paso");
      target.prototype("error")
      target.helpertext="Nombre demasiado corto"
      return
    }
    if (!validations.validarTexto(target.value)){
      error[0] = 0;
      target.error = true 
      return
    }
    error[0]=1
  }
  const onApellidoBlur = ({target})=>{
    if (!validations.validarTamaño(target.value)){
      error[1] = 0;
      target.error = true
      return
    }
    if (!validations.validarTexto(target.value)){
      error[1] = 0;
      target.error = true
      return
    }
    error[1]=1    
  }
  const onDomicilioBlur = ({target})=>{
    if (!validations.validarTamaño(target.value)){
      error[2] = 0;
      target.error = true
      return
    }
    if (!validations.validarTexto(target.value)){
      error[2] = 0;
      target.error = true
      return
    }
    error[2]=1
  }
  const onEmailBlur = ({target})=>{
    if (!validations.validarEmail(target.value)){
      error[3] = 0;
      target.error = true
      return
    }
    error[3] = 1
  }
  const onPasswordBlur = ({target})=>{
    if (!validations.validarPassword(target.value)){
      error[4]=0;
      target.error = true
      return
    }
  }

  const onVPasswordChange=({target})=>{
    onInputChange({target})
    console.log(target.value);
    target.error = password==target.value
  }


  const onSubmit=(event)=>{
      event.preventDefault();
      if (error.find(element => element == 0)){
          setTitulo('Error en los campos')
          setOpenAlert(true)
          return
      }
      setCliente({ 
        nombre,
        apellido,
        domicilio,
        idCiudad:ciudad,
        email,
        password,
        habilitado:true
      })
      setOpenYesNo(true)
      setTitulo("¿Desea Registrar al cliente?")
    }

  return (
    <MainLayout title="Registrar Cliente">
        <h1>Registrar Cliente</h1>
        <Grid container>
        <form onSubmit={onSubmit}>
          <Grid container>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                required={true}
                label="Nombre"
                name="nombre"
                value={nombre}
                onChange={onInputChange}
                onBlur={onNombreBlur}
                type="text"
                placeholder="John"
                error={false}
                helpertext=""
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                required={true}
                name="apellido"
                value={apellido}
                onBlur={onApellidoBlur}
                onChange={onInputChange}
                label="Apellido"
                type="text"
                placeholder="Doe"
                error={false}
                helpertext=""
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                required={true}
                name="domicilio"
                value={domicilio}
                onBlur={onDomicilioBlur}
                onChange={onInputChange}
                label="Dirección"
                type="text"
                placeholder="Calle 1 Nro 1"
                error={false}
                helpertext=""
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
            <FormControl fullWidth sx={{textAlign:"left"}}>
              <InputLabel id="demo-simple-select-label">Ciudad</InputLabel>
              <Select name={"ciudad"} value={ciudad} onChange={handleChange} required={true} >
                  {ciudades.map((ciudad)=>(<MenuItem key={ciudad.id} value={ciudad.id}>{ciudad.label}</MenuItem>))}
                </Select>
            </FormControl>
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
              required={true}
              name="email"
              value={email}
              onBlur={onEmailBlur}
              onChange={onInputChange}
                label="Correo"
                type="email"
                placeholder="Correo@google.com"
                error={false}
                helpertext=""
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
              required={true}
              name="password"
              value={password}
              onBlur={onPasswordBlur}
              onChange={onInputChange}
                label="Contraseña"
                type="password"
                placeholder="Contraseña"
                error={false}
                helpertext=""
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                required={true}
                name="vPassword"
                value={vPassword}
                onChange={onVPasswordChange}
                label="Contraseña"
                type="password"
                placeholder="Contraseña"
                error={false}
                helpertext=""
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
        {openYesNo?<ModalYesNo functionToDispatch={createCliente} dataDispatch={cliente} titulo={titulo} open={openYesNo} setOpen={setOpenYesNo} setOpenAlert={setOpenAlert}/>:null}
        {openAlert?<ModalAlert open={openAlert} setOpen={setOpenAlert}/>:null}
      </Grid>
    </MainLayout>
  );
};
