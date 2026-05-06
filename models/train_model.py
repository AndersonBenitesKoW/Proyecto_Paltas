# Script para entrenar el modelo YOLOv8 con datos de paltas
# Asume que tienes un dataset en formato YOLO (imágenes y labels)

from ultralytics import YOLO

# Cargar modelo base
model = YOLO('yolov8n.pt')  # o yolov8s.pt para mejor precisión

# Entrenar
model.train(
    data='path/to/data.yaml',  # Archivo de configuración del dataset
    epochs=100,
    imgsz=640,
    batch=16,
    name='avocado_model'
)

# Guardar modelo
model.save('avocado_model.pt')