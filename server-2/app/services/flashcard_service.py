from sqlalchemy.orm import Session

from app.services.vector_service import search_chunks

def generate_flashcards(db: Session):
    chunks = search_chunks(
        db,
        query="requirements design testing implementation",
        limit=5
    )

    flashcards = []

    for index, chunk in enumerate(chunks):
        flashcards.append({
            "id": index + 1,
            "front": f"Key idea from section {chunk['chunk_index']}",
            "back": chunk["content"][:300]
        })

    return {
        "flashcards_count": len(flashcards),
        "flashcards": flashcards
    }