from sqlalchemy.orm import Session

from app.services.vector_service import search_chunks
from app.services.openai_chat_service import generate_ai_response

def generate_answer(
    db: Session,
    question: str
):
    results = search_chunks(
        db,
        question,
        limit=3
    )

    context = "\n\n".join(
        [item["content"] for item in results]
    )

    ai_result = generate_ai_response(
        question,
        context
    )

    return {
        "question": question,
        "answer": ai_result["answer"],
        "provider": ai_result["provider"],
        "sources": results
    }