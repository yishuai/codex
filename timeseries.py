from datetime import datetime, timedelta
import random
from typing import List, Optional

_METRIC_RANGES = {
    "flow": (100, 400),
    "pressure": (5, 15),
    "frequency": (40, 60),
    "power": (20, 40),
    "current": (5, 15),
}


def generate_timeseries(metric: str, start: Optional[str] = None, end: Optional[str] = None) -> List[dict]:
    """
    Generate time series data for the given metric within the specified time range.
    """
    # Default time range if not provided
    if start is None:
        start = (datetime.now() - timedelta(minutes=300)).isoformat()
    if end is None:
        end = datetime.now().isoformat()

    try:
        start_time = datetime.fromisoformat(start)
        end_time = datetime.fromisoformat(end)
    except ValueError:
        raise ValueError("Invalid time format")

    low, high = _METRIC_RANGES.get(metric, (0, 1))

    points = []
    current_time = start_time

    while current_time <= end_time:
        point = {
            "timestamp": current_time.isoformat(),
            metric: random.uniform(low, high),
        }
        points.append(point)
        current_time += timedelta(minutes=1)

    return points
