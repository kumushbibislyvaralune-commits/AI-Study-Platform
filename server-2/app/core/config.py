from dotenv import load_dotenv
import os

load_dotenv()

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://postgres:postgres123@127.0.0.1:15433/ai_service_db"
)

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")