from fastapi import APIRouter
from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.models.uploaded_document import UploadedDocument

router = APIRouter()

@router.get("/recent-documents")
def get_recent_documents():
    db: Session = SessionLocal()

    try:
        documents = (
            db.query(UploadedDocument)
            .order_by(UploadedDocument.created_at.desc())
            .limit(5)
            .all()
        )

        return {
            "success": True,
            "data": [
                {
                    "id": item.id,
                    "name": item.original_name,
                    "size": item.size,
                    "created_at": str(item.created_at)
                }
                for item in documents
            ]
        }

    finally:
        db.close()