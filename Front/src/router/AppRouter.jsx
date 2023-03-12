import { Routes, Route, Navigate } from 'react-router-dom'
import { RegisterPage } from '../App/Pages'
import { ClientPage } from '../App/Pages/ClientsPage'

export const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<ClientPage/>}/>
            <Route path='register' element={<RegisterPage/>} />
        </Routes>
    )
}