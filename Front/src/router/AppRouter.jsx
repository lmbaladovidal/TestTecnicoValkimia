import { Routes, Route, Navigate } from 'react-router-dom'
import { ClientsRegisterPage,ClientPage,ClientUpdate } from '../App/Pages'

export const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<ClientPage/>}/>
            <Route path='register' element={<ClientsRegisterPage/>} />
            <Route path='/clientUpdate/:idCliente' element={<ClientUpdate/>} />
        </Routes>
    )
}