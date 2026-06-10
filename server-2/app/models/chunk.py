from sqlalchemy import Column, String, Text, Integer, DateTime
from datetime import datetime
import uuid

from app.models.document import Base

class Chunk(Base):
    __tablename__ = "chunks"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    document_id = Column(String, nullable=True)
    chunk_index = Column(Integer, nullable=False)
    content = Column(Text, nullable=False)
    embedding = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)