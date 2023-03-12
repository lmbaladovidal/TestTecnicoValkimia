import React from 'react'
import { Link } from 'react-router-dom'
import { ClientList } from '../components/ClientList'
import { MainLayout } from '../Layout/MainLayout'
import Button from "@mui/material/Button";
import { styled } from '@mui/material/styles';
import  blue  from '@mui/material/colors/blue';

const ColorButton = styled(Button)(({ theme }) => ({
  '&:hover': {
    backgroundColor: blue[100],
  },
}));
export const ClientPage= () => {



  return (    
    <MainLayout>
        <ClientList/>
        <Link  to={"/register"}><ColorButton variant="contain" sx={{mt:3, width:"55%"}} >Registrar Nuevo Cliente</ColorButton></Link>
    </MainLayout>
  )
}
