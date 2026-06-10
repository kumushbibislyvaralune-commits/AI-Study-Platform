import hashlib

def create_embedding(text: str):
    hash_value = hashlib.sha256(
        text.encode()
    ).hexdigest()

    return {
        "vector": hash_value,
        "dimension": len(hash_value)
    }