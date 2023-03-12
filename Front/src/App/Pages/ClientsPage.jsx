import React from 'react'
import { Link } from 'react-router-dom'
import { ClientList } from '../components/ClientList'
import { MainLayout } from '../Layout/MainLayout'

export const ClientPage= () => {



  return (    
    <MainLayout>
        <Link  to={"/register"}><h4>Registrar Nuevo cliente</h4></Link>
        <ClientList/>
        <Link  to={"/register"}><h4>Registrar Nuevo cliente</h4></Link>
    </MainLayout>
  )
}
