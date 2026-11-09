// src/types/index.ts

export interface Task {
    id?: string;          // El ID lo genera automáticamente Firestore
    title: string;        // Título de la tarea
    description: string;  // Descripción de lo que hay que hacer
    completed: boolean;   // Estado: completada o pendiente
    userId: string;       // ID del usuario dueño de la tarea (¡Para la seguridad!)
    createdAt: number;    // Fecha de creación en milisegundos

    // Opcionales para Crédito Extra (puedes usarlos o ignorarlos por ahora)
    dueDate?: string;     // Fecha de vencimiento (YYYY-MM-DD)
    priority?: 'baja' | 'media' | 'alta';
}

export interface UserSession {
    uid: string;
    email: string | null;
    displayName: string | null;
}
