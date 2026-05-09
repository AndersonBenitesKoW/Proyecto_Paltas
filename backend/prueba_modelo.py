import torch
# 1. BLOQUE DE SEGURIDAD (Obligatorio para PyTorch 2.6+)
def bypass_pytorch_security():
    original_load = torch.load
    torch.load = lambda *args, **kwargs: original_load(*args, **{**kwargs, 'weights_only': False})

bypass_pytorch_security()

from fastapi import FastAPI, File, UploadFile
import cv2
import numpy as np
from ultralytics import YOLO
import uvicorn

app = FastAPI(title="Avocado Quality Detection API")

# 2. CARGA DEL MODELO
# Asegúrate de que el nombre coincida con el que le pusiste (modelo_clasificador_paltas.pt)
# Si main.py está en la raíz, la ruta es 'models/modelo_clasificador_paltas.pt'
model = YOLO('../training_results/best2.pt') 

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    # Leer imagen
    contents = await file.read()
    nparr = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    # 3. EJECUTAR INFERENCIA
    results = model(img)

    # 4. PROCESAR RESULTADOS
    # Nota: Tu entrenamiento fue de CLASIFICACIÓN, por lo que usamos results[0].probs
    result = results[0]
    
    # Obtener probabilidades
    probs = result.probs
    top1_idx = probs.top1
    confianza = float(probs.top1conf)
    nombre_clase = result.names[top1_idx]

    # Diccionario de conteos (opcional si solo envías una imagen)
    # Aquí calculamos la recomendación lógica
    recommendation = "Cosechar" if nombre_clase == "Primera" and confianza > 0.8 else "Esperar"

    return {
        "resultado": {
            "clase": nombre_clase,
            "confianza": round(confianza * 100, 2),
            "recomendacion": recommendation
        },
        "detalles_tecnicos": {
            "modelo": "YOLOv8-Clasificador",
            "imgsz": 224
        }
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)


""" http://127.0.0.1:8000/docs """