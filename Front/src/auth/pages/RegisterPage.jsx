import { Link as RouterLink } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import React from "react";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";
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


  return (
    <AuthLayout title="Crear Cuenta">
      <form>
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
              <Button variant="contained" fullWidth>
                Crear Cuenta
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid container direction="row" justifyContent="end">
          <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
          <Link component={RouterLink} color="inherit" to="/auth/login">
            Ingresar
          </Link>
        </Grid>
      </form>
    </AuthLayout>
  );
};
