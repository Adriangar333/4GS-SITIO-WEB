# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server:** `npm run dev` (Next.js dev server at localhost:3000)
- **Build:** `npm run build`
- **Start production:** `npm run start`
- **Lint:** `npm run lint` (ESLint with Next.js core-web-vitals + TypeScript rules)

No test framework is configured.

## Architecture

This is a **Next.js 16 App Router** project that renders a 3D WebGPU scene using React Three Fiber (R3F) and Three.js. The primary language is TypeScript with Tailwind CSS v4.

### WebGPU Renderer Initialization

`src/components/CanvasWrapper.tsx` manages WebGPU lifecycle. It creates a **singleton `WebGPURenderer`** (module-level `globalRenderer` variable) to survive React Strict Mode double-mounts and HMR. The renderer is initialized asynchronously (`await r.init()`) then passed to R3F's `<Canvas gl={renderer}>`. A loading screen shows until the renderer is ready.

### TSL (Three.js Shading Language) — Not GLSL

All shader logic uses **TSL node-based materials** (`MeshStandardNodeMaterial`, `MeshBasicNodeMaterial` from `three/webgpu`). TSL nodes are imported from `three/tsl` (e.g., `color`, `positionLocal`, `time`, `sin`, `mx_noise_float`). TSL compiles to WGSL for WebGPU and GLSL for WebGL fallback automatically. Never write raw GLSL; always use TSL nodes.

Material node graphs must be built inside `useMemo` to avoid recreating the shader graph every render.

### Scene Structure

- `src/app/page.tsx` — Client component (`'use client'`), composes the full-screen 3D scene
- `src/components/CanvasWrapper.tsx` — Async WebGPU renderer init + R3F Canvas wrapper
- `src/components/RobotStage.tsx` — Main 3D object (torus knot with TSL-driven vertex displacement, rotation, and copper/cyan emissive material)
- `src/components/HolographicText.tsx` — 3D text with holographic scanline/glitch effect via TSL; requires `/public/fonts/Inter_Bold.json` font file

### Key Conventions

- Path alias: `@/*` maps to `./src/*`
- All components that use R3F or browser APIs must be `'use client'`
- CSP headers in `next.config.ts` are configured permissively (`unsafe-eval`, `blob:`, `data:`) to support WebGPU
- For high-particle-count or simulation work, use Compute Shaders via TSL with `StorageBuffer` — keep data on the GPU, never transfer positions CPU→GPU per frame
- Use `BatchedMesh` for heterogeneous geometry, `InstancedMesh` for identical geometry — avoid creating many individual Mesh objects
- For interactive state (mouse, physics), prefer mutable TSL uniforms over React re-renders

### Agent Guidelines

See `agent.md` for detailed technical standards covering R3F async init patterns, TSL best practices, compute shader patterns (Init → Update → Render via StorageBuffer), performance rules, and post-processing approach.
