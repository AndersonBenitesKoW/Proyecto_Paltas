import os
import glob
import base64
import numpy as np
import cv2
from io import BytesIO
from fastapi import FastAPI, File, UploadFile, Query
from fastapi.responses import JSONResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO

app = FastAPI(title="Avocado Quality Detection API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL_PATH = "../training_results/best3.pt"
DATASET_PATH = "../datasetUnificado"
CLASS_NAMES = ["Primera", "Segunda", "Tercera"]
COLORS = {"Primera": "#52b788", "Segunda": "#ffd166", "Tercera": "#ef476f"}

model = YOLO(MODEL_PATH)


def get_label_class(image_path: str) -> str | None:
    label_path = image_path.replace("images", "labels").rsplit(".", 1)[0] + ".txt"
    if os.path.exists(label_path):
        with open(label_path) as f:
            first_line = f.readline().strip()
            if first_line:
                class_id = int(first_line.split()[0])
                if 0 <= class_id < len(CLASS_NAMES):
                    return CLASS_NAMES[class_id]
    return None


@app.get("/api/dataset/list")
async def list_dataset(split: str = Query("test")):
    images_dir = os.path.join(DATASET_PATH, split, "images")
    if not os.path.exists(images_dir):
        return {"images": []}
    images = []
    for ext in ("*.jpg", "*.jpeg", "*.png", "*.webp"):
        for path in glob.glob(os.path.join(images_dir, ext)):
            filename = os.path.basename(path)
            images.append({
                "filename": filename,
                "split": split,
                "ground_truth": get_label_class(path),
                "url": f"/api/dataset/image/{split}/{filename}"
            })
    return {"images": images}


@app.get("/api/dataset/image/{split}/{filename}")
async def get_dataset_image(split: str, filename: str):
    path = os.path.join(DATASET_PATH, split, "images", filename)
    if not os.path.exists(path):
        return JSONResponse({"error": "Image not found"}, status_code=404)
    return FileResponse(path, media_type="image/jpeg")


@app.get("/api/model/info")
async def model_info():
    return {
        "model": "YOLOv11",
        "classes": CLASS_NAMES,
        "weights": MODEL_PATH,
        "colors": COLORS
    }


@app.post("/api/predict")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()
    nparr = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    if img is None:
        return JSONResponse({"error": "Invalid image"}, status_code=400)
    return run_inference(img)


@app.post("/api/predict-frame")
async def predict_frame(data: dict):
    raw = data.get("image", "")
    if "," in raw:
        raw = raw.split(",")[1]
    img_bytes = base64.b64decode(raw)
    nparr = np.frombuffer(img_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    if img is None:
        return JSONResponse({"error": "Invalid frame"}, status_code=400)
    return run_inference(img)


def run_inference(img: np.ndarray):
    results = model(img)
    detections = []
    class_counts = {"Primera": 0, "Segunda": 0, "Tercera": 0}
    total = 0

    for result in results:
        if result.boxes is None:
            continue
        for box in result.boxes:
            x1, y1, x2, y2 = box.xyxy[0].cpu().numpy()
            conf = float(box.conf[0].cpu().numpy())
            cls_id = int(box.cls[0].cpu().numpy())
            class_name = CLASS_NAMES[cls_id] if cls_id < len(CLASS_NAMES) else f"class_{cls_id}"

            detections.append({
                "bbox": [float(x1), float(y1), float(x2), float(y2)],
                "confidence": round(conf, 4),
                "class": class_name,
                "color": COLORS.get(class_name, "#ffffff")
            })
            if class_name in class_counts:
                class_counts[class_name] += 1
            total += 1

    percentages = {
        k: round((v / total * 100) if total > 0 else 0, 1)
        for k, v in class_counts.items()
    }
    recommendation = "Cosechar" if percentages.get("Primera", 0) >= 70 else "Esperar"

    return {
        "detections": detections,
        "stats": {
            "total": total,
            **percentages,
            "recommendation": recommendation,
            "recommendation_color": "#52b788" if recommendation == "Cosechar" else "#ef476f"
        }
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
