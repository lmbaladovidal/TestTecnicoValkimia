import { Link } from 'react-router-dom';
import { BillsList } from './BillsList';
import { useState } from 'react';
import Button from '@mui/material/Button'
import Stack  from '@mui/system/Stack'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ReceiptIcon from '@mui/icons-material/Receipt';

export const ButtonsClients = ({cliente}) => {
  const [open, setOpen] = useState(false)
  console.log(cliente);
  return (
    <Stack direction="row" spacing={2}>
        <Button variant="outlined"  onClick={() => setOpen(true)} startIcon={< ReceiptIcon/>}>
          Ver Facuturas
        </Button>
        {open?<BillsList cliente={cliente} open={open} setOpen={setOpen}/>:null}
        <Button variant="outlined" startIcon={< EditIcon/>} >
            <Link to={`/clientUpdate/${cliente.id}`}>Editar</Link> 
        </Button>
        <Button variant="contained" endIcon={< DeleteIcon/>}>
            Eliminar
        </Button>
  </Stack>
  )
}
