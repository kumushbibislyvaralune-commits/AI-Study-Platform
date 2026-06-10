from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.services.rag_service import generate_answer

router = APIRouter()

class AskRequest(BaseModel):
    question: str

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/ask")
def ask(
    payload: AskRequest,
    db: Session = Depends(get_db)
):
    result = generate_answer(
        db,
        payload.question
    )

    return {
        "success": True,
        "data": result
    }