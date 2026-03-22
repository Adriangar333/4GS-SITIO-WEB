'use client';

import { useRef, useEffect, useState } from 'react';

export default function SplineBot() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [loading, setLoading] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {

        const canvas = canvasRef.current;
        if (!canvas) return;

        let disposed = false;

        // Override getContext to ALWAYS force alpha
        const origGetContext = canvas.getContext.bind(canvas);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (canvas as any).getContext = (type: string, attrs?: any) => {
            if (type === 'webgl2' || type === 'webgl') {
                return origGetContext(type, {
                    ...attrs,
                    alpha: true,
                    premultipliedAlpha: true,
                    antialias: true,
                    preserveDrawingBuffer: false,
                });
            }
            return origGetContext(type, attrs);
        };

        // Performance Optimization: Cap pixelRatio
        // High DPI screens cause massive perf hits. Cap to 1.5 on PC, 1.0 (or lower) on mobile
        const maxPixelRatio = window.innerWidth < 768 ? 1.0 : 1.5;
        const targetPixelRatio = Math.min(window.devicePixelRatio, maxPixelRatio);

        // Dynamic import the runtime
        import('@splinetool/runtime').then(({ Application }) => {
            if (disposed) return;

            const app = new Application(canvas);

            // Apply pixel ratio limit manually if supported or via canvas size
            // Spline runtime usually handles this, but we force it here by checking documentation or standard canvas scaling
            // For now, let's rely on Spline's internal handling but we could force canvas size

            // Expose for debugging
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (window as any).__splineApp = app;

            app.load('https://prod.spline.design/CwXrfQHaI0P9ij3T/scene.splinecode')
                .then(() => {
                    if (disposed) return;
                    setLoading(false);

                    try {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        const a = app as any;

                        // Force transparent background by patching the renderer
                        // The Spline runtime calls setClearAlpha(1) every frame,
                        // so we must intercept and override it permanently
                        if (a._renderer) {
                            const renderer = a._renderer;

                            // Set transparency once
                            renderer.setClearColor(0x000000, 0);
                            renderer.setClearAlpha(0);

                            // Patch setClearAlpha to always force 0
                            renderer.setClearAlpha = () => { };

                            // Patch setClearColor to strip alpha
                            const origSetClearColor = renderer.setClearColor.bind(renderer);
                            renderer.setClearColor = (color: number) => {
                                origSetClearColor(color, 0);
                            };

                            // Patch render to ensure alpha=0 before each frame
                            const origRender = renderer.render.bind(renderer);
                            renderer.render = (...args: unknown[]) => {
                                renderer._gl?.clearColor(0, 0, 0, 0);
                                return origRender(...args);
                            };

                            // Force our custom performance pixel ratio
                            renderer.setPixelRatio(targetPixelRatio);
                        }

                        // Also null the scene background
                        if (a._scene) {
                            a._scene.background = null;
                            // Patch the background setter to prevent Spline from resetting it
                            Object.defineProperty(a._scene, 'background', {
                                get: () => null,
                                set: () => { },
                                configurable: true,
                            });
                        }

                        // Remove Spline watermark/logo from the scene graph
                        if (a._scene) {
                            const toRemove: unknown[] = [];
                            a._scene.traverse((child: Record<string, unknown>) => {
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                const obj = child as any;
                                const name = (obj.name || '').toLowerCase();
                                const type = obj.type || '';
                                if (
                                    name.includes('watermark') ||
                                    name.includes('spline') ||
                                    name.includes('logo') ||
                                    type === 'Sprite' ||
                                    type === 'CSS2DObject' ||
                                    type === 'CSS3DObject'
                                ) {
                                    obj.visible = false;
                                    toRemove.push(obj);
                                }
                            });
                            toRemove.forEach((obj: any) => {
                                if (obj.parent) obj.parent.remove(obj);
                            });
                        }

                        // Disable internal watermark properties
                        if (a._watermark) { a._watermark.visible = false; a._watermark = null; }
                        if (a.watermark) { a.watermark.visible = false; a.watermark = null; }

                        // Branding — apply gold tints to bot parts
                        if (a._scene) {
                            a._scene.traverse((child: Record<string, unknown>) => {
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                const obj = child as any;
                                const name = obj.name || '';

                                if (name === 'Body' && obj.material) {
                                    if (obj.material.emissive) {
                                        obj.material.emissive.setHex(0xA07D2E);
                                        obj.material.emissiveIntensity = 0.08;
                                    }
                                    obj.material.needsUpdate = true;
                                }
                                if (name === 'Head 2' && obj.material) {
                                    if (obj.material.emissive) {
                                        obj.material.emissive.setHex(0xD4A843);
                                        obj.material.emissiveIntensity = 0.04;
                                    }
                                    obj.material.needsUpdate = true;
                                }
                                if ((name === 'Cylinder 3' || name === 'Cylinder') && obj.material) {
                                    if (obj.material.emissive) {
                                        obj.material.emissive.setHex(0xD4A843);
                                        obj.material.emissiveIntensity = 0.15;
                                    }
                                    obj.material.needsUpdate = true;
                                }
                                if (name === 'Point Light' && obj.color) {
                                    obj.color.setHex(0xFFE4B5);
                                }
                            });
                        }

                        console.log('[FGS] Brand applied, watermark removed, background cleared');
                    } catch (err) {
                        console.warn('[FGS] Error:', err);
                    }
                });

            // Cleanup
            return () => {
                disposed = true;
                app.dispose();
            };
        });

        return () => {
            disposed = true;
        };
    }, []);

    // Sweeping interval to globally destroy the Spline watermark anywhere in the DOM
    useEffect(() => {
        let isActive = true;
        const killer = setInterval(() => {
            if (!isActive) return;
            try {
                // Sweep all likely watermark elements globally without touching parents
                document.querySelectorAll('a, #logo, #spline-logo').forEach(el => {
                    const e = el as HTMLElement;
                    
                    // Kill links to spline
                    if (e.tagName === 'A') {
                        const href = (e as HTMLAnchorElement).href || '';
                        if (href.includes('spline') || href.includes('splinetool')) {
                            e.style.setProperty('display', 'none', 'important');
                            e.style.setProperty('opacity', '0', 'important');
                            e.style.setProperty('pointer-events', 'none', 'important');
                        }
                    }

                    // Kill known Spline ID wrappers
                    if (e.id === 'logo' || e.id === 'spline-logo') {
                        e.style.setProperty('display', 'none', 'important');
                        e.style.setProperty('pointer-events', 'none', 'important');
                    }
                });

                // Also check inside Shadow DOMs if any web components (like spline-viewer) were injected
                const shadowHosts = document.querySelectorAll('*');
                shadowHosts.forEach(host => {
                    if (host.shadowRoot) {
                        const logo = host.shadowRoot.querySelector('#logo, a[href*="spline"]');
                        if (logo) {
                            (logo as HTMLElement).style.setProperty('display', 'none', 'important');
                        }
                    }
                });
            } catch(e) {
                // silent
            }
        }, 300); // Check aggressively

        return () => {
            isActive = false;
            clearInterval(killer);
        };
    }, []);

    // ── Gyroscope → Mouse emulation for mobile ──
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Only run on touch devices (mobile/tablet)
        const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (!isMobile) return;

        let permissionGranted = false;
        let gyroCleanup: (() => void) | null = null;

        const handleOrientation = (e: DeviceOrientationEvent) => {
            if (!canvas) return;

            // beta: front-back tilt (-180 to 180, usually 0-90 when upright)
            // gamma: left-right tilt (-90 to 90)
            const beta = e.beta ?? 45;  // Default to ~upright
            const gamma = e.gamma ?? 0; // Default to center

            const rect = canvas.getBoundingClientRect();

            // Map gamma (-45 to 45 range, clamped) → X position across canvas
            const clampedGamma = Math.max(-45, Math.min(45, gamma));
            const normalizedX = (clampedGamma + 45) / 90; // 0 to 1
            const clientX = rect.left + normalizedX * rect.width;

            // Map beta (20 to 70 range, clamped for typical phone holding) → Y position
            const clampedBeta = Math.max(20, Math.min(70, beta));
            const normalizedY = (clampedBeta - 20) / 50; // 0 to 1
            const clientY = rect.top + normalizedY * rect.height;

            // Dispatch synthetic mousemove so Spline picks it up
            const syntheticEvent = new MouseEvent('mousemove', {
                clientX,
                clientY,
                bubbles: true,
                cancelable: true,
            });
            canvas.dispatchEvent(syntheticEvent);
        };

        const startGyro = () => {
            window.addEventListener('deviceorientation', handleOrientation, true);
            permissionGranted = true;
            gyroCleanup = () => {
                window.removeEventListener('deviceorientation', handleOrientation, true);
            };
        };

        // iOS 13+ requires explicit permission request via user gesture
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const DOE = DeviceOrientationEvent as any;
        if (typeof DOE.requestPermission === 'function') {
            // We need a user gesture — add a one-time tap listener on the canvas
            const requestOnTap = () => {
                DOE.requestPermission()
                    .then((state: string) => {
                        if (state === 'granted') {
                            startGyro();
                        }
                    })
                    .catch(console.warn);
                canvas.removeEventListener('touchstart', requestOnTap);
            };
            canvas.addEventListener('touchstart', requestOnTap, { once: true });

            return () => {
                canvas.removeEventListener('touchstart', requestOnTap);
                gyroCleanup?.();
            };
        } else {
            // Android and other — just start listening
            startGyro();
            return () => {
                gyroCleanup?.();
            };
        }
    }, [loading]);

    return (
        <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
            {loading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-5" style={{ background: '#F5F0E8', zIndex: 10 }}>
                    <div className="w-10 h-10 border-4 border-[#D4A843] border-t-transparent rounded-full animate-spin" />
                    <span style={{ 
                        color: '#D4A843', fontSize: '11px', letterSpacing: '0.25em', fontWeight: 800,
                        animation: 'pulse 2s infinite cubic-bezier(0.4, 0, 0.6, 1)' 
                    }}>
                        CARGANDO MODELO 3D...
                    </span>
                </div>
            )}
            <canvas
                ref={canvasRef}
                style={{ width: '100%', height: '100%', display: 'block', background: 'transparent' }}
            />
            {/* Absolute CSS nuke for the watermark in case it tries to override JS */}
            <style dangerouslySetInnerHTML={{__html: `
                a[href*="spline.design"], 
                a[href*="splinetool"],
                #logo, 
                #spline-logo {
                    display: none !important;
                    opacity: 0 !important;
                    pointer-events: none !important;
                    visibility: hidden !important;
                    z-index: -9999 !important;
                    width: 0 !important;
                    height: 0 !important;
                }
            `}} />
        </div>
    );
}
