'use client';

import React from 'react';
import Link from 'next/link';

export default function PoliticaPrivacidad() {
    return (
        <div style={{
            background: '#F5F0E8',
            minHeight: '100vh',
            color: '#1a1a2e',
            fontFamily: "'Geist Mono', 'IBM Plex Mono', monospace",
            padding: '80px 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <div style={{ maxWidth: '900px', width: '100%' }}>
                {/* Header Section */}
                <div style={{ marginBottom: '60px', textAlign: 'center' }}>
                    <Link href="/" style={{
                        color: '#D4A843',
                        fontSize: '10px',
                        letterSpacing: '0.2em',
                        textDecoration: 'none',
                        fontWeight: 700,
                        display: 'inline-block',
                        marginBottom: '20px'
                    }}>
                        ← VOLVER AL INICIO
                    </Link>
                    <h1 style={{
                        fontSize: 'clamp(32px, 5vw, 48px)',
                        fontWeight: 800,
                        letterSpacing: '-0.02em',
                        lineHeight: 1.1,
                        marginBottom: '20px'
                    }}>
                        Privacy <span style={{ color: '#D4A843' }}>Policy</span>
                    </h1>
                    <div style={{ width: '60px', height: '2px', background: '#D4A843', margin: '0 auto' }} />
                    <p style={{ marginTop: '24px', color: '#6b6155', fontSize: '14px', fontWeight: 600 }}>
                        4GS SOLUTIONS - TECH PROVIDER COMPLIANCE
                    </p>
                    <p style={{ color: '#8a7d6b', fontSize: '12px' }}>
                        Última actualización: 21 de febrero, 2026
                    </p>
                </div>

                {/* Content Section */}
                <div style={{
                    background: 'white',
                    padding: 'clamp(30px, 8vw, 60px)',
                    borderRadius: '24px',
                    border: '1px solid #e8e0d0',
                    lineHeight: 1.7,
                    fontSize: '15px',
                    color: '#333',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.03)'
                }}>
                    <section style={{ marginBottom: '40px' }}>
                        <h2 style={{ color: '#1a1a2e', fontSize: '20px', fontWeight: 800, marginBottom: '20px', borderLeft: '4px solid #D4A843', paddingLeft: '15px' }}>
                            1. IDENTIDAD DEL RESPONSABLE
                        </h2>
                        <p>
                            <strong>FOUR G SOLUTIONS</strong> (en adelante "4GS"), con domicilio en Barranquilla, Colombia, es el responsable del tratamiento de los datos personales recopilados a través de su sitio web y sus servicios de integración con plataformas de terceros.
                        </p>
                        <p style={{ marginTop: '10px' }}>
                            Correo electrónico de contacto para privacidad: <strong>contacto@fourgsolutions.com</strong>
                        </p>
                    </section>

                    <section style={{ marginBottom: '40px' }}>
                        <h2 style={{ color: '#1a1a2e', fontSize: '20px', fontWeight: 800, marginBottom: '20px', borderLeft: '4px solid #D4A843', paddingLeft: '15px' }}>
                            2. DATOS OBJETO DE TRATAMIENTO
                        </h2>
                        <p>
                            En el ejercicio de nuestras funciones como **Tech Provider** y desarrollador de soluciones de automatización, tratamos las siguientes categorías de datos:
                        </p>
                        <ul style={{ paddingLeft: '20px', marginTop: '15px' }}>
                            <li><strong>Datos de Identificación del Cliente:</strong> Nombre, empresa, dirección de correo electrónico y número de teléfono.</li>
                            <li><strong>Datos Técnicos y de Integración:</strong> Tokens de API, IDs de cuentas de Meta (WhatsApp Business Account IDs), y metadatos de comunicación necesarios para el funcionamiento de los chatbots.</li>
                            <li><strong>Datos de Conversación:</strong> Contenido de los mensajes procesados a través de las APIs integradas (únicamente con fines de procesamiento y automatización).</li>
                        </ul>
                    </section>

                    <section style={{ marginBottom: '40px' }}>
                        <h2 style={{ color: '#1a1a2e', fontSize: '20px', fontWeight: 800, marginBottom: '20px', borderLeft: '4px solid #D4A843', paddingLeft: '15px' }}>
                            3. FINALIDAD Y BASE LEGAL
                        </h2>
                        <p>
                            El tratamiento de datos se realiza bajo las siguientes bases legales y finalidades:
                        </p>
                        <ul style={{ paddingLeft: '20px', marginTop: '15px' }}>
                            <li><strong>Ejecución de Contrato:</strong> Para proveer servicios de desarrollo, despliegue y gestión de chatbots e integraciones con servicios de Meta (WhatsApp, Messenger).</li>
                            <li><strong>Consentimiento:</strong> Para responder a solicitudes de contacto y demostraciones comerciales.</li>
                            <li><strong>Cumplimiento Legal:</strong> Para satisfacer los requisitos de auditoría y seguridad exigidos por Meta Platforms, Inc. en nuestra calidad de proveedores tecnológicos.</li>
                        </ul>
                    </section>

                    <section style={{ marginBottom: '40px' }}>
                        <h2 style={{ color: '#1a1a2e', fontSize: '20px', fontWeight: 800, marginBottom: '20px', borderLeft: '4px solid #D4A843', paddingLeft: '15px' }}>
                            4. INTEGRACIÓN CON SERVICIOS DE META
                        </h2>
                        <p>
                            Como aspirante a **Tech Provider de Meta**, 4GS actúa como intermediario técnico. Al utilizar nuestras soluciones:
                        </p>
                        <ul style={{ paddingLeft: '20px', marginTop: '15px' }}>
                            <li>Usted reconoce que sus datos y los de sus clientes finales serán procesados de acuerdo con las Políticas de Datos de Meta (Facebook/WhatsApp).</li>
                            <li>4GS utiliza las APIs de Meta para gestionar múltiples cuentas bajo un modelo de servicios delegados, garantizando el aislamiento de datos entre diferentes clientes.</li>
                            <li>No almacenamos credenciales de acceso; utilizamos protocolos seguros de OAuth y Access Tokens proporcionados por Meta.</li>
                        </ul>
                    </section>

                    <section style={{ marginBottom: '40px' }}>
                        <h2 style={{ color: '#1a1a2e', fontSize: '20px', fontWeight: 800, marginBottom: '20px', borderLeft: '4px solid #D4A843', paddingLeft: '15px' }}>
                            5. TRANSFERENCIA Y SEGURIDAD
                        </h2>
                        <p>
                            Los datos pueden ser transferidos internacionalmente a los servidores de nuestros sub-procesadores tecnológicos (como AWS, n8n Cloud y Meta Platforms) para la correcta prestación del servicio. Implementamos cifrado de extremo a extremo (E2EE) y protocolos TLS en todas las transmisiones de datos.
                        </p>
                    </section>

                    <section style={{ marginBottom: '40px' }}>
                        <h2 style={{ color: '#1a1a2e', fontSize: '20px', fontWeight: 800, marginBottom: '20px', borderLeft: '4px solid #D4A843', paddingLeft: '15px' }}>
                            6. DERECHOS ARCO
                        </h2>
                        <p>
                            De acuerdo con las leyes de protección de datos (incluyendo la Ley 1581 de 2012 de Colombia y el GDPR en su caso), usted tiene derecho a **Acceder, Rectificar, Cancelar y Oponerse** al tratamiento de sus datos.
                        </p>
                        <p style={{ marginTop: '10px' }}>
                            Para ejercer estos derechos o solicitar la portabilidad de sus datos, diríjase a <strong>contacto@fourgsolutions.com</strong> adjuntando una prueba de identidad.
                        </p>
                    </section>

                    <section style={{ borderTop: '1px solid #eee', paddingTop: '30px', marginTop: '40px', color: '#777', fontSize: '13px' }}>
                        <p>
                            4GS SOLUTIONS se reserva el derecho de modificar esta política para adaptarla a novedades legislativas o requerimientos técnicos de Meta. El uso continuado de nuestros servicios implica la aceptación de estas condiciones.
                        </p>
                    </section>
                </div>

                <div style={{ marginTop: '60px', textAlign: 'center' }}>
                    <p style={{ color: '#8a7d6b', fontSize: '11px', letterSpacing: '0.1em' }}>
                        FOUR G SOLUTIONS &copy; 2026 | BARRANQUILLA, COLOMBIA
                    </p>
                </div>
            </div>
        </div>
    );
}
