import  Button from '@mui/material/Button'
import  Stack  from '@mui/system/Stack'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';

export const AbmClientes = ({idCliente}) => {
  const onCLickEdit= ()=>{
    console.log("Edit",idCliente)
  }
  const onCLickDelete= ()=>{
    console.log("Delete",idCliente)
  }
  return (
    <Stack direction="row" spacing={2}>
        <Button variant="outlined" startIcon={< EditIcon/>} onClick={onCLickEdit}>
            <Link to={`/clientUpdate/${idCliente}`}>Editar</Link> 
        </Button>
        <Button variant="contained" endIcon={< DeleteIcon/>} onClick={onCLickDelete}>
            Eliminar
        </Button>
  </Stack>
  )
}
