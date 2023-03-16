
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
import { Box } from "@mui/material";




export const ClientsRegisterPage = () => {
  const initialState = {
    nombre: "",
    apellido: "",
    domicilio: "",
    email: "",
    password: "",
    vPassword: ""
  }

  const objErrors = {
    nombre: false,
    apellido: false,
    domicilio: false,
    email: false,
    password: false,
    vPassword: false
  }

  const dispatch = useDispatch();
  const { ciudades } = useSelector((state) => state.cities);
  const { nombre, apellido, domicilio, email, password, vPassword, onInputChange, onResetForm } = useForm(initialState);
  const [cliente, setCliente] = useState({})
  const [ciudad, setCiudad] = useState('')
  const [titulo, setTitulo] = useState('')
  const [tituloAlert, setTituloAlert] = useState('')
  const [openAlert, setOpenAlert] = useState(false)
  const [openYesNo, setOpenYesNo] = useState(false)
  const [goToHome, setGoToHome] = useState(false)
  const [tipo, setTipo] = useState(0)

  const [errorName, setErrorName] = useState({ error: false, message: '' })
  const [errorApellido, setErrorApellido] = useState({ error: false, message: '' })
  const [errorDomicilio, setErrorDomicilio] = useState({ error: false, message: '' })
  const [errorEmail, setErrorEmail] = useState({ error: false, message: '' })
  const [errorPass, setErrorPass] = useState({ error: false, message: '' })
  const [errorVpass, setErrorVpass] = useState({ error: false, message: '' })
  const [errors, setErrors] = useState(objErrors)


  useEffect(() => {
    dispatch(getCiudades());
  }, [])

  const handleChange = (event) => {
    setCiudad(event.target.value);
  };


  const onNombreBlur = ({ target }) => {
    if (!validations.validarTamaño(target.value, 2)) {
      setErrors({ ...errors, nombre: false })
      setErrorName({ error: true, message: 'El tamaño minimo es de 3 caracteres' })
      target.helpertext = "Nombre demasiado corto"
      return
    }
    if (!validations.validarTexto(target.value)) {
      setErrors({ ...errors, nombre: false })
      setErrorName({ error: true, message: 'Solo se permiten caracteres alfabéticos' })
      return
    }
    setErrors({ ...errors, nombre: true })
    setErrorName({ error: false, message: '' })
  }
  const onApellidoBlur = ({ target }) => {
    if (!validations.validarTamaño(target.value, 2)) {
      setErrors({ ...errors, apellido: false })
      setErrorApellido({ error: true, message: 'El tamaño minimo es de 3 caracteres' })
      return
    }
    if (!validations.validarTexto(target.value)) {
      setErrors({ ...errors, apellido: false })
      setErrorApellido({ error: true, message: 'El tamaño minimo es de 3 caracteres' })
      return
    }
    setErrors({ ...errors, apellido: true })
    setErrorApellido({ error: false, message: '' })
  }
  const onDomicilioBlur = ({ target }) => {
    if (!validations.validarTamaño(target.value, 5)) {
      setErrors({ ...errors, domicilio: false })
      setErrorDomicilio({ error: true, message: 'El tamaño minimo es de 5 caracteres' })
      return
    }
    setErrors({ ...errors, domicilio: true })

    setErrorDomicilio({ error: false, message: '' })
  }

  const onEmailBlur = ({ target }) => {
    if (!validations.validarEmail(target.value)) {
      setErrors({ ...errors, email: false })
      setErrorEmail({ error: true, message: 'Formato del mail es invalido' })
      return
    }
    setErrors({ ...errors, email: true })
    setErrorEmail({ error: false, message: '' })
  }
  const onPasswordBlur = ({ target }) => {
    if (!validations.validarPassword(target.value)) {
      setErrors({ ...errors, password: false })
      setErrorPass({ error: true, message: 'El password debe contener al menos una mayuscula, una minuscula, un número y un simbolo' })
      return
    }
    setErrors({ ...errors, password: true })
    setErrorPass({ error: false, message: '' })
  }

  const onVPasswordChange = (event) => {
    onInputChange(event)
    if (password != event.target.value) {
      setErrors({ ...errors, vPassword: false })
      setErrorVpass({ error: true, message: 'las contraseñas no coinciden' })
      return
    }
    setErrors({ ...errors, vPassword: true })
    setErrorVpass({ error: false, message: '' })
  }


  const onSubmit = (event) => {
    event.preventDefault();
    const valores = Object.values(errors);
    for (let i = 0; i < valores.length; i++) {
      if (!valores[i]) {
        setTituloAlert('Error en los campos')
        setTipo(0)
        setGoToHome(false)
        setOpenAlert(true)
        return
      }
    }

    setCliente({
      nombre,
      apellido,
      domicilio,
      idCiudad: ciudad,
      email,
      password,
      habilitado: true
    })
    setOpenYesNo(true)
    setTipo(1)
    setTituloAlert('Exito en la operacion')
    setGoToHome(true)
    setTitulo("¿Desea Registrar al cliente?")
  }

  return (
    <MainLayout title="Registrar Cliente">
      <Box sx={{ width: "100%", maxWidth: 760, bgcolor: "background.paper" }}>
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
                  helperText={errorName.message}
                  error={errorName.error}
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
                  helperText={errorApellido.message}
                  error={errorApellido.error}
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
                  error={errorDomicilio.error}
                  helperText={errorDomicilio.message}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sx={{ mt: 2 }}>
                <FormControl fullWidth sx={{ textAlign: "left" }}>
                  <InputLabel id="demo-simple-select-label">Ciudad</InputLabel>
                  <Select name={"ciudad"} value={ciudad} onChange={handleChange} required={true} >
                    {ciudades.map((ciudad) => (<MenuItem key={ciudad.id} value={ciudad.id}>{ciudad.label}</MenuItem>))}
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
                  error={errorEmail.error}
                  helperText={errorEmail.message}
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
                  error={errorPass.error}
                  helperText={errorPass.message}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sx={{ mt: 2 }}>
                <TextField
                  required={true}
                  name="vPassword"
                  value={vPassword}
                  onChange={onVPasswordChange}
                  label="Repita la contraseña"
                  type="password"
                  placeholder="Contraseña"
                  error={errorVpass.error}
                  helperText={errorVpass.message}
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
                    <Button type='submit' variant="contained" endIcon={<PersonAddIcon />}>
                      Crear Cliente
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </form>
          {openYesNo ? <ModalYesNo functionToDispatch={createCliente} dataDispatch={cliente} titulo={titulo} open={openYesNo} setOpen={setOpenYesNo} setOpenAlert={setOpenAlert} /> : null}
          {openAlert ? <ModalAlert title={{titulo:tituloAlert,tipo}} open={openAlert} setOpen={setOpenAlert} goToHome={goToHome} /> : null}
        </Grid>
      </Box>
    </MainLayout>
  );
};
