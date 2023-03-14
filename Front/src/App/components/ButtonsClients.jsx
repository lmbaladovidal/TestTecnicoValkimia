import { Link } from 'react-router-dom';
import { BillsList } from './BillsList';
import { useState } from 'react';
import  Button from '@mui/material/Button'
import  Stack  from '@mui/system/Stack'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ReceiptIcon from '@mui/icons-material/Receipt';

export const ButtonsClients = ({idCliente}) => {
  const [open, setOpen] = useState(false)
  return (
    <Stack direction="row" spacing={2}>
        <Button variant="outlined"  onClick={() => setOpen(true)} startIcon={< ReceiptIcon/>}>
          Ver Facuturas
        </Button>
        <BillsList cliente={idCliente} open={open} setOpen={setOpen}/>
        <Button variant="outlined" startIcon={< EditIcon/>} >
            <Link to={`/clientUpdate/${idCliente}`}>Editar</Link> 
        </Button>
        <Button variant="contained" endIcon={< DeleteIcon/>}>
            Eliminar
        </Button>
  </Stack>
  )
}
