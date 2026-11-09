// src/components/TodoForm.tsx
import React, { useState } from 'react';

interface TodoFormProps {
    onCreateTask: (title: string, description: string) => Promise<void>;
}

export const TodoForm: React.FC<TodoFormProps> = ({ onCreateTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        try {
            setSubmitting(true);
            await onCreateTask(title, description);
            setTitle('');
            setDescription('');
        } catch (error) {
            console.error("Error al crear la tarea en el formulario:", error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <input
                type="text"
                placeholder="Título de la tarea"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={styles.input}
                disabled={submitting}
                required
            />
            <textarea
                placeholder="Descripción o notas adicionales..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ ...styles.input, height: '80px', resize: 'vertical' }}
                disabled={submitting}
            />
            <button type="submit" style={styles.button} disabled={submitting}>
                {submitting ? 'Guardando...' : 'Agregar Tarea'}
            </button>
        </form>
    );
};

const styles = {
    form: { display: 'flex', flexDirection: 'column' as const, gap: '12px' },
    input: { padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '15px', width: '100%', boxSizing: 'border-box' as const },
    button: { padding: '10px', borderRadius: '6px', border: 'none', backgroundColor: '#10b981', color: '#fff', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' }
};
