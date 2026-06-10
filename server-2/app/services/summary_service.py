from sqlalchemy.orm import Session

from app.services.vector_service import search_chunks

def generate_summary(db: Session):
    chunks = search_chunks(
        db,
        query="assignment requirements system design testing implementation",
        limit=10
    )

    context = " ".join(
        [item["content"] for item in chunks]
    )

    summary = context[:1200]

    return {
        "summary": summary,
        "sources_count": len(chunks)
    }