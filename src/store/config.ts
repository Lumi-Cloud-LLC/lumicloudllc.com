import { create } from 'zustand'

export interface SceneConfig {
  shapes: { count: number; drift: number; rot: number; pulse: number; fade: number; brightPct: number; scrollK: number; scrollMax: number; scrollEase: number }
  hue: { speed: number; sat: number; lit: number }
  grid: { density: number; glowR: number; bulge: number; wave: number; wave2: number; wave2Freq: number; bright: number; ease: number; glow: string }
  camera: { parallax: number }
  fog: { density: number }
  motifs: { count: number; opMin: number; opMax: number; depth: number }
}

export const DEFAULTS: SceneConfig = {
  shapes: { count: 16, drift: 1, rot: 1, pulse: 0.10, fade: 14, brightPct: 0.28, scrollK: 0.06, scrollMax: 2.5, scrollEase: 0.08 },
  hue: { speed: 0.010, sat: 0.13, lit: 0.52 },
  grid: { density: 30, glowR: 26, bulge: 18, wave: 1.8, wave2: 0.6, wave2Freq: 0.035, bright: 1.0, ease: 0.08, glow: '#6BA157' },
  camera: { parallax: 1 },
  fog: { density: 0.0060 },
  motifs: { count: 18, opMin: 0.14, opMax: 0.58, depth: 1 },
}

function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}

function setNestedValue(obj: Record<string, unknown>, path: string, value: unknown): Record<string, unknown> {
  const keys = path.split('.')
  const result = deepClone(obj) as Record<string, unknown>
  let current = result
  for (let i = 0; i < keys.length - 1; i++) {
    current = current[keys[i]] as Record<string, unknown>
  }
  current[keys[keys.length - 1]] = value
  return result
}

interface ConfigStore {
  config: SceneConfig
  panelOpen: boolean
  setConfigValue: (path: string, value: number | string) => void
  resetConfig: () => void
  setPanelOpen: (open: boolean) => void
}

export const useConfigStore = create<ConfigStore>((set) => ({
  config: deepClone(DEFAULTS),
  panelOpen: false,

  setConfigValue: (path: string, value: number | string) => {
    set((state) => ({
      config: setNestedValue(state.config as unknown as Record<string, unknown>, path, value) as unknown as SceneConfig,
    }))
  },

  resetConfig: () => {
    set({ config: deepClone(DEFAULTS) })
  },

  setPanelOpen: (open: boolean) => {
    set({ panelOpen: open })
  },
}))
