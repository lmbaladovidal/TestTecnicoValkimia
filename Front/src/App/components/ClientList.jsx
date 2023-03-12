import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClientes } from "../../store/Clients/thunks";
import { AbmClientes } from "./AbmClients";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";

export const ClientList = () => {
  const { page, clientes, isLoading } = useSelector((state) => state.client);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getClientes());
  }, []);

  const generarTexto= (cliente)=>{
    let textoItem
    textoItem = cliente.nombre.charAt(0).toUpperCase()+cliente.nombre.slice(1)+", "
    textoItem += cliente.apellido.charAt(0).toUpperCase()+cliente.apellido.slice(1)+" - "
    textoItem += cliente.email.charAt(0).toUpperCase()+cliente.email.slice(1)
    return textoItem
  }

  return (
    <>
      <h1>Lista de Clientes</h1>
      <span>Loading: {isLoading ? "True" : "False"}</span>
      <Box sx={{ width: "100%", maxWidth: 1080, bgcolor: "background.paper" }}>
        <Divider />
        <nav aria-label="main clients">
          <List>
            {clientes.map((cliente) => (
                <ListItem disablePadding key={cliente.id} >
                    <ListItemButton>
                        <ListItemIcon>
                        <AccountCircle />
                        </ListItemIcon>
                        <ListItemText primary={generarTexto(cliente)} />
                    </ListItemButton>
                    <AbmClientes key={cliente.id}/>
                </ListItem>
            ))}
          </List>
          <Divider />
        </nav>
      </Box>
    </>
  );
};
