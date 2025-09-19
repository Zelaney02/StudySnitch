from fastapi import FastAPI
from classes import Step

app = FastAPI()

steps = []

@app.get("/get_steps")
async def get_steps():
    return {"steps": steps}


@app.post("/create_step")
async def create_step(step: Step):
    steps.append(step)
    return {"Step successfully created"}
    