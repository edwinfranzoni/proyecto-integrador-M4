# MateCode Tasks – Gestor estratégico de tareas

Aplicación web para gestionar tareas personales, desarrollada con React, TypeScript, Firebase y AWS SES. Permite crear una cuenta, iniciar sesión, administrar tareas y enviar por correo electrónico un resumen de su estado.

## Demo

**Aplicación desplegada:**

[proyecto-integrador-4-2.vercel.app]

(https://proyecto-integrador-4-2.vercel.app/login)

**Repositorio:**
https://github.com/edwinfranzoni/proyecto-integrador-M4

## Tecnologías utilizadas

- React
- TypeScript
- Vite
- Firebase Authentication
- Cloud Firestore
- AWS Simple Email Service (SES)
- Vercel Functions
- Vitest
- React Testing Library
- Git y GitHub

## Funcionalidades

### Autenticación
- Registro con correo electrónico y contraseña.
- Inicio de sesión con correo electrónico y contraseña.
- Inicio de sesión con Google.
- Cierre de sesión.
- Persistencia y detección del estado de autenticación mediante Firebase.
- Rutas protegidas para usuarios autenticados.

### Gestión de tareas
- Crear tareas con título y descripción.
- Consultar tareas almacenadas en Firestore.
- Editar el título y la descripción de las tareas existentes.
- Actualizar el estado de una tarea entre pendiente y completada.
- Eliminar tareas.
- Actualización de la interfaz en tiempo real mediante `onSnapshot`.
- Asociación de cada tarea con el identificador de su usuario.
- Protección de los datos mediante reglas de seguridad de Firestore, garantizando que cada usuario solo pueda acceder a sus propias tareas.

### Envío de correo electrónico
La aplicación permite enviar un resumen de las tareas al correo electrónico del usuario autenticado.

El envío se realiza mediante una función serverless de Vercel que utiliza AWS SES. El mensaje incluye el título de cada tarea y su estado (pendiente o completada).

Las credenciales de AWS se administran mediante variables de entorno del servidor y no se incluyen en el código del frontend.

## Arquitectura del proyecto

```text
PROYECTO INTEGRADOR 4/
│
├── api/
│   └── send-summary.ts
│
├── src/
│   ├── components/
│   │   ├── ProtectedRoute.tsx
│   │   ├── TodoForm.tsx
│   │   └── TodoList.tsx
│   │
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   └── useTasks.ts
│   │
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   └── Tasks.tsx
│   │
│   ├── services/
│   │   └── firebase.ts
│   │
│   ├── types/
│   │   └── index.ts
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── tests/
│   ├── TodoForm.test.tsx
│   ├── TodoList.test.tsx
│   └── setup.ts
│
├── api/
├── .env.example
├── .gitignore
├── package.json
├── vitest.config.ts
└── README.md
```

### Decisiones de arquitectura

- Se utilizaron componentes independientes para el formulario y el listado de tareas.
- Se implementaron hooks personalizados para separar la autenticación y las operaciones de Firestore de la interfaz.
- Firebase Authentication administra las sesiones de usuario.
- Cloud Firestore almacena las tareas y permite escuchar cambios en tiempo real.
- La función `api/send-summary.ts` procesa las solicitudes de correo en el servidor.
- AWS SES se utiliza mediante el SDK oficial de Amazon.
- Vercel aloja la aplicación y ejecuta la función serverless.

## Modelo de datos

Cada tarea utiliza la siguiente estructura:

| Campo | Descripción |
|---|---|
| `id` | Identificador generado por Firestore |
| `title` | Título de la tarea |
| `description` | Descripción |
| `completed` | Estado de finalización |
| `userId` | Identificador del usuario propietario |
| `createdAt` | Fecha de creación en milisegundos |
| `dueDate` | Fecha de vencimiento opcional |
| `priority` | Prioridad opcional |

## Instalación y ejecución local

### 1. Clonar el repositorio

```bash
git clone https://github.com/edwinfranzoni/proyecto-integrador-4.git
cd proyecto-integrador-4
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crear un archivo `.env.local` tomando como referencia `.env.example`.

Configurar las siguientes variables de Firebase:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

Para ejecutar las funciones de correo localmente también se requieren las variables del servidor:

```env
AWS_REGION=us-east-2
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_SES_FROM_EMAIL=
```

Las credenciales reales deben mantenerse privadas. Nunca deben incluirse en el repositorio ni utilizarse variables con prefijo `VITE_` para secretos de AWS.

### 4. Iniciar el entorno de desarrollo

```bash
npm run dev
```

### 5. Ejecutar las pruebas

```bash
npm test
```

### 6. Generar la compilación

```bash
npm run build
```

## Variables de entorno en producción

En Vercel se deben configurar las variables de Firebase y las siguientes variables privadas para AWS SES:

- `AWS_REGION`
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_SES_FROM_EMAIL`

La región configurada para AWS SES es `us-east-2`.

El remitente debe ser una identidad verificada en AWS SES. Si la cuenta permanece en modo sandbox, el destinatario también debe estar verificado.

## Flujo de envío de correo

1. El usuario pulsa el botón **Enviar Resumen por Email**.
2. El frontend prepara una lista con los títulos y estados de las tareas.
3. Se envía una petición HTTP POST a `/api/send-summary`.
4. La función serverless utiliza AWS SES para enviar el mensaje.
5. El frontend informa si el envío fue exitoso o si ocurrió un error.

## Pruebas

Se utiliza Vitest junto con React Testing Library.

Actualmente se incluyen pruebas para:

**TodoForm**
- Verificación de la creación de tareas.
- Limpieza de los campos después del envío.

**TodoList**
- Visualización del estado de carga.
- Mensaje cuando no existen tareas.
- Visualización de tareas y cambio de estado.
- Ejecución de la función de eliminación.

Resultado de la última ejecución: **5 pruebas aprobadas en 2 archivos**.

## Uso de inteligencia artificial

Se utilizó ChatGPT como herramienta de apoyo durante el desarrollo del proyecto, principalmente para:

- Resolver dudas técnicas sobre React, TypeScript, Firebase y JavaScript.
- Comprender y depurar errores durante la configuración y el desarrollo de la aplicación.
- Apoyar la integración de AWS SES con funciones serverless de Vercel.
- Desarrollar y revisar pruebas utilizando Vitest y React Testing Library.
- Mejorar la documentación y organización del proyecto.

**Buenas prácticas aplicadas:**

- Revisar y comprender las sugerencias antes de incorporarlas al código.
- Probar los cambios mediante pruebas automatizadas y verificaciones funcionales.
- Consultar la documentación y verificar las configuraciones de los servicios utilizados.
- Evitar exponer credenciales y mantener las variables sensibles en el entorno del servidor.

La inteligencia artificial se utilizó como apoyo, no como sustituto del proceso de aprendizaje y toma de decisiones. Las implementaciones fueron revisadas y adaptadas según las necesidades del proyecto.
## Autor

Proyecto desarrollado por **Edwin Hernandez** como parte del bootcamp Henry.
