# 🚀 F4GS — Four G Solutions Landing Page

Landing page profesional para **Four G Solutions (4GS)**, empresa de automatización y software en Barranquilla, Colombia.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript)

---

## 📋 Descripción del Proyecto

Landing page moderna de una sola página (SPA) con las siguientes secciones:

| Sección | Descripción |
|---------|-------------|
| **Hero** | Robot 3D interactivo (Spline) + tarjetas de servicios colapsables |
| **Servicios** | Grid de 6 servicios con íconos SVG, tags y descripciones |
| **Nosotros** | Stats (+50 proyectos, +15 clientes, etc.) + tarjetas de equipo |
| **Contacto** | Info de contacto + formulario de demo |
| **Footer** | Info de copyright |

### Servicios que se muestran:
1. 💬 **WhatsApp Business API** — Chatbots y messaging
2. ⚡ **n8n Automatización** — Workflow orchestration
3. 👁️ **AI Vision** — Computer vision con YOLO
4. 📊 **Excel & Licitaciones** — APUs y presupuestos
5. 🗄️ **ERP & Bases de Datos** — Enterprise integration
6. 📍 **GEO & Campo** — Geolocalización

---

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **UI:** React 19 + TypeScript
- **Styling:** Tailwind CSS 4 + CSS custom inline styles
- **3D:** Spline (robot interactivo en el hero)
- **3D Extras:** @react-three/fiber + @react-three/drei (partículas en contacto)
- **Fonts:** Geist Mono, IBM Plex Mono, Syne
- **Animaciones:** CSS keyframes (pulseBox, scanline, fadeInUp, badgeFloat, etc.)

---

## ⚡ Instalación y Ejecución

### Prerequisitos
- **Node.js** 18+ (recomendado 20+)
- **npm** o **yarn**

### Pasos

```bash
# 1. Clonar el repositorio
git clone <URL_DEL_REPO>
cd F4GS

# 2. Instalar dependencias
npm install

# 3. Ejecutar en modo desarrollo
npm run dev

# 4. Abrir en el navegador
# → http://localhost:3000
```

### Build de producción
```bash
npm run build
npm start
```

---

## 📁 Estructura del Proyecto

```
F4GS/
├── public/                    # Archivos estáticos
├── src/
│   ├── app/
│   │   ├── globals.css        # Estilos globales + animaciones CSS
│   │   ├── layout.tsx         # Layout principal (fuentes, metadata)
│   │   └── page.tsx           # Página principal (orquesta todas las secciones)
│   ├── components/
│   │   ├── SplineBot.tsx      # Robot 3D interactivo (Spline)
│   │   ├── ServiceCards.tsx   # Tarjetas de servicio en el hero (colapsables)
│   │   ├── ServiciosSection.tsx  # Sección de servicios (grid 3x2)
│   │   ├── NosotrosSection.tsx   # Sección nosotros (stats + equipo)
│   │   ├── ContactoSection.tsx   # Sección contacto (info + formulario)
│   │   └── ContactoParticles.tsx # Partículas 3D animadas (fondo contacto)
│   └── hooks/
│       └── useScrollReveal.ts # Hook para animaciones al hacer scroll
├── next.config.ts             # Configuración de Next.js
├── tailwind.config.ts         # Configuración de Tailwind CSS
├── tsconfig.json              # Configuración de TypeScript
├── package.json               # Dependencias y scripts
└── README.md                  # Este archivo
```

---

## 🎨 Paleta de Colores

| Color | Hex | Uso |
|-------|-----|-----|
| Bone / Beige | `#F5F0E8` | Fondo principal |
| Gold / Dorado | `#D4A843` | Acentos, títulos destacados, botones CTA |
| Dark Navy | `#1a1a2e` | Footer, textos dark |
| Service Purple | `#E040FB` | AI Vision |
| Service Green | `#25D366` | WhatsApp |
| Service Orange | `#FF6D00` | n8n |
| Service Blue | `#1976D2` | Excel |
| Service Teal | `#00838F` | ERP |
| Service Pink | `#E91E63` | GEO |

---

## 🧩 Componentes Clave

### `page.tsx`
Orquesta toda la página. Define la **navegación fija** con scroll suave y offset para la navbar. Cada sección tiene `min-height: 100vh`.

### `ServiceCards.tsx`
Tarjetas interactivas en el hero. Cada tarjeta se **expande al hacer clic** mostrando:
- Simulación visual del servicio (VisionSim, FlowSim, ExcelSim, etc.)
- Descripción
- Tags de tecnología
- Versión mobile con modal expandible

### `ServiciosSection.tsx`
Grid de 6 servicios con íconos SVG personalizados, subtítulos de categoría, descripciones y tags. Diseño responsivo.

### `SplineBot.tsx`
Carga el modelo 3D de Spline. El robot es interactivo y se puede arrastrar/rotar.

### `ContactoParticles.tsx`
Usa `@react-three/fiber` para renderizar partículas doradas animadas como fondo de la sección de contacto.

---

## 🔧 Cosas Pendientes / Ideas para Mejorar

- [ ] **Formulario funcional:** Conectar el formulario de demo a un backend (n8n webhook, EmailJS, o Firebase)
- [ ] **SEO:** Agregar Open Graph meta tags, sitemap.xml
- [ ] **Analytics:** Integrar Google Analytics o Vercel Analytics
- [ ] **Performance:** Lazy load de Spline bot para mejorar LCP
- [ ] **Animaciones:** Más micro-animaciones en hover de tarjetas
- [ ] **Blog/Portfolio:** Sección de cases de éxito
- [ ] **i18n:** Soporte para inglés
- [ ] **Mobile nav:** Hamburger menu para móvil (actualmente solo desktop)
- [ ] **Dark mode:** Toggle oscuro/claro

---

## 📞 Contacto

- **WhatsApp:** +57 314 584 9576 (Adrian Garzón)
- **Email:** contacto@fourgsolutions.com
- **Ubicación:** Barranquilla, Colombia

---

## 🤖 Notas para Desarrollo con Antigravity (AI Assistant)

Si estás continuando este proyecto con Antigravity:

1. **El servidor de desarrollo** se ejecuta con `npm run dev` en el puerto 3000
2. **Los estilos** usan una mezcla de Tailwind CSS clases y estilos inline de React
3. **Las animaciones CSS** están definidas en `src/app/globals.css` (pulseBox, scanline, fadeInUp, etc.)
4. **Los íconos SVG** para AI Vision y ERP se renderizan con la función `renderIcon()` en `ServiceCards.tsx` y `ServiciosSection.tsx`
5. **El scroll suave** entre secciones se maneja en `page.tsx` con la función `scrollTo()` que compensa el offset de 56px del navbar fijo
6. **Spline 3D** carga desde una URL remota, necesita conexión a internet

### Dependencias clave:
```json
{
  "@splinetool/react-spline": "robot 3D",
  "@react-three/fiber": "partículas 3D",
  "@react-three/drei": "helpers para three.js",
  "three": "motor 3D"
}
```

---

*Built with ❤️ by Four G Solutions — Barranquilla, Colombia*
