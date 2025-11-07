
from __future__ import annotations
import numpy as np
import pandas as pd
from typing import Dict, List, Tuple

def rolling_zscore(x: pd.Series, window: int = 60, eps: float = 1e-9) -> pd.Series:
    m = x.rolling(window, min_periods=max(5, window//5)).mean()
    s = x.rolling(window, min_periods=max(5, window//5)).std().replace(0, np.nan)
    z = (x - m) / (s + eps)
    return z.fillna(0.0)

def hampel_filter(x: pd.Series, window: int = 21, k: float = 3.0) -> pd.Series:
    med = x.rolling(window, center=True, min_periods=max(5, window//3)).median()
    mad = (x - med).abs().rolling(window, center=True, min_periods=max(5, window//3)).median()
    score = (x - med).abs() / (1.4826 * (mad + 1e-9))
    return score.fillna(0.0)

def ewma_trend(x: pd.Series, span: int = 120) -> pd.Series:
    return x.ewm(span=span, adjust=False).mean()

def detect_anomalies(df: pd.DataFrame, metrics: List[str]) -> Dict[str, Dict[str, float]]:
    out: Dict[str, Dict[str, float]] = {}
    for m in metrics:
        z = rolling_zscore(df[m])
        h = hampel_filter(df[m])
        score = float(max(abs(z.iloc[-1]), h.iloc[-1]))
        out[m] = {
            "zscore": float(z.iloc[-1]),
            "hampel": float(h.iloc[-1]),
            "score": score,
            "is_anomaly": bool(score > 3.5)
        }
    return out
