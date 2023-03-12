import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClientes } from "../../store/Clients/thunks";
import { AbmClientes } from "./AbmClients";
import Box from "@mui/material/Box";
import Stack from '@mui/system/Stack'
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from '@mui/material/Typography'
import Divider from "@mui/material/Divider";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export const ClientList = () => {
  const { page, clientes, isLoading, amount } = useSelector((state) => state.client);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getClientes());
  }, []);

const prevPage = (e)=>{
  if(page!=0){
    dispatch(getClientes(parseInt(page)-1))
  }
}
const nextPage = (e)=>{
  const ultimaPagina = obtenerCantidadPaginas();
  if(parseInt(page)+1!=ultimaPagina){
    dispatch(getClientes(parseInt(page)+1))
  }
}

  const generarTexto= (cliente)=>{
    let textoItem
    textoItem = cliente.nombre.charAt(0).toUpperCase()+cliente.nombre.slice(1)+", "
    textoItem += cliente.apellido.charAt(0).toUpperCase()+cliente.apellido.slice(1)+" - "
    textoItem += cliente.email.charAt(0).toUpperCase()+cliente.email.slice(1)
    return textoItem
  }

  const obtenerCantidadPaginas = ()=>{
    return amount%10==0?amount/10:amount/10+1;
  }

  return (
    <>
      <h1>Lista de Clientes</h1>
      <span>Loading: {isLoading ? "True" : "False"}</span>
      <Box sx={{ width: "100%", maxWidth: 1080, bgcolor: "background.paper" }}>
        <Divider />
        <nav aria-label="main clients">
          <List>
            {clientes&&clientes.map((cliente) => (
                <ListItem disablePadding key={cliente.id} >
                    <ListItemButton>
                        <ListItemIcon>
                        <AccountCircle />
                        </ListItemIcon>
                        <ListItemText primary={generarTexto(cliente)} />
                    </ListItemButton>
                    <AbmClientes idCliente={cliente.id}/>
                </ListItem>
            ))}
          </List>
          <Divider />
        </nav>
        <Stack 
          direction="row" spacing={2} 
          alignItems='center'
          justifyContent='center'
          mt={5} 
        >
          <Button variant="contained" startIcon={< NavigateBeforeIcon/>} onClick={prevPage}>
            Anterior
          </Button>
          <Typography sx={{mr:1}}>{`Página ${parseInt(page)+1} de ${obtenerCantidadPaginas()}`}</Typography>
          <Button variant="contained" endIcon={< NavigateNextIcon/>} onClick={nextPage}>
            Seguiente
          </Button>
        </Stack>
      </Box>
    </>
  );
};
