from ultralytics import YOLO

def train_classification():
    # 🔥 Cargar modelo base de clasificación
    model = YOLO('yolov8n-cls.pt')

    # 🚀 Entrenar modelo
    model.train(
    data='D:/ProyectoPaltas/My_datasheet',  # carpeta con tus clases (primera, segunda, tercera)
        epochs=50,
        imgsz=224,
        batch=16,
        name='avocado_classifier'
    )

    print("✅ Entrenamiento de CLASIFICACIÓN terminado")

if __name__ == "__main__":
    train_classification()