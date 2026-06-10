from sqlalchemy import Column, String, DateTime, Text
from sqlalchemy.orm import declarative_base
from datetime import datetime
import uuid

Base = declarative_base()

class Document(Base):
    __tablename__ = "documents"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String, nullable=False)
    content = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)