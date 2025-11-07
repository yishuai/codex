
from __future__ import annotations
import pandas as pd
import numpy as np
from typing import Dict

def compute_is_peak(ts: pd.Timestamp, peak_hours=(8, 21), peak_days=(0,1,2,3,4)) -> bool:
    return (ts.weekday() in peak_days) and (peak_hours[0] <= ts.hour < peak_hours[1])

def derive_context(df: pd.DataFrame) -> Dict[str, float]:
    last = df.iloc[-1]
    load_factor = float(last['power'] / (last['frequency'] + 1e-6))
    if len(df) > 5:
        slope = float((df['pressure'].iloc[-1] - df['pressure'].iloc[-6]) / 5.0)
    else:
        slope = 0.0
    st = float(df['flow'].tail(12).mean()) if len(df) >= 12 else float(df['flow'].mean())
    lt = float(df['flow'].tail(360).mean()) if len(df) >= 360 else float(df['flow'].mean())
    ratio = float(st / (lt + 1e-6))
    return {
        "load_factor": load_factor,
        "pressure_slope_5m": slope,
        "flow_st_lt_ratio": ratio
    }
