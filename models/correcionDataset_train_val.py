import os
import shutil
import random

# Configuraciones de rutas
base_path = r'D:\ProyectoPaltas\My_datasheet'
categories = ['First_quality', 'Second_quality', 'Third_quality']
splits = ['train', 'val']
split_ratio = 0.8  # 80% para entrenamiento, 20% para validación

def organizar_dataset():
    for category in categories:
        source_dir = os.path.join(base_path, category)
        
        # Verificar si la carpeta de origen existe
        if not os.path.exists(source_dir):
            print(f"⚠️ Saltando {category}: No se encontró la carpeta.")
            continue

        # Crear subcarpetas de clase en train y val
        for split in splits:
            os.makedirs(os.path.join(base_path, split, category), exist_ok=True)

        # Obtener lista de imágenes
        images = [f for f in os.listdir(source_dir) if f.lower().endswith(('.png', '.jpg', '.jpeg'))]
        random.shuffle(images)

        # Calcular punto de división
        split_idx = int(len(images) * split_ratio)
        train_images = images[:split_idx]
        val_images = images[split_idx:]

        # Mover archivos a train
        for img in train_images:
            shutil.move(os.path.join(source_dir, img), os.path.join(base_path, 'train', category, img))

        # Mover archivos a val
        for img in val_images:
            shutil.move(os.path.join(source_dir, img), os.path.join(base_path, 'val', category, img))

        print(f"✅ {category}: {len(train_images)} a train, {len(val_images)} a val.")

if __name__ == "__main__":
    organizar_dataset()
    print("\n🚀 ¡Dataset listo para Ultralytics!")