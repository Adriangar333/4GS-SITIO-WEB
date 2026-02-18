'use client';

import { useRef, useState, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import { Html } from '@react-three/drei';
import { setSelectedService } from './serviceStore';

const DEG = Math.PI / 180;

export interface ServiceDef {
    name: string;
    sub: string;
    color: string;
    symbol: string;
    angle: number;
    side: 'left' | 'right';
    desc: string;
    features: string[];
}

export const SERVICES: ServiceDef[] = [
    {
        name: 'WhatsApp', sub: 'Meta API', color: '#25D366', symbol: '\u{1F4AC}', angle: -75, side: 'left',
        desc: 'Chatbots inteligentes y flujos automatizados sobre la API oficial de WhatsApp Business.',
        features: ['Respuestas automáticas 24/7', 'Plantillas aprobadas por Meta', 'Integración con CRM y n8n'],
    },
    {
        name: 'n8n', sub: 'Automatización', color: '#FF6D00', symbol: '\u{26A1}', angle: -35, side: 'left',
        desc: 'Orquestación de procesos empresariales con flujos visuales y más de 400 integraciones.',
        features: ['Flujos sin código', 'Webhooks y triggers', 'Conexión a cualquier API'],
    },
    {
        name: 'AI Vision', sub: 'Computer Vision', color: '#E040FB', symbol: '\u{1F441}', angle: 5, side: 'right',
        desc: 'Detección y reconocimiento de objetos con YOLO para inspección visual y conteo industrial.',
        features: ['Modelos YOLO personalizados', 'Inspección en tiempo real', 'Conteo y clasificación'],
    },
    {
        name: 'Excel', sub: 'Licitaciones', color: '#217346', symbol: '\u{1F4CA}', angle: 50, side: 'right',
        desc: 'Automatización de presupuestos, licitaciones y reportes desde plantillas Excel.',
        features: ['Generación automática de APUs', 'Consolidación de datos', 'Exportación a formatos oficiales'],
    },
    {
        name: 'ERP', sub: 'Base de Datos', color: '#1565C0', symbol: '\u{1F5C4}', angle: 110, side: 'right',
        desc: 'Integración con sistemas empresariales y bases de datos para centralizar la operación.',
        features: ['Sincronización en tiempo real', 'Dashboards operativos', 'Conexión SQL / NoSQL'],
    },
    {
        name: 'GEO', sub: 'Campo', color: '#FF5722', symbol: '\u{1F4CD}', angle: 165, side: 'left',
        desc: 'Control de cuadrillas en campo con geolocalización, rutas y reportes automáticos.',
        features: ['Tracking GPS en vivo', 'Optimización de rutas', 'Reportes fotográficos geolocalizados'],
    },
];

function ServiceIcon({ svc, index }: { svc: ServiceDef; index: number }) {
    const ref = useRef<Group>(null);
    const [hovered, setHovered] = useState(false);
    const a = svc.angle * DEG;
    const r = 6.2;
    const baseX = Math.sin(a) * r;
    const baseZ = Math.cos(a) * r * 0.55 + 1.0;
    const baseY = 3.2 + Math.sin(index * 1.3) * 0.5;

    const handleClick = useCallback(() => {
        setSelectedService(index);
    }, [index]);

    const handlePointerOver = useCallback(() => {
        setHovered(true);
        document.body.style.cursor = 'pointer';
    }, []);

    const handlePointerOut = useCallback(() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
    }, []);

    useFrame(({ clock }) => {
        if (!ref.current) return;
        const t = clock.elapsedTime;
        ref.current.position.y = baseY + Math.sin(t * 0.5 + index * 0.8) * 0.2;
        ref.current.rotation.y = Math.sin(t * 0.25 + index * 0.6) * 0.1;
        const hoverScale = hovered ? 1.15 : 1.0;
        const pulse = 1.0 + Math.sin(t * 1.5 + index * 1.1) * 0.025;
        ref.current.scale.setScalar(pulse * hoverScale);
    });

    return (
        <group ref={ref} position={[baseX, baseY, baseZ]}
            onClick={handleClick}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
        >
            {/* Body cube */}
            <mesh castShadow>
                <boxGeometry args={[0.88, 0.88, 0.18]} />
                <meshStandardMaterial
                    color={svc.color}
                    emissive={svc.color}
                    emissiveIntensity={hovered ? 1.4 : 0.7}
                    roughness={0.3}
                    metalness={0.4}
                />
            </mesh>
            {/* Border */}
            <mesh position={[0, 0, -0.08]}>
                <boxGeometry args={[0.95, 0.95, 0.05]} />
                <meshStandardMaterial
                    color="#ffffff"
                    roughness={0.2}
                    metalness={0.9}
                    transparent
                    opacity={hovered ? 0.25 : 0.12}
                />
            </mesh>
            {/* Halo ring */}
            <mesh position={[0, 0, -0.12]}>
                <ringGeometry args={[0.5, 0.72, 32]} />
                <meshBasicMaterial color={svc.color} transparent opacity={hovered ? 0.15 : 0.06} side={2} />
            </mesh>
            {/* Label using drei Html */}
            <Html
                position={[0, 0, 0.15]}
                center
                style={{ pointerEvents: 'none', userSelect: 'none' }}
                distanceFactor={5}
            >
                <div style={{
                    fontSize: '32px',
                    lineHeight: 1,
                    textAlign: 'center',
                    filter: 'drop-shadow(0 0 4px rgba(0,0,0,0.8))',
                }}>
                    {svc.symbol}
                </div>
            </Html>
            {/* Name label */}
            <Html
                position={[0, -0.58, 0.05]}
                center
                style={{ pointerEvents: 'none', userSelect: 'none' }}
                distanceFactor={5}
            >
                <div style={{
                    color: '#fff',
                    fontSize: '10px',
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    whiteSpace: 'nowrap',
                    textShadow: '0 0 8px rgba(0,0,0,0.9)',
                }}>
                    {svc.name}
                </div>
            </Html>
        </group>
    );
}

// Export icon positions for EnergyLines to reference
export function getIconPosition(index: number, time: number): [number, number, number] {
    const svc = SERVICES[index];
    const a = svc.angle * DEG;
    const r = 6.2;
    const x = Math.sin(a) * r;
    const z = Math.cos(a) * r * 0.55 + 1.0;
    const baseY = 3.2 + Math.sin(index * 1.3) * 0.5;
    const y = baseY + Math.sin(time * 0.5 + index * 0.8) * 0.2;
    return [x, y, z];
}

export default function ServiceIcons() {
    return (
        <group>
            {SERVICES.map((svc, i) => (
                <ServiceIcon key={svc.name} svc={svc} index={i} />
            ))}
        </group>
    );
}
