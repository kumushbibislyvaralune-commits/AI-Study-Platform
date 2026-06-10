from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.services.flashcard_service import generate_flashcards

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/flashcards")
def flashcards(
    db: Session = Depends(get_db)
):
    result = generate_flashcards(db)

    return {
        "success": True,
        "data": result
    }