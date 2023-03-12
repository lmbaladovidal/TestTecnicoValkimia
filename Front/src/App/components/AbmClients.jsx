import  Button from '@mui/material/Button'
import  Stack  from '@mui/system/Stack'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export const AbmClientes = ({key}) => {
  console.log(key)
  const click= (key)=>{
    console.log(key)
  }
  return (
    <Stack direction="row" spacing={2}>
        <Button variant="outlined" startIcon={< EditIcon/>}>
            Editar
        </Button>
        <Button variant="contained" endIcon={< DeleteIcon/>}>
            Eliminar
        </Button>
  </Stack>
  )
}
