
from __future__ import annotations
import pandas as pd
from typing import List, Dict
from pathlib import Path
from datetime import datetime
from models import AgentState, OperationalData, StatusData, EnvironmentalData, Pattern, PerceptionResult, AnomalyFlag
from detectors import detect_anomalies, ewma_trend
from fuse import compute_is_peak, derive_context

class Perceiver:
    def __init__(self, data_path: str):
        self.data_path = Path(data_path)
        if not self.data_path.exists():
            raise FileNotFoundError(f"Data file not found: {self.data_path}")
        self.df = None

    def load(self) -> pd.DataFrame:
        df = pd.read_csv(self.data_path, parse_dates=['timestamp'])
        df = df.sort_values('timestamp').reset_index(drop=True)
        df[['flow','pressure','frequency','power','current','temp','humidity']] = \
            df[['flow','pressure','frequency','power','current','temp','humidity']].interpolate().bfill()
        self.df = df
        return df

    def perceive(self) -> PerceptionResult:
        if self.df is None:
            self.load()
        df = self.df
        df['flow_ewma'] = ewma_trend(df['flow'], span=60)
        metrics = ['flow','pressure','power','current']
        scores = detect_anomalies(df, metrics)
        last = df.iloc[-1]
        ts = pd.Timestamp(last['timestamp'])
        state = AgentState(
            operational_data=OperationalData(
                flow=float(last['flow']),
                pressure=float(last['pressure']),
                frequency=float(last['frequency']),
                power=float(last['power']),
                current=float(last['current'])
            ),
            status_data=StatusData(
                status=int(last.get('status', 1)),
                mode=str(last.get('mode', 'auto'))
            ),
            environmental_data=EnvironmentalData(
                temp=float(last['temp']),
                humidity=float(last['humidity']),
                timestamp=ts.to_pydatetime(),
                is_peak=compute_is_peak(ts)
            ),
            historical_patterns=[
                Pattern(kind="daily", features={"hour": float(ts.hour)}, score=0.5)
            ]
        )
        anomalies = [
            AnomalyFlag(metric=m, method="z+hampel", score=v['score'], is_anomaly=bool(v['is_anomaly']))
            for m, v in scores.items()
        ]
        context = derive_context(df)
        return PerceptionResult(state=state, anomalies=anomalies, context=context)
