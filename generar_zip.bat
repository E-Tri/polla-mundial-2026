@echo off
echo ===============================================
echo   POLLA MUNDIAL 2026 - GENERADOR DE ZIP
echo ===============================================
echo.

REM Crear carpeta temporal para los archivos
if exist "polla-mundial-2026" rmdir /s /q "polla-mundial-2026"
mkdir "polla-mundial-2026"

REM Copiar archivos (el usuario debe poner los archivos aqui)
echo Copies the 6 files to this folder:
echo - index.html
echo - server.js
echo - matches.js
echo - package.json
echo - data.json
echo.
echo Press any key to continue...
pause >nul

REM Verificar archivos
echo.
echo Verificando archivos...
if not exist "index.html" echo ERROR: index.html no encontrado
if not exist "server.js" echo ERROR: server.js no encontrado
if not exist "matches.js" echo ERROR: matches.js no encontrado
if not exist "package.json" echo ERROR: package.json no encontrado
if not exist "data.json" echo ERROR: data.json no encontrado

echo.
echo Generando ZIP...
powershell -command "Compress-Archive -Path '*.html','*.js','*.json' -DestinationPath 'polla-mundial-2026-v2.zip' -Force"

if exist "polla-mundial-2026-v2.zip" (
    echo.
    echo SUCCESS: polla-mundial-2026-v2.zip creado!
    echo.
    echo Ahora sube este ZIP a GitHub.
) else (
    echo.
    echo ERROR: No se pudo crear el ZIP
)

echo.
pause