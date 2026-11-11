

import React, { useState } from 'react';
import { Task } from '../types';

interface TodoListProps {
    tasks: Task[];
    loading: boolean;
    onToggle: (id: string, currentStatus: boolean) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
    onEdit: (id: string, title: string, description: string) => Promise<void>;
}

export const TodoList: React.FC<TodoListProps> = ({
    tasks,
    loading,
    onToggle,
    onDelete,
    onEdit
}) => {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');

    const startEditing = (task: Task) => {
        setEditingId(task.id!);
        setEditTitle(task.title);
        setEditDescription(task.description);
    };

    const cancelEditing = () => {
        setEditingId(null);
        setEditTitle('');
        setEditDescription('');
    };

    const saveEditing = async (id: string) => {
        if (!editTitle.trim()) {
            alert('El título no puede estar vacío.');
            return;
        }

        await onEdit(id, editTitle.trim(), editDescription.trim());
        cancelEditing();
    };

    if (loading) return <p>Cargando tareas...</p>;

    if (tasks.length === 0) {
        return <p>No tienes tareas pendientes.</p>;
    }

    return (
        <div>
            {tasks.map((task) => (
                <div
                    key={task.id}
                    style={{
                        padding: '12px',
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        margin: '8px 0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '12px'
                    }}
                >
                    <div style={{ flex: 1 }}>
                        {editingId === task.id ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <input
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                    placeholder="Título"
                                />
                                <textarea
                                    value={editDescription}
                                    onChange={(e) => setEditDescription(e.target.value)}
                                    placeholder="Descripción"
                                />
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button onClick={() => saveEditing(task.id!)}>
                                        Guardar
                                    </button>
                                    <button onClick={cancelEditing}>
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <h5 style={{
                                    margin: '0 0 5px',
                                    textDecoration: task.completed ? 'line-through' : 'none',
                                    color: task.completed ? '#888' : '#222'
                                }}>
                                    {task.title}
                                </h5>

                                {task.description && <p>{task.description}</p>}
                            </>
                        )}
                    </div>

                    {editingId !== task.id && (
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            <button onClick={() => startEditing(task)}>
                                Editar
                            </button>

                            <button onClick={() => onToggle(task.id!, task.completed)}>
                                {task.completed ? 'Deshacer' : 'Completar'}
                            </button>

                            <button
                                onClick={() => onDelete(task.id!)}
                                style={{
                                    backgroundColor: '#ef4444',
                                    color: 'white',
                                    border: 'none',
                                    padding: '6px 10px',
                                    borderRadius: '5px',
                                    cursor: 'pointer'
                                }}
                            >
                                Eliminar
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};
