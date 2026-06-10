from sqlalchemy.orm import Session

from app.services.vector_service import search_chunks

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

    answer = (
        "Based on the uploaded document, "
        "the most relevant information is:\n\n"
        + context[:1000]
    )

    return {
        "question": question,
        "answer": answer,
        "sources": results
    }