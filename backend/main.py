from fastapi import FastAPI, HTTPException
from models import Prompt, History, Role
from fastapi.responses import RedirectResponse, JSONResponse

import requests
import json
import os
import time
from typing import Optional

from dotenv import load_dotenv
load_dotenv()

"""
Request body:

{
  "message": "What is quantum computing?",
  "model": "openai/gpt-4",
  "history": [
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "Hello!"}
  ]
}


Response:

{
  "response": "Quantum computing is a field of computing that..."
}

"""

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
BASE_URL = "https://openrouter.ai/api/v1/chat/completions"


app = FastAPI()


@app.get("/")
async def root():
    return {"message" : "yo whatsup hehehe"}

@app.get("/debug")      #have to delete ithis later :>
async def debug():
    return {
        "api_key_exists": bool(OPENROUTER_API_KEY),
        "api_key_length": len(OPENROUTER_API_KEY) if OPENROUTER_API_KEY else 0,
        "api_key_preview": OPENROUTER_API_KEY[:10] + "..." if OPENROUTER_API_KEY else "Not found"
    }

@app.post("/api/v1/chat")
async def chat(prompt: Prompt):
    if not OPENROUTER_API_KEY:
        raise HTTPException(status_code=500, detail="OPENROUTER_API_KEY not found in environment variables")
    
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",  
        "X-Title": "Multi-Model Chatbot GDGC Task Round"
    }

    data = {
        "model": prompt.model.value,
        "messages": [ 
            {"role": h.role.value, "content": h.content} for h in prompt.history
        ] + [
            {"role": "user", "content": prompt.message}
        ]
    }


    print(" Request data:", json.dumps(data, indent=2))

    try:
        response = requests.post(
            BASE_URL, headers=headers, json=data
        )
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}")
        if hasattr(e, 'response') and e.response is not None:
            print(f"Response status: {e.response.status_code}")
            print(f"Response body: {e.response.text}")
        raise HTTPException(status_code=500, detail=str(e))

    resp_json = response.json()
    print("OpenRouter response:", resp_json)

    return {
        "response": resp_json["choices"][0]["message"]["content"]
    }