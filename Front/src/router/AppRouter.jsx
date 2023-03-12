import { Routes, Route, Navigate } from 'react-router-dom'
import { RegisterPage } from '../App/Pages'
import { ClientPage } from '../App/Pages/ClientsPage'
import { ClientUpdate } from '../App/Pages/ClientUpdate'

export const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<ClientPage/>}/>
            <Route path='register' element={<RegisterPage/>} />
            <Route path='/clientUpdate/:idCliente' element={<ClientUpdate/>} />
        </Routes>
    )
}