@echo off
echo ===================================================
echo Reparando indice de Git para Windows...
echo ===================================================
del /f /q .git\index 2>nul
git reset
echo.
echo [OK] Indice de Git reparado con exito.
echo Tu repositorio ya esta listo para crear ramas y hacer commits.
echo ===================================================

