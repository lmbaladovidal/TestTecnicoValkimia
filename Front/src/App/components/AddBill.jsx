import React from 'react'

export const AddBill = () => {
  return (
    <form onSubmit={onSubmit}>
    <Grid container>
      <Grid item xs={12} sx={{ mt: 2 }}>
        <TextField
          label="Fecha"
          name="fecha"
          value={fecha}
          onChange={onInputChange}
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
          label="importe"
          type="text"
          placeholder="Calle 1 Nro 1"
          fullWidth
        />
      </Grid>
    </Grid>
  </form>
  )
}
