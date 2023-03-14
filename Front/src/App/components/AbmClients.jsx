import  Button from '@mui/material/Button'
import  Stack  from '@mui/system/Stack'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';

export const AbmClientes = ({idCliente}) => {

  return (
    <Stack direction="row" spacing={2}>
        <Button variant="outlined" startIcon={< EditIcon/>} >
            <Link to={`/clientUpdate/${idCliente}`}>Editar</Link> 
        </Button>
        <Button variant="contained" endIcon={< DeleteIcon/>}>
            Eliminar
        </Button>
  </Stack>
  )
}
