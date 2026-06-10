from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.services.document_service import (
    create_document,
    get_documents,
    get_document_by_id,
)

router = APIRouter()

class DocumentCreate(BaseModel):
    title: str
    content: str

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/documents")
def create(payload: DocumentCreate, db: Session = Depends(get_db)):
    document = create_document(
        db,
        payload.title,
        payload.content
    )

    return {
        "success": True,
        "data": {
            "id": document.id,
            "title": document.title,
            "content": document.content,
            "created_at": document.created_at
        }
    }

@router.get("/documents")
def find_all(db: Session = Depends(get_db)):
    documents = get_documents(db)

    return {
        "success": True,
        "data": documents
    }

@router.get("/documents/{document_id}")
def find_one(document_id: str, db: Session = Depends(get_db)):
    document = get_document_by_id(db, document_id)

    if not document:
        raise HTTPException(
            status_code=404,
            detail="Document not found"
        )

    return {
        "success": True,
        "data": document
    }