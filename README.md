# Sistema de Inteligencia Artificial para Detección y Clasificación de Calibre de Paltas

Este proyecto implementa un sistema completo de agricultura de precisión para detectar y clasificar paltas usando visión artificial.

## Arquitectura

- **Frontend**: React - Interfaz web interactiva para subir imágenes y mostrar resultados
- **Backend**: FastAPI - API REST para procesar imágenes y devolver predicciones
- **Modelo ML**: YOLOv8 - Detección y clasificación de paltas en categorías (primera, segunda, descarte)

## Requisitos

### Backend
- Python 3.8+
- Instalar dependencias: `pip install -r backend/requirements.txt`

### Frontend
- Node.js 14+
- Instalar dependencias: `cd frontend && npm install`

## Instalación y Ejecución

1. **Backend**:
   ```bash
   cd backend
   pip install -r requirements.txt
   uvicorn main:app --reload
   ```
   La API estará disponible en http://localhost:8000
   Documentación Swagger en http://localhost:8000/docs

2. **Frontend**:
   ```bash
   cd frontend
   npm install
   npm start
   ```
   La aplicación estará en http://localhost:3000

## Uso

1. Sube una imagen de paltas desde la interfaz web
2. El sistema detectará las paltas, las clasificará y mostrará:
   - Bounding boxes con clasificación y confianza
   - Porcentajes de cada categoría
   - Recomendación de cosecha ("Cosechar" si ≥70% primera calidad)

## Modelo de Machine Learning

El modelo YOLOv8 debe estar entrenado con imágenes de paltas etiquetadas en las clases:
- primera
- segunda
- descarte

Coloca el modelo entrenado en `models/avocado_model.pt`

## Notas

- El sistema asume que el modelo está pre-entrenado
- Para producción, integrar base de datos para almacenar resultados históricos
- Implementar autenticación y manejo de errores robusto