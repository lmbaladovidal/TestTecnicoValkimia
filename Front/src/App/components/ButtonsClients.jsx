import { Link } from 'react-router-dom';
import { BillsList } from './BillsList';
import { useState } from 'react';
import Button from '@mui/material/Button'
import Stack  from '@mui/system/Stack'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { ModalDelete } from './ModalDelete';

export const ButtonsClients = ({cliente}) => {
  const [openModalBills, setOpenModalBills] = useState(false)
  const [openModalDelete, setOpenModalDelete] = useState(false)
  return (
    <Stack direction="row" spacing={2}>
        <Button variant="outlined"  onClick={() => setOpenModalBills(true)} startIcon={< ReceiptIcon/>}>
          Ver Facuturas
        </Button>
        {openModalBills?<BillsList cliente={cliente} open={openModalBills} setOpen={setOpenModalBills}/>:null}
        <Button variant="outlined" startIcon={< EditIcon/>} >
            <Link to={`/clientUpdate/${cliente.id}`}>Editar</Link> 
        </Button>
        <Button variant="contained" onClick={() => setOpenModalDelete(true)} endIcon={< DeleteIcon/>}>
          Eliminar            
        </Button>
        {openModalDelete?<ModalDelete cliente={cliente} open={openModalDelete} setOpen={setOpenModalDelete}/>:null}
  </Stack>
  )
}
