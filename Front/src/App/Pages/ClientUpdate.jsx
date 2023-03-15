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
import { validations } from "../../helpers";

export const ClientUpdate = () => {


  const objErrors = {
    nombre: true,
    apellido: true,
    domicilio: true,
    email: true,
    password: true,
    vPassword: true
  }


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
  const [tituloAlert, setTituloAlert] = useState('')

  useEffect(() => {
    dispatch(getCliente(idCliente));
  }, []);

  useEffect(() => {
    if (clientes.length > 0 && clientes[0].id == idCliente) {
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


  const [errorName, setErrorName] = useState({ error: false, message: '' })
  const [errorApellido, setErrorApellido] = useState({ error: false, message: '' })
  const [errorDomicilio, setErrorDomicilio] = useState({ error: false, message: '' })
  const [errorEmail, setErrorEmail] = useState({ error: false, message: '' })
  const [errorPass, setErrorPass] = useState({ error: false, message: '' })
  const [errorVpass, setErrorVpass] = useState({ error: false, message: '' })
  const [errors, setErrors] = useState(objErrors)

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
  const onDomicilioChange = ({ target }) => {
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

  const onHabilitadoChange = ({ target }) => {
    setHabilitado(target.checked);
  };


  const onNombreBlur = ({ target }) => {
    if (!validations.validarTamaño(target.value, 2)) {
      setErrors({ ...errors, nombre: false })
      setErrorName({ error: true, message: 'El tamaño minimo es de 3 caracteres' })
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
    if (target.value.length == 0) {
      setErrors({ ...errors, password: true })
      setErrorPass({ error: false, message: '' })
      return
    }
    if (!validations.validarPassword(target.value)) {
      setErrors({ ...errors, password: false })
      setErrorPass({ error: true, message: 'El password debe contener al menos una mayuscula, una minuscula, un número y un simbolo' })
      return
    }
    setErrors({ ...errors, password: true })
    setErrorPass({ error: false, message: '' })
  }

  const onVPasswordChange = (event) => {
    setVPassword(event.target.value)
    if (event.target.value.length == 0) {
      setErrors({ ...errors, vPassword: true })
      setErrorVpass({ error: false, message: '' })
      return
    }
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
        setOpenAlert(true)
        return
      }
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
    setTituloAlert('Exito en la operacion')
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
              error={errorName.error}
              helperText={errorName.message}
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
              error={errorApellido.error}
              helperText={errorApellido.message}
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
              onChange={onDomicilioChange}
              onBlur={onDomicilioBlur}
              error={errorDomicilio.error}
              helperText={errorDomicilio.message}
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
              error={errorEmail.error}
              helperText={errorEmail.message}
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
              error={errorPass.error}
              helperText={errorPass.message}
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
              error={errorVpass.error}
              helperText={errorVpass.message}
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
                <Button type="submit" variant="contained" endIcon={<EditIcon />}>
                  Guardar Cambios
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </form>
      {openYesNo ? <ModalYesNo functionToDispatch={updateCliente} dataDispatch={cliente} titulo={titulo} open={openYesNo} setOpen={setOpenYesNo} setOpenAlert={setOpenAlert} /> : null}
      {openAlert ? <ModalAlert title={tituloAlert} open={openAlert} setOpen={setOpenAlert} /> : null}
    </MainLayout>
  );
};
