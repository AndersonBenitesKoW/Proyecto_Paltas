from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
import cv2
import numpy as np
from ultralytics import YOLO
import io
from PIL import Image

app = FastAPI(title="Avocado Quality Detection API", description="API for detecting and classifying avocado quality using computer vision")

# Load YOLO model (placeholder, assume model is trained and saved as 'avocado_model.pt')
model = YOLO('../models/avocado_model.pt')  # Adjust path as needed

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    # Read image file
    contents = await file.read()
    nparr = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    # Run inference
    results = model(img)

    # Process results
    detections = []
    class_counts = {"primera": 0, "segunda": 0, "descarte": 0}
    total = 0
    for result in results:
        for box in result.boxes:
            x1, y1, x2, y2 = box.xyxy[0].cpu().numpy()
            conf = box.conf[0].cpu().numpy()
            cls = int(box.cls[0].cpu().numpy())
            class_name = model.names[cls]
            detections.append({
                "bbox": [float(x1), float(y1), float(x2), float(y2)],
                "confidence": float(conf),
                "class": class_name
            })
            class_counts[class_name] += 1
            total += 1

    percentages = {k: (v / total * 100) if total > 0 else 0 for k, v in class_counts.items()}
    recommendation = "Cosechar" if percentages.get("primera", 0) >= 70 else "Esperar"

    return {
        "detections": detections,
        "stats": {
            "primera": percentages["primera"],
            "segunda": percentages["segunda"],
            "descarte": percentages["descarte"],
            "recommendation": recommendation
        }
    }

