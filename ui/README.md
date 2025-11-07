这是一个简单的“感知”模块的界面。

它会访问 `http://localhost:8000/agent/perceive`，请求感知模块的数据，然后显示到界面上。

所以，在运行该界面前，请先启动 FastAPI 的感知服务（`uvicorn app:app --reload --port 8000`）。

# Perception UI (React + Vite + Tailwind)

面向“感知模块”的最小前端：总览 + 监控 + 异常列表。默认连接 。

## 安装和启动

在命令行，进入 ui 目录，执行下面的命令

```bash
npm install
npm run dev
```

## 访问

在浏览器中访问 http://localhost:5173 即可
