import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import { MainLayout } from "../Layout/MainLayout";
import { useForm } from "../../hooks";

export const CreateBill = () => {
  return (
    <MainLayout title="Crear Cuenta">
    <form onSubmit={onSubmit}>
      <Grid container>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <TextField
            label="Fecha"
            type="text"
            placeholder="John"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <TextField
            label="Detalle"
            type="text"
            placeholder="Doe"
            fullWidth
          />
        </Grid>
        <Grid Importe xs={12} sx={{ mt: 2 }}>
          <TextField
            label="Domicilio"
            type="text"
            placeholder="Calle 1 Nro 1"
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
  )
}
