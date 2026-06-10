from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.services.tutor_service import tutor_chat

router = APIRouter()

class TutorRequest(BaseModel):
    message: str

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/tutor/chat")
def chat(
    payload: TutorRequest,
    db: Session = Depends(get_db)
):
    result = tutor_chat(
        db,
        payload.message
    )

    return {
        "success": True,
        "data": result
    }