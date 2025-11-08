
import create from 'zustand'

type UIState = {
  metric: string
  setMetric: (m: string) => void
  selectedAnomalyId?: string
  setSelectedAnomalyId: (id?: string) => void
  live: boolean
  setLive: (v: boolean) => void
}

export const useUI = create<UIState>((set) => ({
  metric: 'flow',
  setMetric: (m) => set({ metric: m }),
  selectedAnomalyId: undefined,
  setSelectedAnomalyId: (id) => set({ selectedAnomalyId: id }),
  live: true,
  setLive: (v) => set({ live: v })
}))
