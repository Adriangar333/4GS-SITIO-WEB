'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';

export default function CanvasWrapper({ children }: { children: React.ReactNode }) {
    return (
        <Canvas
            camera={{ position: [0, 3.8, 10], fov: 45, near: 0.1, far: 200 }}
            style={{ background: 'transparent' }}
            dpr={[1, 1.5]}
            gl={{
                antialias: true,
                alpha: true,
                powerPreference: 'high-performance',
            }}
        >
            <Suspense fallback={null}>
                {children}
            </Suspense>
        </Canvas>
    );
}
