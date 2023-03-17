import { useDispatch, useSelector } from 'react-redux'
import {Link as RouterLink, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import { loginUser } from '../../../store/auth/thunks';
import { MainLayout } from '../../Layout/MainLayout';
import { useForm } from '../../../hooks';
import { useEffect, useState } from 'react';
import { Link } from '@mui/joy';

export const LoginPage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {email,displayName,errorMessage,status}= useSelector((state) => state.auth)
  const [showErr, setShowErr] = useState(false)
  const {emailInput,password,onInputChange,formState}= useForm({
    emailInput:'',
    password:''
  })

  useEffect(() => {
    setShowErr(false)
    if(errorMessage!=null){
      setShowErr(true)
      return
    }
    setShowErr(false)
  }, [errorMessage])

  useEffect(() => {
    console.log("paso por el useEffect");
    if(status != 'logged'){
      return
    }
    navigate('/')
  }, [status])

  const onSubmit = (event)=>{
    event.preventDefault();
    console.log(status);
    dispatch(loginUser(emailInput,password))
    }

  return (
    <MainLayout title='Login'>
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='Correo'
              type='emailInput'
              placeholder='Correo@google.com'
              fullWidth
              name='emailInput'
              value={emailInput}
              onChange={onInputChange}
              required={true}
               />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              required={true}
              label='Contraseña'
              type='password'
              placeholder='Contraseña'
              fullWidth 
              name='password'
              value={password}
              onChange={onInputChange}
              />
          </Grid>
          <Grid
            container
            spacing={2}
            sx={{ mb: 2, mt: 1 }}
          >
            <Grid item xs={12} md={12}>
              <Button type='submit'variant='contained' fullWidth>
                Login
              </Button>
            </Grid>
            <Grid item xs={12} md={12}>
            {showErr && <Typography sx={{mr:1}}>{errorMessage}</Typography>}
            </Grid>
          </Grid>
          <Grid container direction='row' justifyContent='end'>
          <Link component={RouterLink} color='inherit' to="/auth/register">
            Crear una cuenta
          </Link>
        </Grid>
        </Grid>
      </form>
    </MainLayout>


  )
}
