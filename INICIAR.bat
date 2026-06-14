@echo off
echo.
echo ================================================
echo    POLLA MUNDIAL 2026 - INICIADOR
echo ================================================
echo.

REM Verificar si Node.js está instalado
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js no está instalado.
    echo.
    echo Descarga Node.js desde: https://nodejs.org/
    echo.
    pause
    exit /b
)

echo [OK] Node.js instalado: 
node --version
echo.

REM Verificar archivos
echo Verificando archivos...
if not exist "server.js" (
    echo ERROR: server.js no encontrado
    echo.
    echo Asegurate de que los 5 archivos esten en esta carpeta:
    echo - server.js
    echo - index.html
    echo - matches.js
    echo - package.json
    echo - data.json
    echo.
    pause
    exit /b
)

if not exist "index.html" (
    echo ERROR: index.html no encontrado
    exit /b
)

echo [OK] Archivos verificados
echo.

REM Instalar dependencias si no existen
if not exist "node_modules" (
    echo Instalando dependencias...
    npm install
    echo.
)

REM Iniciar servidor
echo ================================================
echo    Servidor iniciando...
echo    Abre tu navegador y ve a:
echo.
echo    http://localhost:3000
echo.
echo    Presiona CTRL+C para detener el servidor
echo ================================================
echo.

node server.js

pause