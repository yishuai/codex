
from perception import Perceiver
def test_perceive_smoke():
    p = Perceiver(data_path="demo_data.csv")
    p.load()
    res = p.perceive()
    assert res.state.operational_data.flow >= 0
    assert isinstance(res.anomalies, list)
