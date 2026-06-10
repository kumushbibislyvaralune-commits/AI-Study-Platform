from sqlalchemy.orm import Session

from app.models.chunk import Chunk

def save_chunks(
    db: Session,
    chunks,
    embeddings,
    document_id: str | None = None
):
    saved_chunks = []

    for chunk, embedding in zip(chunks, embeddings):
        item = Chunk(
            document_id=document_id,
            chunk_index=chunk["index"],
            content=chunk["content"],
            embedding=embedding["vector"]
        )

        db.add(item)
        saved_chunks.append(item)

    db.commit()

    return saved_chunks


def search_chunks(
    db: Session,
    query: str,
    limit: int = 5
):
    chunks = db.query(Chunk).all()

    results = []

    query_words = query.lower().split()

    for chunk in chunks:
        content_lower = chunk.content.lower()

        score = 0

        for word in query_words:
            if word in content_lower:
                score += 1

        if score > 0:
            results.append({
                "id": chunk.id,
                "chunk_index": chunk.chunk_index,
                "content": chunk.content,
                "score": score
            })

    results.sort(
        key=lambda item: item["score"],
        reverse=True
    )

    return results[:limit]