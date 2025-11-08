from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import PerceptionResult
from perception import Perceiver

app = FastAPI(title="Agent Perception Service", version="0.1.0")

# 添加 CORS 中间件
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 允许所有来源，或替换成 ["http://localhost:5173"] 只允许你的前端
    allow_credentials=True,
    allow_methods=["*"],  # 允许所有 HTTP 方法
    allow_headers=["*"],  # 允许所有请求头
)

perceiver = Perceiver(data_path="demo_data.csv")
perceiver.load()

@app.get("/agent/perceive", response_model=PerceptionResult)
def perceive():
    return perceiver.perceive()
