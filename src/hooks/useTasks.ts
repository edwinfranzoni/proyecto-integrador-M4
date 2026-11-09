// src/hooks/useTasks.ts
import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { Task } from '../types';

export const useTasks = (userId: string | undefined) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Si todavía no hay un usuario autenticado, no intentamos buscar tareas
        if (!userId) {
            setTasks([]);
            setLoading(false);
            return;
        }

        // Consulta filtrando estrictamente por el userId del empleado actual
        const q = query(collection(db, 'tasks'), where('userId', '==', userId));

        // Suscripción en tiempo real (onSnapshot) para actualizar la UI automáticamente
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const tasksData: Task[] = [];
            snapshot.forEach((docSnap) => {
                tasksData.push({ id: docSnap.id, ...docSnap.data() } as Task);
            });
            setTasks(tasksData);
            setLoading(false);
        }, (error) => {
            console.error("Error al escuchar cambios en Firestore: ", error);
            setLoading(false);
        });

        // Cancelamos la suscripción al desmontar para evitar fugas de memoria (memory leaks)
        return () => unsubscribe();
    }, [userId]);

    // Operación: Crear una nueva tarea
    const createTask = async (title: string, description: string) => {
        if (!userId) return;
        await addDoc(collection(db, 'tasks'), {
            title,
            description,
            completed: false,
            userId,
            createdAt: Date.now()
        });
    };

    // Operación: Marcar como completada o deshacer
    const toggleTask = async (id: string, currentStatus: boolean) => {
        const taskRef = doc(db, 'tasks', id);
        await updateDoc(taskRef, { completed: !currentStatus });
    };

    // Operación: Eliminar una tarea por completo
    const deleteTask = async (id: string) => {
        const taskRef = doc(db, 'tasks', id);
        await deleteDoc(taskRef);
    };

    return { tasks, loading, createTask, toggleTask, deleteTask };
};
