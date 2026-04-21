@echo off
SET PATH=C:\Program Files\nodejs;%PATH%
cd /d "%~dp0"
echo Starting iPhone Emulator...
npx electron .
