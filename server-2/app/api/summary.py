from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.services.summary_service import generate_summary

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/summary")
def summary(
    db: Session = Depends(get_db)
):
    result = generate_summary(db)

    return {
        "success": True,
        "data": result
    }