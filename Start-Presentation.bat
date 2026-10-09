@echo off
REM Offline backup launcher. Works with NO internet once dependencies are installed and the site has been built.
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js was not found. Install Node.js 18+ or open exports\Shaunak_Senior_Presentation.pdf instead.
  pause
  exit /b 1
)
if not exist dist\index.html (
  echo First run: building the site...
  call npm run build
  if errorlevel 1 ( echo Build failed. & pause & exit /b 1 )
)
start "" "http://127.0.0.1:4173/"
node scripts\serve.mjs 4173
