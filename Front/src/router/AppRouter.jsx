import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthRoutes } from '../auth/routes/AuthRoutes'

export const AppRouter = () => {
    return (
        <Routes>
            <Route path='auth/*' element={<AuthRoutes />} />
        </Routes>
    )
}