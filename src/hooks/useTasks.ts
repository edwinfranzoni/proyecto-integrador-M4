
import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { Task } from '../types';

export const useTasks = (userId: string | undefined) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId) {
            setTasks([]);
            setLoading(false);
            return;
        }

        const q = query(collection(db, 'tasks'), where('userId', '==', userId));

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

        return () => unsubscribe();
    }, [userId]);

    // Crear una tarea
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

    // Marcar como completada o deshacer
    const toggleTask = async (id: string, currentStatus: boolean) => {
        const taskRef = doc(db, 'tasks', id);
        await updateDoc(taskRef, { completed: !currentStatus });
    };

    // Editar título y descripción
    const editTask = async (id: string, title: string, description: string) => {
        const taskRef = doc(db, 'tasks', id);
        await updateDoc(taskRef, { title, description });
    };

    // Eliminar una tarea
    const deleteTask = async (id: string) => {
        const taskRef = doc(db, 'tasks', id);
        await deleteDoc(taskRef);
    };

    return { tasks, loading, createTask, toggleTask, editTask, deleteTask };
};
