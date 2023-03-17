import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthRoutes } from '../app/auth/routes/AuthRoutes'
import { AddBill } from '../App/components/AddBill'
import {ClientPage,ClientUpdate } from '../App/Pages'

export const AppRouter = () => {
    return (
        <Routes>
            <Route path='auth/*' element={<AuthRoutes />} />
            <Route path='/' element={<ClientPage/>}/>
            <Route path='/clientUpdate/:idCliente' element={<ClientUpdate/>} />
            <Route path='/billing' element={<AddBill/>} />
        </Routes>
    )
}