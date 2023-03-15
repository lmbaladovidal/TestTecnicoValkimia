import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MainLayout } from "../Layout/MainLayout";
import { getCliente, updateCliente } from "../../store/Clients/thunks";
import { getCiudades } from "../../store/Cities/thunks";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from '@mui/icons-material/Edit';
import { Stack } from "@mui/system";
import { ModalAlert } from "../components/Modals/ModalAlert"
import { ModalYesNo } from "../components/Modals/ModalYesNo";

export const ClientUpdate = () => {
  
  const { idCliente } = useParams();
  const { clientes, isLoading } = useSelector((state) => state.client);
  const { ciudades, isLoadingCities } = useSelector((state) => state.cities);
  const [cliente, setCliente] = useState({})
  const dispatch = useDispatch();
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [direccion, setDireccion] = useState("");
  const [email, setEmail] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [habilitado, setHabilitado] = useState(false);
  const [password, setPassword] = useState("");
  const [vPassword, setVPassword] = useState("");
  const [openAlert, setOpenAlert] = useState(false)
  const [openYesNo, setOpenYesNo] = useState(false)
  const [titulo, setTitulo] = useState('')

  useEffect(() => {
    dispatch(getCliente(idCliente));
  }, []);

  useEffect(() => {
    if (clientes.length > 0 && clientes[0].id == idCliente) {
      console.log(clientes[0]);
      setNombre(clientes[0].nombre);
      setApellido(clientes[0].apellido);
      setDireccion(clientes[0].domicilio);
      setEmail(clientes[0].email);
      setCiudad(clientes[0].idCiudad);
      setHabilitado(clientes[0].habilitado);
    }
  }, [isLoading]);

  useEffect(() => {
    dispatch(getCiudades());
    if (ciudades.length > 0) {
      setCiudad(obtenerCiudad());
    }
  }, []);

  let error = [0,0,0,0,0]

  const obtenerCiudad = () => {
    return ciudades.filter((ciudadItem) => {
      return ciudadItem.id == ciudad;
    })[0];
  };

  const onNombreChange = ({ target }) => {
    setNombre(target.value);
  };
  const onApellidoChange = ({ target }) => {
    setApellido(target.value);
  };
  const onDireccionChange = ({ target }) => {
    setDireccion(target.value);
  };
  const onEmailChange = ({ target }) => {
    setEmail(target.value);
  };
  const handleChange = (event) => {
    setCiudad(event.target.value);
  };
  const onPasswordChange = ({ target }) => {
    setPassword(target.value);
  };
  const onVPasswordChange=({target})=>{
    setVPassword(target.value)
    console.log(`${password}==${target.value}`,password==target.value)
  }
  const onHabilitadoChange = ({ target }) => {
    setHabilitado(target.checked);
  };


  const onNombreBlur = ({target})=>{
    if (!validations.validarTamaño(target.value)){
      error[0] = 0;
      return
    }
    if (!validations.validarTexto(target.value)){
      error[0] = 0;
      return
    }
    error[0]=1
  }

  const onApellidoBlur = ({target})=>{
    if (!validations.validarTamaño(target.value)){
      error[1] = 0;
      return
    }
    if (!validations.validarTexto(target.value)){
      error[1] = 0;
      return
    }
    error[1]=1   
  }

  const onDireccionBlur = ({target})=>{
    if (!validations.validarTamaño(target.value)){
      error[2] = 0;
      return
    }
    if (!validations.validarTexto(target.value)){
      error[2] = 0;
      return
    }
    error[2]=1
  }

  const onEmailBlur = ({target})=>{
    if (!validations.validarEmail(target.value)){
      error[3] = 0;
      return
    }
    error[3] = 1
  }

  const onPasswordBlur = ({target})=>{
    if (!validations.validarPassword(target.value)){
      error[4]=0;
      return
    }
  }


  const onSubmit = (event) => {
    event.preventDefault();
    if (error.find(element => element == 0)){
      setTitulo('Error en los campos')
      setOpenAlert(true)
      return
    }
    setCliente({
      id: idCliente,
      nombre,
      apellido,
      direccion,
      idCiudad: ciudad,
      email,
      password: password == "" ? clientes[0].password : password,
      habilitado,
    })
    dispatch(updateCliente(cliente));
    setTitulo('¿Desea editar al cliente?')
    setOpenYesNo(true)
  };

  return (
    <MainLayout>
      <h1>Editar Cliente</h1>
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              required={true}
              label="Nombre"
              type="text"
              placeholder="John"
              value={nombre}
              onChange={onNombreChange}
              onBlur={onNombreBlur}
              error={false}
              helperText=""
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              required={true}
              label="Apellido"
              type="text"
              placeholder="Doe"
              value={apellido}
              onChange={onApellidoChange}
              onBlur={onApellidoBlur}
              error={false}
              helperText=""
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              required={true}
              label="Domicilio"
              type="text"
              placeholder="Calle 1 Nro 1"
              value={direccion}
              onChange={onDireccionChange}
              onBlur={onDireccionBlur}
              error={false}
              helperText=""
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <FormControl fullWidth sx={{ textAlign: "left" }}>
              <InputLabel id="demo-simple-select-label">Ciudad</InputLabel>
              <Select value={ciudad} onChange={handleChange} error={false} helperText="Campo Obligatorio" required={true}>
                {ciudades &&
                  ciudades.map((ciudad) => (
                    <MenuItem key={ciudad.id} value={ciudad.id}>
                      {ciudad.label}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              required={true}
              label="Correo"
              type="email"
              placeholder="Correo@google.com"
              value={email}
              onChange={onEmailChange}
              onBlur={onEmailBlur}
              error={false}
              helperText=""
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
              onBlur={onPasswordBlur}
              error={false}
              helperText=""
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Repetir Contraseña"
              type="password"
              placeholder="Repetir Contraseña"
              value={vPassword}
              onChange={onVPasswordChange}
              error={false}
              helperText=""
              fullWidth
            />
          </Grid>
          <Grid>
            <FormControlLabel
              control={
                <Checkbox onClick={onHabilitadoChange} checked={habilitado} />
              }
              label="Habilitado"
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
                <Button type="submit" variant="contained" endIcon={<EditIcon/>}>
                  Guardar Cambios
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </form>
      {openYesNo?<ModalYesNo functionToDispatch={updateCliente} dataDispatch={cliente} titulo={titulo} open={openYesNo} setOpen={setOpenYesNo} setOpenAlert={setOpenAlert}/>:null}
      {openAlert?<ModalAlert open={openAlert} setOpen={setOpenAlert}/>:null}
    </MainLayout>
  );
};
