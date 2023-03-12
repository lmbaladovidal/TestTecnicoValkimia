import { Link as RouterLink } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import React from "react";
import { MainLayout } from "../Layout/MainLayout";
import { useForm } from "../../hooks";

//TODO: crear en el back un endpoint que traiga las ciudades
const options = [
  { label: "The Godfather", id: "weqwer" },
  { label: "Pulp Fiction", id: "fsdfasdfasd" },
];
export const RegisterPage = () => {

  const { city, onInputChange, formState } = useForm({
    email: "",
    password: "",
  });
  const [value, setValue] = React.useState(options[0]);

  const onSubmit=(event)=>{
    event.preventDefault();
    console.log("aca estoy",value.id)
  }

  return (
    <MainLayout title="Crear Cuenta">
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Nombre"
              type="text"
              placeholder="John"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Apellido"
              type="text"
              placeholder="Doe"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Domicilio"
              type="text"
              placeholder="Calle 1 Nro 1"
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
                setValue(newValue);
              }}
              value={value}
              renderInput={(params) => <TextField {...params} label="Movie" />}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="Correo@google.com"
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
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12}>
              <Button type='submit' variant="contained" fullWidth>
                Crear Cliente
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </MainLayout>
  );
};
