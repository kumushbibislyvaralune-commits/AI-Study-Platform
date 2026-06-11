from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.database import engine
from app.models.document import Base
from app.models.chunk import Chunk

from app.api.documents import router as document_router
from app.api.upload import router as upload_router
from app.api.extract import router as extract_router
from app.api.search import router as search_router
from app.api.ask import router as ask_router
from app.api.summary import router as summary_router
from app.api.quiz import router as quiz_router
from app.api.flashcards import router as flashcards_router
from app.api.tutor import router as tutor_router
from app.api.stats import router as stats_router
from app.models.uploaded_document import UploadedDocument
from app.api.documents_history import router as documents_history_router


app = FastAPI(
    title="AI Study Platform - AI Service",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(document_router, prefix="/api")
app.include_router(upload_router, prefix="/api")
app.include_router(extract_router, prefix="/api")
app.include_router(search_router, prefix="/api")
app.include_router(ask_router, prefix="/api")
app.include_router(summary_router, prefix="/api")
app.include_router(quiz_router, prefix="/api")
app.include_router(flashcards_router, prefix="/api")
app.include_router(tutor_router, prefix="/api")
app.include_router(stats_router, prefix="/api")
app.include_router(documents_history_router, prefix="/api")


@app.get("/")
def root():
    return {
        "message": "AI Service is running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
        "service": "server-2"
    }


@app.get("/db-test")
def db_test():
    Base.metadata.create_all(bind=engine)

    return {
        "database": "connected",
        "tables": "created"
    }