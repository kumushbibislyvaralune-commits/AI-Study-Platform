import hashlib
from openai import OpenAI

from app.core.config import OPENAI_API_KEY

client = OpenAI(
    api_key=OPENAI_API_KEY
)

def create_mock_embedding(text: str):
    hash_value = hashlib.sha256(
        text.encode()
    ).hexdigest()

    return {
        "vector": hash_value,
        "dimension": len(hash_value),
        "provider": "mock"
    }

def create_embedding(text: str):
    try:
        response = client.embeddings.create(
            model="text-embedding-3-small",
            input=text
        )

        vector = response.data[0].embedding

        return {
            "vector": str(vector),
            "dimension": len(vector),
            "provider": "openai"
        }

    except Exception:
        return create_mock_embedding(text)