import os
import uuid
from fastapi import UploadFile
from sqlalchemy.orm import Session

from app.models.uploaded_document import UploadedDocument

UPLOAD_DIR = "uploads/pdfs"

async def save_pdf(file: UploadFile, db: Session):
    extension = file.filename.split(".")[-1]

    filename = f"{uuid.uuid4()}.{extension}"

    filepath = os.path.join(
        UPLOAD_DIR,
        filename
    )

    content = await file.read()

    with open(filepath, "wb") as f:
        f.write(content)

    uploaded_document = UploadedDocument(
        original_name=file.filename,
        filename=filename,
        filepath=filepath,
        size=len(content)
    )

    db.add(uploaded_document)
    db.commit()
    db.refresh(uploaded_document)

    return {
        "id": uploaded_document.id,
        "original_name": uploaded_document.original_name,
        "filename": uploaded_document.filename,
        "filepath": uploaded_document.filepath,
        "size": uploaded_document.size,
        "created_at": uploaded_document.created_at
    }