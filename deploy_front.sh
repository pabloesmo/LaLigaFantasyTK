#!/bin/bash
# Script para desplegar el frontend paso a paso

# Salir si hay cualquier error
set -e

# Variable para mensaje numerado
COMMIT_MSG="Frontend commit con fecha: $(date +'%Y-%m-%d_%H-%M-%S')"

echo "Añadiendo cambios..."
git add .

echo "Haciendo commit con mensaje: $COMMIT_MSG"
git commit -m "$COMMIT_MSG" || echo "Sin cambios para commitear"

echo "Pusheando a remoto..."
git push

echo "Construyendo frontend..."
npm run build

echo "Desplegando frontend..."
npm run deploy

echo "🚀 Frontend desplegado correctamente"
