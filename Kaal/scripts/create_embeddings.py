import json, os, requests
from dotenv import load_dotenv
from pinecone import Pinecone

load_dotenv()

JINA_API_KEY = os.getenv("JINA_API_KEY")
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
INDEX_NAME = os.getenv("PINECONE_INDEX")

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_PATH = os.path.join(ROOT_DIR, "data", "all_verses_with_themes.json")

def get_embedding(text):
    headers = {"Authorization": f"Bearer {JINA_API_KEY}"}
    payload = {
        "model": "jina-embeddings-v3",
        "task": "retrieval.passage",
        "dimensions": 1024,
        "input": [text]
    }
    res = requests.post("https://api.jina.ai/v1/embeddings", json=payload, headers=headers)
    return res.json()["data"][0]["embedding"]

pc = Pinecone(api_key=PINECONE_API_KEY)
index = pc.Index(INDEX_NAME)

with open(DATA_PATH, "r", encoding="utf-8") as f:
    shlokas = json.load(f)

for i, verse in enumerate(shlokas):
    text = f"{verse['translation']} {verse['advice']}"
    vector = get_embedding(text)

    index.upsert([
        {
            "id": f"shloka-{i}",
            "values": vector,
            "metadata": {
                "sanskrit": verse["sanskrit"],
                "translation": verse["translation"],
                "advice": verse["advice"]
            }
        }
    ])

print("✅ Pinecone Shlokas Indexed Successfully")

