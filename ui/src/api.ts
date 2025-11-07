
import axios from 'axios'
import type { PerceptionResult, TimeseriesPoint } from './types'

const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000'

export async function getPerceive(): Promise<PerceptionResult> {
  const { data } = await axios.get(`${BASE}/agent/perceive`, { timeout: 8000 })
  return data
}

export async function getTimeseries(params: {metrics: string[], start?: string, end?: string}): Promise<TimeseriesPoint[]> {
  const qs = new URLSearchParams()
  qs.set('metrics', params.metrics.join(','))
  if (params.start) qs.set('start', params.start)
  if (params.end) qs.set('end', params.end)
  try {
    const { data } = await axios.get(`${BASE}/timeseries?${qs.toString()}`, { timeout: 12000 })
    return data
  } catch (e) {
    // fallback mock: synthesize series around current perceive
    const now = new Date()
    const points: TimeseriesPoint[] = []
    for (let i=300; i>=0; i--) {
      const t = new Date(now.getTime() - i*1000*60)
      const base = 300 + 50*Math.sin((2*Math.PI)*(i/1440))
      const o = { 
        timestamp: t.toISOString(),
        flow: base + 5*Math.sin(i/20),
        pressure: 7.5 + 0.2*Math.sin(i/60),
        frequency: 45 + 2*Math.sin(i/30),
        power: 30 + 0.2*(base + 5*Math.sin(i/20)),
        current: 10 + 0.03*(30 + 0.2*base)
      } as TimeseriesPoint
      points.push(o)
    }
    return points
  }
}
