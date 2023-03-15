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
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import { validations } from "../../helpers/"
import { ListItemIcon, ListItemText, Stack } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon'
import { Divider, List, ListItem } from "@mui/joy";
import Inventory2Icon from '@mui/icons-material/Inventory2';
import { ModalAddBill } from "./ModalAddBill";
import { ModalAlert} from "./ModalAlert";


export const AddBill = () => {

  const initialState = {
    detalle: '',
    importe: 0
  }
  const error = [0, 0, 0]

  const { page, clientes, isLoading, amount } = useSelector((state) => state.client);
  const dispatch = useDispatch();
  const [cliente, setCliente] = useState('')
  const [open, setOpen] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const [fecha, setFecha] = useState('')
  const [detalleProductos, setDetalleProductos] = useState([])
  const [dataFactura, setDataFactura] = useState({})

  useEffect(() => {
    dispatch(getAllClientes());
  }, []);


  const [titulo, setTitulo] = useState('')
  const { detalle, importe, onInputChange,cleanInput } = useForm(initialState)

  const handleChange = (event) => {
    setCliente(event.target.value);
  };

  const handleFechaChange = ({c}) => {
    let fecha = ""
    fecha +=c.year+"-"
    fecha += c.month>9?c.month+"-":"0"+c.month+"-"
    fecha += c.day>9?c.day:"0"+c.day
    setFecha(fecha)
  };

const agregarDetalle = ({target})=>{
  if (event.keyCode === 13) {
      setDetalleProductos([...detalleProductos, target.value])
      cleanInput(event)
    }
}


const formatearTextoDetalle = ()=>{
  let auxDetalle = ""
  detalleProductos.map(element=>{auxDetalle += element+";"})
  return auxDetalle;
}

  const onFechaBlur = ({ target }) => {
    if (validations.validarFecha(fecha)) {
      error[0] = 1
      return true
    }
    error[0] = 0
    return false
  }

  const onImporteBlur = ({ target }) => {
    if (importe == 0) {
      error[2] = 0;
      return false
    } else if (!validations.validarNumero(importe)) {
      error[2] = 0
      return false
    }
    error[2] = 1
    return true
  }

const onSubmit=(e)=>{
  e.preventDefault();
  if (error.find(element => element == 0)){
      setTitulo('Error en los campos')
      setOpenAlert(true)
      return
  }
  setDataFactura({
    idCliente:cliente,
    fecha,
    importe,
    detalle:formatearTextoDetalle()
  })
  setTitulo('Factura grabada con éxito')
  setOpenAlert(true)
}

  return (
    <MainLayout>
      <form onSubmit={onSubmit}>
        <Grid container>
          <FormControl fullWidth sx={{textAlign:"left"}}>
            <InputLabel id="demo-simple-select-label">Cliente</InputLabel>
            <Select name={"cliente"} value={cliente} onChange={handleChange}>
                {clientes.map((cliente)=>(<MenuItem key={cliente.id} value={cliente.id}>{cliente.nombre+" "+cliente.apellido}</MenuItem>))}
              </Select>
          </FormControl>
          <Grid item xs={12} sx={{ mt: 2 }}>
          <LocalizationProvider dateAdapter={AdapterLuxon} >
            <DateTimePicker 
                //value={fecha}
                onChange={handleFechaChange}
                onBlur={onFechaBlur} label="Fecha de factura"
                item xs={12} sx={{ mt: 2, width:"100%" }}
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
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              name="importe"
              value={importe}
              onChange={onInputChange}
              onBlur={onImporteBlur}
              label="importe"
              type="text"
              placeholder="Calle 1 Nro 1"
              fullWidth
            />
          </Grid>
        </Grid>
        <nav aria-label="main clients">
          <List>
            {detalleProductos.length > 0 && detalleProductos.map((producto,i) => (
                <ListItem key={producto+i}>
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
        <Button variant="outlined" startIcon={< ArrowBackIcon/>} >
            <Link to={`/`}>Volver</Link> 
        </Button>
        <Button variant="contained" onClick={onSubmit} endIcon={< SaveAltIcon/>}>
          Cargar Factura           
        </Button>
        {open?<ModalAddBill dataFactura={dataFactura} open={open} setOpen={setOpen}/>:null}
        {opne?<ModalAlert titulo={titulo} open={openAlert} setOpen={setOpenAlert}/>:null}
      </Stack>
    </MainLayout>
  )
}
