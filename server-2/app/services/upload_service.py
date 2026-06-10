import os
import uuid
from fastapi import UploadFile

UPLOAD_DIR = "uploads/pdfs"

async def save_pdf(file: UploadFile):
    extension = file.filename.split(".")[-1]

    filename = f"{uuid.uuid4()}.{extension}"

    filepath = os.path.join(
        UPLOAD_DIR,
        filename
    )

    content = await file.read()

    with open(filepath, "wb") as f:
        f.write(content)

    return {
        "filename": filename,
        "filepath": filepath,
        "size": len(content)
    }