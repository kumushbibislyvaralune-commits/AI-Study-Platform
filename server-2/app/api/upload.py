from fastapi import APIRouter, UploadFile, File

from app.services.upload_service import save_pdf

router = APIRouter()

@router.post("/upload/pdf")
async def upload_pdf(file: UploadFile = File(...)):
    result = await save_pdf(file)

    return {
        "success": True,
        "data": result
    }