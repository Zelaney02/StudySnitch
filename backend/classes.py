from fastapi import FastAPI
from pydantic import BaseModel


class Step(BaseModel):
    id: int
    text: str

class TTS_Request(BaseModel):
    voice: str
    text: str