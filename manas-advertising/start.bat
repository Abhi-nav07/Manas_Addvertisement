@echo off
setlocal enabledelayedexpansion
title Manas Advertising - Startup Script

echo ===================================================
echo     Manas Advertising - Development Launcher
echo ===================================================
echo.

:: 1. Check if Node.js is installed (direct PATH or common locations)
node -v >nul 2>nul
if %errorlevel% equ 0 goto node_found

if exist "C:\Program Files\nodejs\node.exe" (
    set "PATH=C:\Program Files\nodejs;!PATH!"
    goto node_found
)
if exist "C:\Program Files (x86)\nodejs\node.exe" (
    set "PATH=C:\Program Files (x86)\nodejs;!PATH!"
    goto node_found
)
if exist "P:\Study Buddy\node.exe" (
    set "PATH=P:\Study Buddy;!PATH!"
    goto node_found
)
if exist "%LocalAppData%\Programs\node\node.exe" (
    set "PATH=%LocalAppData%\Programs\node;!PATH!"
    goto node_found
)
if exist "%AppData%\npm\node.exe" (
    set "PATH=%AppData%\npm;!PATH!"
    goto node_found
)

echo [ERROR] Node.js was not found on your system!
echo.
echo Please download and install Node.js from:
echo https://nodejs.org/ (Version 18+ recommended)
echo.
echo After installing Node.js, restart your terminal or double-click start.bat again.
echo ===================================================
pause
exit /b 1

:node_found
echo [✓] Node.js detected:
call node -v
echo.

:: Free port 3000 if occupied by any lingering background process
for /f "tokens=5" %%a in ('netstat -aon ^| findstr /r /c:":3000.*LISTENING"') do (
    echo [INFO] Clearing lingering process on port 3000 ^(PID: %%a^)...
    taskkill /f /pid %%a >nul 2>nul
)

cd /d "%~dp0"

:: 2. Check and install dependencies if node_modules is missing
if not exist "node_modules\" (
    echo [INFO] Dependencies - node_modules - missing.
    echo [INFO] Running 'npm install' ... Please wait...
    echo.
    call npm install
    if %errorlevel% neq 0 (
        echo.
        echo [ERROR] 'npm install' failed with error code %errorlevel%.
        echo Please check your internet connection or package configuration.
        echo ===================================================
        pause
        exit /b %errorlevel%
    )
    echo.
    echo [✓] Dependencies installed successfully.
    echo.
) else (
    echo [✓] Dependencies found in node_modules.
    echo.
)

:: 3. Launch background watcher that waits for server readiness before opening browser
echo [INFO] Waiting for development server to be ready before opening browser...
start "" powershell -NoProfile -ExecutionPolicy Bypass -Command "for ($i=0; $i -lt 30; $i++) { try { $client = New-Object System.Net.Sockets.TcpClient('127.0.0.1', 3000); $client.Close(); break } catch { Start-Sleep -Seconds 1 } }; Start-Process 'http://localhost:3000'"

:: 4. Start the development server
echo [INFO] Starting frontend development server (npm run dev)...
echo ===================================================
echo Server running at http://localhost:3000
echo Press Ctrl+C in this window to stop the server.
echo ===================================================
echo.

call npm run dev

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Development server exited with error code %errorlevel%.
    echo ===================================================
    pause
    exit /b %errorlevel%
)

pause
