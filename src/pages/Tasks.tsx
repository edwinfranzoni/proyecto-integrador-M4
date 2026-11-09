// src/pages/Tasks.tsx
import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';
import { useTasks } from '../hooks/useTasks';
import { TodoForm } from '../components/TodoForm';
import { TodoList } from '../components/TodoList';

export const Tasks: React.FC = () => {
    const { user } = useAuth();
    // Conectamos el hook real pasándole el ID del usuario actual
    const { tasks, loading, createTask, toggleTask, deleteTask } = useTasks(user?.uid);

    const handleLogout = () => {
        signOut(auth);
    };

    // Función para preparar el resumen de texto y enviarlo a la API serverless
    const handleSendEmail = async () => {
        if (tasks.length === 0) {
            alert('No tienes tareas para enviar en el resumen.');
            return;
        }

        const summaryText = tasks
            .map(t => `- ${t.title}: ${t.completed ? 'Completada' : 'Pendiente'}`)
            .join('\n');

        try {
            const response = await fetch('/api/send-summary', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: user?.email, tasksSummary: summaryText })
            });

            if (response.ok) {
                alert('¡Resumen enviado con éxito a tu correo!');
            } else {
                alert('Hubo un problema al enviar el correo.');
            }
        } catch (err) {
            console.error("Error al solicitar envío de email:", err);
            alert('Error de red al intentar enviar el correo.');
        }
    };

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <div>
                    <h2 style={styles.headerTitle}>Gestor de Tareas</h2>
                    <p style={styles.userEmail}>{user?.email}</p>
                </div>
                <button onClick={handleLogout} style={styles.buttonLogout}>Cerrar Sesión</button>
            </header>

            <main style={styles.main}>
                <div style={styles.actionContainer}>
                    <button onClick={handleSendEmail} style={styles.buttonEmail}>
                        📧 Enviar Resumen por Email (AWS SES)
                    </button>
                </div>

                {/* Formulario Modular */}
                <section style={styles.sectionForm}>
                    <h3 style={{ marginTop: 0, marginBottom: '12px', color: '#374151' }}>Nueva Tarea</h3>
                    <TodoForm onCreateTask={createTask} />
                </section>

                {/* Listado Modular Real-Time */}
                <section style={styles.listSection}>
                    <h3 style={{ marginTop: 0, marginBottom: '12px', color: '#374151' }}>Mis Pendientes</h3>
                    <TodoList
                        tasks={tasks}
                        loading={loading}
                        onToggle={toggleTask}
                        onDelete={deleteTask}
                    />
                </section>
            </main>
        </div>
    );
};

const styles = {
    container: { backgroundColor: '#f9fafb', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', backgroundColor: '#fff', borderBottom: '1px solid #e5e7eb' },
    headerTitle: { margin: 0, fontSize: '20px', color: '#111827', fontWeight: 'bold' },
    userEmail: { margin: '4px 0 0 0', fontSize: '13px', color: '#6b7280' },
    buttonLogout: { backgroundColor: '#ef4444', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '14px' },
    main: { padding: '16px', maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column' as const, gap: '20px' },
    actionContainer: { display: 'flex' },
    buttonEmail: { backgroundColor: '#4f46e5', color: '#fff', border: 'none', padding: '12px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', width: '100%', fontSize: '15px' },
    sectionForm: { backgroundColor: '#fff', padding: '20px', borderRadius: '10px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' },
    listSection: { display: 'flex', flexDirection: 'column' as const },
};
