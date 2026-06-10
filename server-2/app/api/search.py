from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.services.vector_service import search_chunks

router = APIRouter()

class SearchRequest(BaseModel):
    query: str
    limit: int = 5

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/search")
def search(
    payload: SearchRequest,
    db: Session = Depends(get_db)
):
    results = search_chunks(
        db,
        payload.query,
        payload.limit
    )

    return {
        "success": True,
        "data": {
            "query": payload.query,
            "results_count": len(results),
            "results": results
        }
    }