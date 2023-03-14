import { Routes, Route, Navigate } from 'react-router-dom'
import { AddBill } from '../App/components/AddBill'
import { ClientsRegisterPage,ClientPage,ClientUpdate } from '../App/Pages'

export const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<ClientPage/>}/>
            <Route path='register' element={<ClientsRegisterPage/>} />
            <Route path='/clientUpdate/:idCliente' element={<ClientUpdate/>} />
            <Route path='/billing/:idCliente' element={<AddBill/>} />
        </Routes>
    )
}