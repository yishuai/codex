# Agent Perception Module (Minimal MVP)

一个最小可运行的**感知模块**，面向“空压机流量预测与节能优化工业智能体”。

# 接口部分

它提供 HTTP 接口，进行多源信号融合并返回当前 `AgentState` 与异常标记。

## 快速开始

```bash
# 0) 可选：创建虚拟环境
python -m venv .venv && source .venv/bin/activate

# 1) 安装依赖
pip install -r requirements.txt

# 2) 运行服务
uvicorn app:app --reload --port 8000

# 3) 调用接口
curl http://127.0.0.1:8000/agent/perceive

用浏览器打开 http://127.0.0.1:8000/agent/perceive 也能看到它的返回
```

## 当前功能
- 加载演示数据 (`demo_data.csv`)
- 计算简易融合与异常分数（滚动 z-score + Hampel）
- 输出符合需求文档的数据结构（`AgentState`）
- `GET /agent/perceive` FastAPI 接口

## 扩展建议
- 将 `demo_data.csv` 替换为 Kafka/MQTT/PLC 实时采集
- 增加领域检测器（泄漏/卡阀/过热）
- 将感知结果落库（InfluxDB/Timescale）并做面板

# UI 部分

请看 ui 目录下的 README.md 文件