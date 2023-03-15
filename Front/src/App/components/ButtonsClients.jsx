import { Link } from 'react-router-dom';
import { BillsList } from './BillsList';
import { useState } from 'react';
import Button from '@mui/material/Button'
import Stack from '@mui/system/Stack'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { ModalYesNo } from './Modals/ModalYesNo';
import { ModalAlert } from './Modals/ModalAlert';
import { deleteCliente } from '../../store/Clients/thunks';

export const ButtonsClients = ({ cliente }) => {
  const [openModalBills, setOpenModalBills] = useState(false)
  const [openModalAlert, setOpenModalAlert] = useState(false)
  const [openYesNo, setOpenYesNo] = useState(false)
  return (
    <Stack direction="row" spacing={2}>
      <Button variant="outlined" onClick={() => setOpenModalBills(true)} startIcon={< ReceiptIcon />}>
        Ver Facuturas
      </Button>
      {openModalBills ? <BillsList cliente={cliente} open={openModalBills} setOpen={setOpenModalBills} /> : null}
      <Button variant="outlined" startIcon={< EditIcon />} >
        <Link to={`/clientUpdate/${cliente.id}`}>Editar</Link>
      </Button>
      <Button variant="contained" onClick={() => setOpenYesNo(true)} endIcon={< DeleteIcon />}>
        Eliminar
      </Button>
      {openYesNo ? <ModalYesNo
        functionToDispatch={deleteCliente}
        dataDispatch={cliente.id}
        titulo={`¿Seguro que desea elminar a ${cliente.nombre} ${cliente.apellido}?`}
        open={openYesNo}
        setOpen={setOpenYesNo}
        setOpenAlert={setOpenModalAlert} /> : null
      }
      {openModalAlert ? <ModalAlert cliente={cliente} open={openModalAlert} setOpen={setOpenModalAlert} /> : null}
    </Stack>
  )
}
