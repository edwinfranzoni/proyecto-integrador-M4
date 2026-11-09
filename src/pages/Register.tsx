// src/pages/Register.tsx
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';

export const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (err: any) {
            setError('Error al registrar usuario. Intenta con otra contraseña.');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Crear Cuenta</h2>
                <p style={styles.subtitle}>Regístrate en el gestor de tareas de MateCode</p>

                {error && <p style={styles.error}>{error}</p>}

                <form onSubmit={handleRegister} style={styles.form}>
                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={styles.input}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.input}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Confirmar contraseña"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        style={styles.input}
                        required
                    />
                    <button type="submit" style={styles.buttonPrimary}>Registrarse</button>
                </form>

                <p style={styles.footer}>
                    ¿Ya tienes cuenta? <a href="/login" style={styles.link}>Inicia sesión</a>
                </p>
            </div>
        </div>
    );
};

// Reutilizamos la misma consistencia de diseño Mobile-First
const styles = {
    container: { display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f3f4f6', padding: '16px' },
    card: { backgroundColor: '#fff', padding: '32px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px', textAlign: 'center' as const },
    title: { fontSize: '24px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' },
    subtitle: { fontSize: '14px', color: '#6b7280', marginBottom: '24px' },
    error: { color: '#ef4444', backgroundColor: '#fee2e2', padding: '10px', borderRadius: '6px', fontSize: '14px', marginBottom: '16px' },
    form: { display: 'flex', flexDirection: 'column' as const, gap: '16px' },
    input: { padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '16px', width: '100%', boxSizing: 'border-box' as const },
    buttonPrimary: { padding: '12px', borderRadius: '8px', border: 'none', backgroundColor: '#10b981', color: '#fff', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' },
    footer: { marginTop: '24px', fontSize: '14px', color: '#4b5563' },
    link: { color: '#10b981', textDecoration: 'none', fontWeight: '600' }
};
