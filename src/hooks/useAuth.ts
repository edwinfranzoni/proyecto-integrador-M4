// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebase';

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // Escucha si el estado del usuario cambia (Login / Logout / Recargar página)
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false); // Deja de cargar una vez que Firebase responde
        });

        // Limpiamos la suscripción al desmontar el componente
        return () => unsubscribe();
    }, []);

    return { user, loading };
};
