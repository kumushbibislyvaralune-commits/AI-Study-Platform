from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.services.extract_service import extract_text_from_pdf
from app.services.chunk_service import chunk_text
from app.services.embedding_service import create_embedding
from app.services.vector_service import save_chunks

router = APIRouter()

class ExtractRequest(BaseModel):
    filepath: str
    document_id: str | None = None

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/extract/pdf")
def extract_pdf(
    payload: ExtractRequest,
    db: Session = Depends(get_db)
):
    result = extract_text_from_pdf(payload.filepath)

    chunks = chunk_text(result["text"])

    embeddings = []

    for chunk in chunks:
        embedding = create_embedding(chunk["content"])

        embeddings.append({
            "chunk_index": chunk["index"],
            "vector": embedding["vector"]
        })

    saved_chunks = save_chunks(
        db,
        chunks,
        embeddings,
        payload.document_id
    )

    return {
        "success": True,
        "data": {
            "text_preview": result["text"][:500],
            "length": result["length"],
            "chunks_count": len(chunks),
            "saved_chunks_count": len(saved_chunks),
            "embeddings_count": len(embeddings),
            "first_embedding": embeddings[0]
        }
    }