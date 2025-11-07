
import create from 'zustand'

type UIState = {
  metrics: string[]
  setMetrics: (m: string[]) => void
  selectedAnomalyId?: string
  setSelectedAnomalyId: (id?: string) => void
  live: boolean
  setLive: (v: boolean) => void
}

export const useUI = create<UIState>((set) => ({
  metrics: ['flow','pressure','power'],
  setMetrics: (m) => set({ metrics: m }),
  selectedAnomalyId: undefined,
  setSelectedAnomalyId: (id) => set({ selectedAnomalyId: id }),
  live: true,
  setLive: (v) => set({ live: v })
}))
