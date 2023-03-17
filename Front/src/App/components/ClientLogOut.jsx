import Button from '@mui/material/Button'
import React, { useState } from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import Grid from '@mui/material/Grid';
import { useDispatch } from 'react-redux'
import { setLogOut } from '../../store/auth/AuthSlice'
import { ModalAlert } from './Modals/ModalAlert'
import { ModalYesNo } from './Modals/ModalYesNo'

export const ClientLogOut = () => {

    const [openAlert, setOpenAlert] = useState(false)
    const [openYesNo, setOpenYesNo] = useState(false)
    
    const onClickCerrar = ()=>{
        setOpenYesNo(true)
    }

  return (
     <Grid>
        <Button variant="contained" endIcon={< LogoutIcon/>} onClick={onClickCerrar}>
            Cerrar Sesion
        </Button>
        {openYesNo ? <ModalYesNo functionToDispatch={setLogOut} titulo={'¿Desea Cerrar Sesion?'} open={openYesNo} setOpen={setOpenYesNo} setOpenAlert={setOpenAlert} /> : null}
        {openAlert ? <ModalAlert title={{titulo:'Sesion Finalizada',tipo:0}} open={openAlert} setOpen={setOpenAlert} goToHome={false} /> : null}
    </Grid>
    
  )
}
