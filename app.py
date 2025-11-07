
from fastapi import FastAPI
from models import PerceptionResult
from perception import Perceiver

app = FastAPI(title="Agent Perception Service", version="0.1.0")
perceiver = Perceiver(data_path="demo_data.csv")
perceiver.load()

@app.get("/agent/perceive", response_model=PerceptionResult)
def perceive():
    return perceiver.perceive()
