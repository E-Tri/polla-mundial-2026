# POLLA MUNDIAL 2026 - Especificación Técnica

## 1. Concepto y Visión

Una aplicación web interactiva para gestionar una quiniela/marcador entre amigos durante el Mundial FIFA 2026. La experiencia transmite la emoción del fútbol con una estética nocturna de estadio, donde cada prediccción es una apuesta y cada punto cuenta. El diseño evoca las noches de verano viendo partidos con amigos, con la tensión de quien va ganando la polla.

## 2. Lenguaje de Diseño

### Dirección Estética
"Estadio Nocturno" - Fondos oscuros profundos con acentos neón que evocan las luces del estadio y la energía del fútbol internacional.

### Paleta de Colores
- **Fondo Principal:** #0f0f1a (negro profundo azulado)
- **Fondo Secundario:** #1a1a2e (azul oscuro)
- **Fondo Cards:** #252542 (púrpura oscuro)
- **Acento Primario:** #7c3aed (violeta neón)
- **Acento Secundario:** #10b981 (verde esmeralda - para éxito/goles)
- **Acento dorado:** #f59e0b (para Líder/Campeón)
- **Texto Principal:** #f1f5f9
- **Texto Secundario:** #94a3b8
- **Error:** #ef4444

### Tipografía
- **Títulos:** "Outfit", sans-serif (bold, modernos)
- **Cuerpo:** "Inter", sans-serif (legible, limpio)
- **Números/Scores:** "JetBrains Mono", monospace

### Sistema Espacial
- Base: 4px
- Espaciado: 8, 12, 16, 24, 32, 48px
- Border radius: 8px (cards), 12px (buttons), 24px (modals)

### Filosofía de Movimiento
- Transiciones suaves 200-300ms ease-out
- Hover effects con scale(1.02) en cards interactivas
- Números de score con animación de "count-up" al actualizar
- Tab switching con slide + fade (150ms)

### Assets Visuales
- Banderas: API de flagcdn.com
- Iconos: Lucide Icons (inline SVG)
- Decorativos: Gradientes neón sutiles, bordes con glow effect

## 3. Layout y Estructura

### Arquitectura de Página
- **Header fijo:** Logo, nombre usuario, selector de vista rápida
- **Navigation tabs:** 4 pestañas con indicador animado
- **Content area:** Scroll vertical con safe areas para móvil
- **Floating action:** Botón guardar en esquina inferior derecha

### Responsive Strategy
- Mobile-first (< 640px): Stack vertical, inputs grandes táctil-friendly
- Tablet (640-1024px): Grid de 2 columnas para partidos
- Desktop (> 1024px): Layout completo con sidebar de stats

### Estructura de Contenido
1. **Mi Polla:** Accordion por jornada/fase, inputs de goles, selector de avance
2. **Leaderboard:** Tabla con ranks, scores, badges
3. **Comparador:** Dropdown de partido + cards de predicciones
4. **Admin:** Formularios de ingreso de resultados (solo admin)

## 4. Features e Interacciones

### Sistema de Usuarios
- **Registro/Login simple:** Nombre + PIN de 4 dígitos
- **Sesión en localStorage:** Persiste hasta logout manual
- **Admin toggle:** Código especial para acceso admin

### Predicciones - Fase de Grupos
- 8 grupos (A-H), 4 equipos cada uno, 6 partidos por grupo = 48 partidos
- Input: [Goles A] vs [Goles B] para cada partido
- Al guardar: Algoritmo calcula tabla de grupo y clasifica top 2
- Modal de confirmación antes de guardar

### Predicciones - Fase Eliminación
- Dieciseisavos: 16 partidos (ganadores de grupo vs 2do de otro grupo)
- Cruce predefinido pero editable si admin modificó clasificaciones
- Octavos → Cuartos → Semis → Final
- Usuario selecciona equipo que avanza en cada llave

### Sistema de Puntuación
```
ACIERTO_EXACTO = 5 puntos
ACIERTO_TENDENCIA = 3 puntos  
FALLO = 0 puntos

BONIFICACIONES:
Clasificar a Octavos (por equipo) = 5 puntos
Clasificar a Cuartos (por equipo) = 5 puntos  
Clasificar a Semis (por equipo) = 5 puntos
Campeón exacto = 15 puntos
```

### Tabla de Posiciones
- Ordenada por puntos totales
- Desempate: más aciertos exactos > más predicciones > orden alfabético
- Corona animada para el líder
- Top 3 destacado con colores (oro, plata, bronce)

### Ingreso de Resultados (Admin)
- Selector de partido
- Inputs de goles
- Botón "Confirmar Resultado"
- Al confirmar: Recalcula scores de TODOS los usuarios
- Historial de resultados ingresados

### Estados y Edge Cases
- **Sin predicciones:** Empty state con CTA "Haz tu primera predicción"
- **Partido no jugado:** Inputs deshabilitados, indicador "Pendiente"
- **Partido en progreso:** Badge "En juego" con color warning
- **Partido finalizado:** Resultado real mostrado, puntos calculados
- **Usuario nuevo:** Tutorial tooltip overlay

## 5. Inventario de Componentes

### TeamBadge
- Bandera + nombre del equipo
- Estados: default, selected (borde neón), eliminated (opacidad 50%)
- Hover: scale(1.05)

### MatchCard
- Dos TeamBadge enfrentados con VS central
- Inputs de goles (number, 0-15)
- Estados: editable, locked, result_display
- Score real en caso de finalizado

### PredictionRow (Leaderboard)
- Rank, avatar/nombre, score, acertados
- Animación de entrada staggered

### TabButton
- Icono + texto
- Indicador de tab activo (línea neón)
- Badge de notificación (partidos sin predecir)

### FloatingSaveButton
- Posición fija bottom-right
- Contador de predicciones pendientes
- Shake animation si intenta guardar incompleto

### Modal
- Overlay oscuro con blur
- Card centrada con animación scale-in
- Botón cerrar + click outside para cerrar

### AdminResultForm
- Dropdown de partidos pendientes
- Inputs de score
- Validación de datos

## 6. Enfoque Técnico

### Stack
- **Vanilla HTML/CSS/JS** - Single file para máxima portabilidad
- **localStorage** para persistencia
- **CSS Custom Properties** para theming
- **No frameworks** - reduce complejidad

### Estructura de Datos

```javascript
// Equipos
teams = {
  "A1": { name: "Argentina", flag: "ar", group: "A" },
  // ... 48 equipos
}

// Partidos
matches = {
  "group-A-1": { 
    team1: "A1", team2: "A2", 
    date: "2026-06-11", time: "12:00",
    phase: "group", group: "A", matchNumber: 1
  },
  // ... 64 partidos
}

// Resultados reales (admin)
realResults = {
  "group-A-1": { team1Score: 2, team2Score: 1, status: "completed" }
}

// Predicciones usuario
userPredictions = {
  "userId": {
    "matchId": { team1Score: 2, team2Score: 1 },
    // Almacena predicciones de fase grupos
  }
}

// Scores calculados
userScores = {
  "userId": {
    points: 45,
    exactMatches: 8,
    tendencyMatches: 5,
    knockoutProgress: { "finals": ["Q1", "Q2"] }
  }
}
```

### Algoritmo de Scoring
1. Obtener todas las predicciones del usuario
2. Para cada partido con resultado real:
   - Comparar predicción con resultado
   - Si exacto: +5 puntos
   - Si tendencia (mismo winner/draw): +3 puntos
   - Sino: +0
3. Calcular clasificaciones de grupos según predicciones
4. Comparar con clasificaciones reales para bonus
5. Acumular en userScores

### Persistencia
- `localStorage.setItem('polla_users', JSON.stringify(users))`
- `localStorage.setItem('polla_predictions', JSON.stringify(allPredictions))`
- `localStorage.setItem('polla_results', JSON.stringify(realResults))`
- `localStorage.setItem('polla_currentUser', userId)`

### Archivos del Proyecto
1. `index.html` - Estructura completa
2. `styles.css` - Estilos (embebido en HTML)
3. `app.js` - Lógica completa (embebido en HTML)
4. `data/worldcup2026.json` - Datos de equipos y partidos