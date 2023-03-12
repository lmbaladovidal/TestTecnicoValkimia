import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks";
import { MainLayout } from "../Layout/MainLayout";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { getCliente } from "../../store/Clients/thunks";

export const ClientUpdate = () => {
  const { idCliente } = useParams();
  
  const { clientes } = useSelector((state) => state.client);
  const dispatch = useDispatch();
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [domicilio, setDomicilio] = useState('')
  const [email, setEmail] = useState('')
  const [habilitado, setHabilitado] = useState(false)
  

  useEffect(() => {
    console.log("antes dispatch",clientes.length);
    console.log(idCliente);
    dispatch(getCliente(idCliente));
    console.log("despues dispatch",clientes.length);
    if(clientes.length>0){
        setNombre(clientes[0].nombre)
        setApellido(clientes[0].apellido)
        setDomicilio(clientes[0].domicilio)
        setEmail(clientes[0].email)
        setHabilitado(clientes[0].habilitado)
    }
  }, []);

  const options = [
    { label: "The Godfather", id: "weqwer" },
    { label: "Pulp Fiction", id: "fsdfasdfasd" },
  ];
  
  const [value, setValue] = React.useState(options[0]);
  const onSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <MainLayout>
      <h1>Editar Cliente</h1>
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Nombre"
              type="text"
              placeholder="John"
              fullWidth
              value={nombre}
            //   onChange={onInputChange}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Apellido"
              type="text"
              placeholder="Doe"
              value={apellido}
            //   onChange={onInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Domicilio"
              type="text"
              placeholder="Calle 1 Nro 1"
              value={domicilio}
            //   onChange={onInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Autocomplete
              name={"city"}
              disablePortal
              id="combo-box-demo"
              options={options}
              onChange={(event, newValue) => {
                console.log(newValue);
                setValue(newValue);
              }}
            //   value={value}
              renderInput={(params) => <TextField {...params} label="Ciudad" />}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="Correo@google.com"
              value={email}
            //   onChange={onInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Repetir Contraseña"
              type="password"
              placeholder="Repetir Contraseña"
              fullWidth
            />
          </Grid>
          <Grid>
            {/* <FormControlLabel control={<Checkbox />} label="Habilitado" /> */}
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth>
                Guardar Cambios
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </MainLayout>
  );
};
