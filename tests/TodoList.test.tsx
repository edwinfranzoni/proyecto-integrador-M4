
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TodoList } from '../src/components/TodoList';
import { Task } from '../src/types';

const mockTasks: Task[] = [
    {
        id: '1',
        title: 'Estudiar Vitest',
        description: 'Completar las pruebas del proyecto',
        completed: false
    },
    {
        id: '2',
        title: 'Revisar Firebase',
        description: 'Comprobar la conexión',
        completed: true
    }
];

describe('Componente TodoList', () => {

    it('Debe mostrar el mensaje de carga', () => {
        render(
            <TodoList
                tasks={[]}
                loading={true}
                onToggle={vi.fn()}
                onDelete={vi.fn()}
            />
        );

        expect(screen.getByText(/Cargando tareas/i)).toBeInTheDocument();
    });

    it('Debe mostrar un mensaje cuando no hay tareas', () => {
        render(
            <TodoList
                tasks={[]}
                loading={false}
                onToggle={vi.fn()}
                onDelete={vi.fn()}
            />
        );

        expect(screen.getByText(/No tienes tareas pendientes/i)).toBeInTheDocument();
    });

    it('Debe mostrar las tareas y permitir completarlas', async () => {
        const mockToggle = vi.fn().mockResolvedValue(undefined);

        render(
            <TodoList
                tasks={mockTasks}
                loading={false}
                onToggle={mockToggle}
                onDelete={vi.fn()}
            />
        );

        expect(screen.getByText('Estudiar Vitest')).toBeInTheDocument();
        expect(screen.getByText('Revisar Firebase')).toBeInTheDocument();

        fireEvent.click(screen.getByRole('button', { name: 'Completar' }));

        await waitFor(() => {
            expect(mockToggle).toHaveBeenCalledWith('1', false);
        });
    });

    it('Debe permitir eliminar una tarea', async () => {
        const mockDelete = vi.fn().mockResolvedValue(undefined);

        render(
            <TodoList
                tasks={mockTasks}
                loading={false}
                onToggle={vi.fn()}
                onDelete={mockDelete}
            />
        );

        fireEvent.click(screen.getAllByRole('button', { name: 'Eliminar' })[0]);

        await waitFor(() => {
            expect(mockDelete).toHaveBeenCalledWith('1');
        });
    });
});
