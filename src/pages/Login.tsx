

import React, { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../services/firebase';

const styles = {
    container: { display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f3f4f6', padding: '16px' },
    card: { backgroundColor: '#fff', padding: '32px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px', textAlign: 'center' as const },
    title: { fontSize: '24px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' },
    subtitle: { fontSize: '14px', color: '#6b7280', marginBottom: '24px' },
    error: { color: '#ef4444', backgroundColor: '#fee2e2', padding: '10px', borderRadius: '6px', fontSize: '14px', marginBottom: '16px' },
    form: { display: 'flex', flexDirection: 'column' as const, gap: '16px' },
    input: { padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '16px', width: '100%', boxSizing: 'border-box' as const },
    buttonPrimary: { padding: '12px', borderRadius: '8px', border: 'none', backgroundColor: '#3b82f6', color: '#fff', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' },
    divider: { margin: '16px 0', color: '#9ca3af', fontSize: '14px' },
    buttonGoogle: { padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db', backgroundColor: '#fff', color: '#374151', fontSize: '16px', fontWeight: '600', width: '100%', cursor: 'pointer' },
    footer: { marginTop: '24px', fontSize: '14px', color: '#4b5563' },
    link: { color: '#3b82f6', textDecoration: 'none', fontWeight: '600' }
};

export const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            await signInWithEmailAndPassword(auth, email, password);
            window.location.href = '/tasks';
        } catch (err: any) {
            console.error('Error al iniciar sesión:', err);
            setError('Credenciales inválidas. Intenta de nuevo.');
        }
    };

    const handleGoogleLogin = async () => {
        setError('');

        try {
            await signInWithPopup(auth, googleProvider);
            window.location.href = '/tasks';
        } catch (err: any) {
            console.error('Error al iniciar sesión con Google:', err);
            setError('Error al iniciar sesión con Google.');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>MateCode Tasks</h2>
                <p style={styles.subtitle}>Inicia sesión para gestionar tus tareas</p>

                {error && <p style={styles.error}>{error}</p>}

                <form onSubmit={handleEmailLogin} style={styles.form}>
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
                    <button type="submit" style={styles.buttonPrimary}>
                        Ingresar
                    </button>
                </form>

                <div style={styles.divider}>o</div>

                <button onClick={handleGoogleLogin} style={styles.buttonGoogle}>
                    Continuar con Google
                </button>

                <p style={styles.footer}>
                    ¿No tienes cuenta? <a href="/register" style={styles.link}>Regístrate</a>
                </p>
            </div>
        </div>
    );
};
