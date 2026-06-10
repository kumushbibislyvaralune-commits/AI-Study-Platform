from sqlalchemy.orm import Session

from app.services.vector_service import search_chunks

def generate_quiz(db: Session):
    chunks = search_chunks(
        db,
        query="requirements design implementation testing",
        limit=5
    )

    questions = []

    for index, chunk in enumerate(chunks):
        questions.append({
            "id": index + 1,
            "type": "short_answer",
            "question": f"What is the main idea of section {chunk['chunk_index']}?",
            "answer": chunk["content"][:300]
        })

    return {
        "questions_count": len(questions),
        "questions": questions
    }