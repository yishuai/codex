
export type OperationalData = {
  flow: number; pressure: number; frequency: number; power: number; current: number;
}
export type StatusData = {
  status: number; mode: string;
}
export type EnvironmentalData = {
  temp: number; humidity: number; timestamp: string; is_peak: boolean;
}
export type Pattern = { kind: 'daily'|'weekly'|'seasonal'|'custom'; features: Record<string, number>; score: number }
export type AgentState = {
  operational_data: OperationalData;
  status_data: StatusData;
  environmental_data: EnvironmentalData;
  historical_patterns: Pattern[];
}
export type AnomalyFlag = { metric: string; method: string; score: number; is_anomaly: boolean }
export type PerceptionResult = { state: AgentState; anomalies: AnomalyFlag[]; context: Record<string, number> }

export type TimeseriesPoint = { timestamp: string } & Record<string, number>
