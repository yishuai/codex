
from typing import List, Dict, Optional, Literal
from pydantic import BaseModel, Field
from datetime import datetime

class OperationalData(BaseModel):
    flow: float
    pressure: float
    frequency: float
    power: float
    current: float

class StatusData(BaseModel):
    status: int  # 0=off, 1=on
    mode: str

class EnvironmentalData(BaseModel):
    temp: float
    humidity: float
    timestamp: datetime
    is_peak: bool

class Pattern(BaseModel):
    kind: Literal["daily","weekly","seasonal","custom"]
    features: Dict[str, float] = Field(default_factory=dict)
    score: float = 0.0

class AgentState(BaseModel):
    operational_data: OperationalData
    status_data: StatusData
    environmental_data: EnvironmentalData
    historical_patterns: List[Pattern] = []

class AnomalyFlag(BaseModel):
    metric: str
    method: str
    score: float
    is_anomaly: bool

class PerceptionResult(BaseModel):
    state: AgentState
    anomalies: List[AnomalyFlag] = []
    context: Dict[str, float] = {}
