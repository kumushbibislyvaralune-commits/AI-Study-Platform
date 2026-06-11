from fastapi import APIRouter
from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.models.chunk import Chunk
from app.models.uploaded_document import UploadedDocument

router = APIRouter()

@router.get("/stats")
def get_stats():
    db: Session = SessionLocal()

    try:
        documents_count = db.query(UploadedDocument).count()
        chunks_count = db.query(Chunk).count()

        quiz_items_count = min(chunks_count, 5)
        flashcards_count = min(chunks_count, 5)

        return {
            "success": True,
            "data": {
                "documents": documents_count,
                "chunks": chunks_count,
                "quiz_items": quiz_items_count,
                "flashcards": flashcards_count,
            }
        }

    finally:
        db.close()