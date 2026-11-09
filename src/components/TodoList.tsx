
import React from 'react';
import { Task } from '../types';

interface TodoListProps {
    tasks: Task[];
    loading: boolean;
    onToggle: (id: string, currentStatus: boolean) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
}

export const TodoList: React.FC<TodoListProps> = ({
    tasks,
    loading,
    onToggle,
    onDelete
}) => {
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
                    <div>
                        <h5 style={{
                            margin: '0 0 5px',
                            textDecoration: task.completed ? 'line-through' : 'none',
                            color: task.completed ? '#888' : '#222'
                        }}>
                            {task.title}
                        </h5>

                        {task.description && <p>{task.description}</p>}
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                            onClick={() => onToggle(task.id, task.completed)}
                        >
                            {task.completed ? 'Deshacer' : 'Completar'}
                        </button>

                        <button
                            onClick={() => onDelete(task.id)}
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
                </div>
            ))}
        </div>
    );
};

