import { useForm } from "../../hooks"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MainLayout } from "../Layout/MainLayout"
import { getAllClientes } from "../../store/Clients/thunks";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import { validations } from "../../helpers/"
import { Link } from "react-router-dom";
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon'
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Divider, List, ListItem } from "@mui/joy";
import { ModalAlert } from "./Modals/ModalAlert";
import { ModalYesNo } from "./Modals/ModalYesNo";
import { createFactura } from "../../store/Bills/thunks";


export const AddBill = () => {

  const initialState = {
    detalle: '',
    importe: ''
  }
  const objErrors = {
    cliente: false,
    detalle: false,
    importe: false,
    fecha: false
  }

  const { page, clientes, isLoading, amount } = useSelector((state) => state.client);
  const dispatch = useDispatch();

  const { detalle, importe, onInputChange, cleanInput, onResetForm } = useForm(initialState)

  const [cliente, setCliente] = useState('')
  const [openAlert, setOpenAlert] = useState(false)
  const [tituloAlert, setTituloAlert] = useState('')
  const [fecha, setFecha] = useState('')
  const [detalleProductos, setDetalleProductos] = useState([])
  const [dataFactura, setDataFactura] = useState({})
  const [openYesNo, setOpenYesNo] = useState(false)
  const [titulo, setTitulo] = useState('')


  const [errorCliente, setErrorCliente] = useState({ error: false, message: '' })
  const [errorDetalle, setErrorDetalle] = useState({ error: false, message: '' })
  const [errorImporte, seterrorImporte] = useState({ error: false, message: '' })
  const [errorFecha, setErrorFecha] = useState({ error: false, message: '' })
  const [errors, setErrors] = useState(objErrors)


  useEffect(() => {
    dispatch(getAllClientes());
  }, []);


  const resetForm = () => {
    
    setDetalleProductos([])
    onResetForm()
  }


  const agregarDetalle = (event) => {
    if (!validations.validarTamaño(event.target.value, 2)) {
      event.target.error = true
      return
    }
    if (event.keyCode === 13) {
      setDetalleProductos([...detalleProductos, event.target.value])
      cleanInput(event)
    }
  }


  const formatearTextoDetalle = () => {
    let auxDetalle = ""
    detalleProductos.map(element => { auxDetalle += element + ";" })
    return auxDetalle;
  }


  const handleChange = (event) => {
    setCliente(event.target.value);
    setErrorCliente({ error: false, message: '' })
    setErrors({ ...errors, cliente: true })
  };

  const handleFechaChange = ({ c }) => {
    setErrorFecha({ error: false, message: "" })
    setErrors({ ...errors, fecha: true })
    let fechaAux = ""
    fechaAux += c.year + "-"
    fechaAux += c.month > 9 ? c.month + "-" : "0" + c.month + "-"
    fechaAux += c.day > 9 ? c.day : "0" + c.day
    setFecha(fechaAux)
    // if (!validations.validarFecha(fechaAux)) {
    //   setErrors({ ...errors, fecha: false })
    //   setErrorFecha({error:true,message:"Debe seleccionar una fecha valida"})
    //   return 
    // }
    setErrors({ ...errors, fecha: true })
    setErrorFecha({ error: false, message: "" })
  };



  const onDetalleBlur = (event) => {
    if (!validations.validarTamaño(event.target.value, 2) && event.target.value.length != 0) {
      setErrorDetalle({ error: true, message: "El detalle debe tener mas de dos caracteres" })
      setErrors({ ...errors, detalle: false })
      return
    }
    setErrorDetalle({ error: false, message: "" })
    setErrors({ ...errors, detalle: true })
    cleanInput(event)
  }


  const onImporteBlur = ({ target }) => {
    if (parseFloat(importe) <= 0) {
      seterrorImporte({ error: true, message: "el importe debe ser mayor a 0" })
      setErrors({ ...errors, importe: false })
      return
    } else if (!validations.validarNumero(importe)) {
      seterrorImporte({ error: true, message: "Solo se admiten valores numericos" })
      setErrors({ ...errors, importe: false })
      return
    }
    seterrorImporte({ error: false, message: "" })
    setErrors({ ...errors, importe: true })
  }


  const validarItemsEnDetalle = () => {
    if (detalleProductos.length == 0) {
      setErrors({ ...errors, importe: false })
      setErrorDetalle({ error: true, message: "debe haber al menos un item cargado" })
      return
    }
    setErrorDetalle({ error: false, message: "" })
    setErrors({ ...errors, detalle: true })
  }


  const validarCliente = () => {
    if (cliente == '') {
      setErrorCliente({ error: true, message: 'Debe seleccionar un cliente' })
      setErrors({ ...errors, cliente: false })
    }
  }


  const onSubmit = (e) => {
    e.preventDefault();
    validarItemsEnDetalle();
    validarCliente();
    const valores = Object.values(errors);
    for (let i = 0; i < valores.length; i++) {
      if (!valores[i]) {
        setTituloAlert('Error en los campos')
        setOpenAlert(true)
        return
      }
    };
    setDataFactura({
      idCliente: cliente,
      fecha,
      importe,
      detalle: formatearTextoDetalle()
    })
    setTitulo('¿Desea Grabar la factura?')
    setTituloAlert('Exito en la carga')
    setOpenYesNo(true)
  }

  return (
    <MainLayout>
      <form onSubmit={onSubmit}>
        <Grid container>
          <FormControl fullWidth sx={{ textAlign: "left" }}>
            <InputLabel id="demo-simple-select-label">Cliente</InputLabel>
            <Select name={"cliente"} value={cliente} onChange={handleChange} helperText={errorCliente.message} required={true} error={errorCliente.error}>
              {clientes && clientes.map((cliente) => (<MenuItem key={cliente.id} value={cliente.id}>{cliente.nombre + " " + cliente.apellido}</MenuItem>))}
            </Select>
          </FormControl>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <LocalizationProvider dateAdapter={AdapterLuxon} >
              <DateTimePicker
                required={true}
                onChange={handleFechaChange}
                label="Fecha de factura"
                item xs={12} sx={{ mt: 2, width: "100%" }
                }
                error={errorFecha.error}
                helperText={errorFecha.message}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              name="detalle"
              value={detalle}
              onChange={onInputChange}
              onBlur={onDetalleBlur}
              onKeyUp={agregarDetalle}
              label="Detalle"
              type="text"
              placeholder="Presione 'Enter' para agregar el producto"
              error={errorDetalle.error}
              helperText={errorDetalle.message}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              name="importe"
              value={importe}
              onChange={onInputChange}
              onBlur={onImporteBlur}
              label="Importe"
              type="text"
              placeholder="importe"
              error={errorImporte.error}
              helperText={errorImporte.message}
              required={true}
              fullWidth
            />
          </Grid>
        </Grid>
        <nav aria-label="main clients">
          <List>
            {detalleProductos.length > 0 && detalleProductos.map((producto, i) => (
              <ListItem key={producto + i}>
                <ListItemIcon>
                  <Inventory2Icon />
                </ListItemIcon>
                <ListItemText
                  primary={producto}
                />
              </ListItem>
            ))}
          </List>
          <Divider />
        </nav>
      </form>
      <Stack direction="row" spacing={2}
        alignItems='center'
        justifyContent='center'
        mt={5} >
        <Button variant="outlined" startIcon={< ArrowBackIcon />} >
          <Link to={`/`}>Volver</Link>
        </Button>
        <Button variant="contained" onClick={onSubmit} endIcon={< SaveAltIcon />}>
          Cargar Factura
        </Button>
        {openYesNo ? <ModalYesNo functionToDispatch={createFactura} dataDispatch={dataFactura} titulo={titulo} open={openYesNo} setOpen={setOpenYesNo} setOpenAlert={setOpenAlert} /> : null}
        {openAlert ? <ModalAlert title={tituloAlert} open={openAlert} setOpen={setOpenAlert} resetForm={resetForm} /> : null}
      </Stack>
    </MainLayout>
  )
}
