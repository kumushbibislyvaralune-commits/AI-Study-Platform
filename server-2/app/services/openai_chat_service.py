from openai import OpenAI

from app.core.config import OPENAI_API_KEY

client = OpenAI(
    api_key=OPENAI_API_KEY
)

def generate_ai_response(
    question: str,
    context: str
):
    try:
        response = client.responses.create(
            model="gpt-4.1-mini",
            input=f"""
You are an AI study tutor.

Use this context:
{context}

Question:
{question}

Answer simply and clearly.
"""
        )

        return {
            "answer": response.output_text,
            "provider": "openai"
        }

    except Exception:
        return {
            "answer": (
                "Based on the uploaded document, "
                "the relevant information is:\n\n"
                + context[:1000]
            ),
            "provider": "fallback"
        }