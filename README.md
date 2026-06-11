# ⚽ POLLA MUNDIAL 2026

Aplicación web para gestionar una quiniela/polla entre amigos para la Copa Mundial de la FIFA 2026.

## ✅ Características

- **48 equipos oficiales** en 12 grupos (A-L)
- **72 partidos de fase de grupos** + eliminación directa (108 totales)
- **Sistema de puntuación detallado**
- **Tabla de posiciones** en tiempo real
- **Comparador** de predicciones entre amigos
- **Panel de administrador** para ingresar resultados reales
- **Multi-dispositivo**: ¡Todos ven los mismos datos!

## 🏆 Sistema de Puntuación

| Acción | Puntos | Descripción |
|--------|--------|-------------|
| Marcador exacto | **2 pts** | Adivinaste el resultado exacto (ej: 2-1) |
| Acertar ganador | **3 pts** | Adivinaste quién gana o si hay empate |
| Goles de un equipo | **1 pt** | Adivinaste los goles de UN equipo |
| Diferencia de gol | **1 pt** | Adivinaste la diferencia de goles |
| Campeón exacto | **18 pts** | Adivinaste al campeón del Mundial |
| Subcampeón exacto | **15 pts** | Adivinaste al subcampeón |
| Tercer lugar exacto | **12 pts** | Adivinaste al tercero |

### Ejemplos de puntuación:

**Partido: Argentina 2 - 1 Brasil**

| Predicción | Puntos | Razón |
|------------|--------|-------|
| 2 - 1 | **8 pts** | 2(exacto) + 3(ganador) + 1(goles Arg) + 1(goles Bra) + 1(diferencia) |
| 3 - 0 | **4 pts** | 3(ganador) + 1(diferencia) |
| 1 - 0 | **3 pts** | 3(ganador) |
| 2 - 2 | **3 pts** | 3(empate) + 1(diferencia=-1✓) - 1(goles)=3 |
| 0 - 1 | **3 pts** | 3(ganador Brasil) |
| 0 - 2 | **4 pts** | 3(ganador) + 1(goles Brasil) |
| 5 - 3 | **0 pts** | Todo incorrecto |

## 🚀 Cómo ejecutar

### Paso 1: Instalar dependencias

```bash
npm install
```

### Paso 2: Iniciar el servidor

```bash
npm start
```

El servidor mostrará:

```
⚽ POLLA MUNDIAL 2026 - Servidor activo

🌐 Accede desde cualquier dispositivo en la red:

📱 En esta computadora: http://localhost:3000
💻 En otros dispositivos: http://[TU-IP]:3000
```

### Paso 3: Compartir con amigos

Para que tus amigos accedan desde **otra red**, usa ngrok:

```bash
npx ngrok http 3000
```

Esto genera una URL pública como `https://abc123.ngrok.io` que puedes compartir.

## 🔐 Código Admin

Para crear un usuario administrador: usa el código **ADMIN2026** al registrarte.

## 📱 Funcionamiento

1. **Regístrate** con nombre y PIN de 4 dígitos
2. **Haz tus predicciones** en "Mi Polla"
3. **Guarda** tus pronósticos
4. **El administrador** ingresa los resultados reales
5. **Todos ven** quién va ganando en la tabla

## 🌐 Acceso desde Internet

### Opción 1: ngrok (gratis)

```bash
npx ngrok http 3000
```

### Opción 2: Deploy en Railway/Render

Sube los archivos a Railway o Render para hosting gratuito.

## 📂 Estructura

```
├── index.html    # Frontend (HTML + CSS + JS)
├── server.js     # Backend (Express)
├── matches.js    # Datos de partidos
├── package.json  # Dependencias
└── data.json     # (se crea automáticamente)
```

## ⚙️ Resetear datos

```bash
# Accede a: http://localhost:3000/api/reset
```

---

¡Buena suerte con la polla! 🏆⚽