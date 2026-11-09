// tests/TodoForm.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TodoForm } from '../src/components/TodoForm';

describe('Componente TodoForm (Pruebas Unitarias)', () => {
    it('Debe limpiar los campos y ejecutar la función onCreateTask de forma exitosa al enviar el formulario', async () => {
        // Creamos una función mock simulada que resuelve de forma asíncrona
        const mockCreateTask = vi.fn().mockResolvedValue(undefined);

        // Renderizamos el componente
        render(<TodoForm onCreateTask={mockCreateTask} />);

        // Buscamos los elementos en la pantalla virtual
        const inputTitle = screen.getByPlaceholderText(/Título de la tarea/i);
        const buttonSubmit = screen.getByRole('button', { name: /Agregar Tarea/i });

        // Envolvemos las interacciones físicas dentro de bloques de eventos de usuario
        fireEvent.change(inputTitle, { target: { value: 'Completar Hito de Testing' } });
        fireEvent.click(buttonSubmit);

        // Verificación 1: Esperamos a que la función del CRUD haya sido llamada con los parámetros correctos
        await waitFor(() => {
            expect(mockCreateTask).toHaveBeenCalledWith('Completar Hito de Testing', '');
        });

        // Verificación 2: Esperamos asíncronamente a que el componente cambie su estado y vacíe el input
        await waitFor(() => {
            expect((inputTitle as HTMLInputElement).value).toBe('');
        });
    });
});
