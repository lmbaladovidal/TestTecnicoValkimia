import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ClientList } from '../components/ClientList'
import { MainLayout } from '../Layout/MainLayout'
import Button from "@mui/material/Button";
import { styled } from '@mui/material/styles';
import  blue  from '@mui/material/colors/blue';
import { ClientLogOut } from '../components/ClientLogOut';
import { useSelector } from 'react-redux';


const ColorButton = styled(Button)(({ theme }) => ({
  '&:hover': {
    backgroundColor: blue[100],
  },
}));
export const ClientPage= () => {

  const {status}= useSelector((state) => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if(status!='logged') navigate('/auth/login')
  }, [status])


  return (    
    <MainLayout>
        <ClientList/>
        <Link  to={"/register"}><ColorButton variant="contain" sx={{mt:5, width:"55%"}} >Registrar Nuevo Cliente</ColorButton></Link>
        <Link  to={"/billing"}><ColorButton variant="contain" sx={{width:"55%"}} >Cargar Factura Cliente</ColorButton></Link>
        <ClientLogOut/> 
    </MainLayout>
  )
}
