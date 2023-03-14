import { validations } from "../../helpers/"
import { useForm } from "../../hooks"
import { MainLayout } from "../Layout/MainLayout"


export const AddBill = ({ idCliente }) => {

  const initialState = {
    fecha: '',
    detalle: '',
    importe: 0
  }
  const error = [0, 0, 0]
  const { fecha, detalle, importe } = useForm(initialState)

  const onFechaBlur = ({ target }) => {
    if (validations.validarFecha(fecha)) {
      error[0] = 1
      return
    }
    error[0] = 0
  }

  const onDetalleBlur = ({ target }) => {
    if (validations.validarTamaño(fecha, 3)) {
      error[1] = 1
      return
    }
    error[1] = 0
  }

  const onImporteBlur = ({ target }) => {
    if (importe == 0) {
      error[2] = 0;
      return
    } else if (!validations.validarNumero(importe)) {
      error[2] = 0
      return
    }
    error[2] = 1
  }

  return (
    <MainLayout>
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Fecha"
              name="fecha"
              value={fecha}
              onChange={onInputChange}
              onBlur={onFechaBlur}
              type="text"
              placeholder="John"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              name="detalle"
              value={detalle}
              onChange={onInputChange}
              onBlur={onDetalleBlur}
              label="Detalle"
              type="text"
              placeholder="Doe"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              name="importe"
              value={importe}
              onChange={onInputChange}
              onBlur={onImporteBlur}
              label="importe"
              type="text"
              placeholder="Calle 1 Nro 1"
              fullWidth
            />
          </Grid>
        </Grid>
      </form>
    </MainLayout>
  )
}
