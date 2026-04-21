@echo off
SET PATH=C:\Program Files\nodejs;%PATH%
cd /d "%~dp0"
echo Starting iPhone Emulator...
if exist node_modules\.bin\electron.cmd (
    node_modules\.bin\electron.cmd .
) else (
    npm install && node_modules\.bin\electron.cmd .
)
