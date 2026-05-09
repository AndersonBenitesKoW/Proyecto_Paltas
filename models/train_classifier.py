import torch
import warnings

# --- BLOQUE DE SEGURIDAD PARA PYTORCH 2.6+ ---
# Desactiva la restricción de seguridad para cargar los pesos base de YOLO
def bypass_pytorch_security():
    original_load = torch.load
    def trusted_load(*args, **kwargs):
        kwargs['weights_only'] = False
        return original_load(*args, **kwargs)
    torch.load = trusted_load

bypass_pytorch_security()
# ---------------------------------------------

from ultralytics import YOLO

def train_classification():
    # 1. Cargar el modelo base
    model = YOLO('yolov8n-cls.pt') 
    
    # 2. Iniciar entrenamiento avanzado
    model.train(
        data='../My_Datasheet',
        epochs=150,        # Aumentamos a 150 épocas para un aprendizaje profundo
        imgsz=224,         # Resolución de entrada
        augment=True,      # CLAVE: Activa rotaciones, brillos y zoom automáticos
        patience=25,       # Early Stopping: Si en 25 épocas no mejora, se detiene solo
        batch=16,          # Cantidad de imágenes por lote (ajusta según tu RAM)
        name='paltas_v2_profesional' # Nombre de la carpeta de salida
    )

if __name__ == '__main__':
    train_classification()