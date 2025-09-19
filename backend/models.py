from pydantic import BaseModel
from enum import Enum
from typing import List


class Role(str, Enum):
    user = "user"
    system = "system"
    assistant = "assistant"


class History(BaseModel):
    role: Role
    content: str


class Models(str, Enum):        #free models
    meta_llama_3_8b_free = "meta-llama/llama-3.3-8b-instruct:free"
    deepseek_r1_free = "deepseek/deepseek-chat-v3.1:free"
    google_gemma_3n_e2b_free = "google/gemma-3n-e2b-it:free"
    qwen_qwen3_14b_free = "qwen/qwen3-14b:free"
    mistral_7b_free = "mistralai/mistral-7b-instruct:free"
    openchat_free = "openchat/openchat-7b:free"


class Prompt(BaseModel):
    message: str
    model: Models = Models.meta_llama_3_8b_free     #default for now i'll change it later if needed
    history: List[History] = [] 
