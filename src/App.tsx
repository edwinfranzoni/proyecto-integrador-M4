// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Tasks } from './pages/Tasks';
import { ProtectedRoute } from './components/ProtectedRoute';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Rutas Públicas */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Ruta Privada Protegida */}
                <Route
                    path="/tasks"
                    element={
                        <ProtectedRoute>
                            <Tasks />
                        </ProtectedRoute>
                    }
                />

                {/* Redirección por defecto */}
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </BrowserRouter>
    );
}
