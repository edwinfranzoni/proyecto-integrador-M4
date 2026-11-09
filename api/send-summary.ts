// api/send-summary.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

// Inicializamos el cliente de AWS SES utilizando las variables de entorno del servidor
const sesClient = new SESClient({
    region: process.env.AWS_REGION || 'us-east-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    },
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Regla de seguridad: Solo permitimos peticiones POST (envío de datos)
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método no permitido. Utiliza POST.' });
    }

    const { email, tasksSummary } = req.body;

    // Validación: Nos aseguramos de que el Frontend envíe toda la información necesaria
    if (!email || !tasksSummary) {
        return res.status(400).json({ error: 'Faltan parámetros obligatorios (email o tasksSummary).' });
    }

    // Estructura del correo electrónico requerida por AWS
    const params = {
        Destination: {
            ToAddresses: [email],
        },
        Message: {
            Body: {
                Text: {
                    Data: `Hola,\n\nEste es el resumen de tus tareas diarias:\n\n${tasksSummary}\n\nSaludos,\nEquipo de MateCode.`
                },
            },
            Subject: {
                Data: 'Resumen Estratégico de Tareas - MateCode'
            },
        },
        Source: process.env.AWS_SES_FROM_EMAIL || '', // Remitente verificado en tu cuenta de AWS
    };

    try {
        // Enviamos el correo electrónico a través del SDK de Amazon
        const command = new SendEmailCommand(params);
        await sesClient.send(command);

        return res.status(200).json({ success: true, message: 'Email enviado con éxito mediante AWS SES.' });
    } catch (error: any) {
        console.error('Error en AWS SES:', error);
        return res.status(500).json({ error: 'Error interno del servidor al enviar el correo.', details: error.message });
    }
}
