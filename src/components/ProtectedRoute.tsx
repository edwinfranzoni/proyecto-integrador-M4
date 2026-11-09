// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface Props {
    children: React.ReactNode;
}

export const ProtectedRoute: React.FC<Props> = ({ children }) => {
    const { user, loading } = useAuth();

    // Si Firebase todavía está verificando la sesión, mostramos una pantalla de espera
    if (loading) {
        return (
            <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
                <h3>Cargando sesión...</h3>
            </div>
        );
    }

    // Si no hay ningún usuario logueado, lo redirigimos al Login automáticamente
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Si hay usuario, lo dejamos pasar y ver el contenido protegido (las tareas)
    return <>{children}</>;
};
