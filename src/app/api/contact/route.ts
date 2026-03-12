import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validar campos básicos
        if (!body.nombre || !body.email || !body.mensaje) {
            return NextResponse.json(
                { error: 'Faltan campos obligatorios' },
                { status: 400 }
            );
        }

        const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;

        if (!webhookUrl) {
            console.error('N8N Webhook URL not configured');
            return NextResponse.json(
                { error: 'Error de configuración del servidor' },
                { status: 500 }
            );
        }

        // Reenviar a n8n desde el servidor (sin CORS)
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('N8N Error Response:', errorText);
            throw new Error(`N8N responded with ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        return NextResponse.json(data);

    } catch (error: any) {
        console.error('Error proxying to n8n:', error.message);
        return NextResponse.json(
            { error: error.message || 'Error al enviar el mensaje' },
            { status: 500 }
        );
    }
}
