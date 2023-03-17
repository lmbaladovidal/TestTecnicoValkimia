import React from 'react'
import { Routes, Route,Navigate } from 'react-router-dom'
import { ClientsRegisterPage } from '../pages/ClientsRegisterPage'
import { LoginPage } from '../pages/LoginPage'
export const AuthRoutes = () => {
    return (
        <Routes>
            <Route path='login' element={<LoginPage />} />
            <Route path='register' element={<ClientsRegisterPage/>} />
            <Route path='/*' element={<Navigate to={'/auth/login'}/>} />
        </Routes>
    )
}
