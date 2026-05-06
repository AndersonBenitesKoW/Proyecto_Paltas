import os
import shutil

base_path = "My_datasheet"

clases = ["First_quality", "Second_quality", "Third_quality"]

for clase in clases:
    clase_path = os.path.join(base_path, clase)

    for subfolder in os.listdir(clase_path):
        subfolder_path = os.path.join(clase_path, subfolder)

        if os.path.isdir(subfolder_path):
            for file in os.listdir(subfolder_path):
                src = os.path.join(subfolder_path, file)

                new_name = f"{subfolder}_{file}"
                dst = os.path.join(clase_path, new_name)

                shutil.move(src, dst)

            os.rmdir(subfolder_path)

print("✅ Dataset reorganizado correctamente")