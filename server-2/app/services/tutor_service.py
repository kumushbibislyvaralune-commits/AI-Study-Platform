from sqlalchemy.orm import Session

from app.services.vector_service import search_chunks

def tutor_chat(
    db: Session,
    message: str
):
    results = search_chunks(
        db,
        message,
        limit=3
    )

    context = "\n\n".join(
        [item["content"] for item in results]
    )

    response = (
        "I am your AI tutor. Based on your uploaded study material:\n\n"
        + context[:1000]
        + "\n\nSimple explanation:\n"
        + "This part is important because it explains the key requirements and learning tasks from your document."
    )

    return {
        "message": message,
        "response": response,
        "sources_count": len(results),
        "sources": results
    }