import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import { MainLayout } from "../Layout/MainLayout";
import { useForm } from "../../hooks";
import { useEffect } from "react";
import { useSelector } from "react-redux";




export const RegisterPage = () => {

  const dispatch = useDispatch();
  const {ciudades} = useSelector((state) => state.cities);

  useEffect(() => {
    dispatch(getCiudades());
    console.log("useEfect",options);
    if(ciudades.length>0){
      setOptions(ciudades)
      setCiudad(obtenerCiudad())
    }
  }, [ciudad])


  const initialState= {
    nombre: "",
    apelldio: "",
    direccion: "",
    ciudad:"",
    correo:"",
    contraseña:"",
    vContraseña:""
  }

  const { nombre,apellido,direccion,ciudad,correo,contraseña,vContraseña, onInputChange, formState } = useForm(initialState);
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
              name="nombre"
              value={nombre}
              onInputChange={onInputChange}
              type="text"
              placeholder="John"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              name="apellido"
              value={apellido}
              onInputChange={onInputChange}
              label="Apellido"
              type="text"
              placeholder="Doe"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              name="direccion"
              value={direccion}
              onInputChange={onInputChange}
              label="Domicilio"
              type="text"
              placeholder="Calle 1 Nro 1"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Autocomplete
              name="ciudad"
              value={ciudad}
              onInputChange={onInputChange}
              disablePortal
              id="combo-box-demo"
              options={options}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} label="Movie" />}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
            name="email"
            value={email}
            onInputChange={onInputChange}
              label="Correo"
              type="email"
              placeholder="Correo@google.com"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
            name="contraseña"
            value={contraseña}
            onInputChange={onInputChange}
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
            name="vContraseña"
            value={vContraseña}
            onInputChange={onInputChange}
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
