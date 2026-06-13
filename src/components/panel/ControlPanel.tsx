import { useEffect, useState, useCallback } from 'react'
import { useConfigStore, DEFAULTS } from '../../store/config'

interface SliderControl {
  k: string
  label: string
  min: number
  max: number
  step: number
  type?: never
}

interface ColorControl {
  k: string
  label: string
  type: 'color'
  min?: never
  max?: never
  step?: never
}

type Control = SliderControl | ColorControl

interface Group {
  group: string
  controls: Control[]
}

const SCHEMA: Group[] = [
  {
    group: 'Shapes',
    controls: [
      { k: 'shapes.count', label: 'count', min: 8, max: 28, step: 1 },
      { k: 'shapes.drift', label: 'drift speed', min: 0, max: 3, step: 0.05 },
      { k: 'shapes.rot', label: 'rotation speed', min: 0, max: 3, step: 0.05 },
      { k: 'shapes.pulse', label: 'scale pulse', min: 0, max: 0.4, step: 0.01 },
      { k: 'shapes.fade', label: 'fade margin', min: 2, max: 30, step: 1 },
      { k: 'shapes.brightPct', label: '% bright', min: 0, max: 1, step: 0.02 },
      { k: 'shapes.scrollK', label: 'scroll boost k', min: 0, max: 0.4, step: 0.01 },
      { k: 'shapes.scrollMax', label: 'scroll boost max', min: 0, max: 6, step: 0.25 },
      { k: 'shapes.scrollEase', label: 'scroll ease', min: 0.02, max: 0.4, step: 0.01 },
    ],
  },
  {
    group: 'Hue cycle',
    controls: [
      { k: 'hue.speed', label: 'speed', min: 0, max: 0.05, step: 0.001 },
      { k: 'hue.sat', label: 'saturation', min: 0, max: 0.6, step: 0.01 },
      { k: 'hue.lit', label: 'lightness', min: 0.2, max: 0.8, step: 0.01 },
    ],
  },
  {
    group: 'Grid',
    controls: [
      { k: 'grid.density', label: 'line density', min: 10, max: 60, step: 1 },
      { k: 'grid.glowR', label: 'glow radius', min: 8, max: 60, step: 1 },
      { k: 'grid.bulge', label: 'bulge height', min: 0, max: 40, step: 1 },
      { k: 'grid.wave', label: 'wave amplitude', min: 0, max: 4, step: 0.05 },
      { k: 'grid.wave2', label: 'wave2 amplitude', min: 0, max: 4, step: 0.05 },
      { k: 'grid.wave2Freq', label: 'wave2 frequency', min: 0.005, max: 0.12, step: 0.005 },
      { k: 'grid.bright', label: 'base brightness', min: 0.2, max: 2, step: 0.05 },
      { k: 'grid.ease', label: 'follow ease', min: 0.01, max: 0.3, step: 0.01 },
      { k: 'grid.glow', label: 'glow color', type: 'color' },
    ],
  },
  {
    group: 'Camera & fog',
    controls: [
      { k: 'camera.parallax', label: 'camera parallax', min: 0, max: 3, step: 0.05 },
      { k: 'fog.density', label: 'fog density', min: 0, max: 0.02, step: 0.0005 },
    ],
  },
  {
    group: 'Motifs',
    controls: [
      { k: 'motifs.count', label: 'count', min: 0, max: 30, step: 1 },
      { k: 'motifs.opMin', label: 'opacity min', min: 0, max: 1, step: 0.02 },
      { k: 'motifs.opMax', label: 'opacity max', min: 0, max: 1, step: 0.02 },
      { k: 'motifs.depth', label: 'parallax depth', min: 0, max: 3, step: 0.05 },
    ],
  },
]

function getP(obj: Record<string, unknown>, path: string): unknown {
  return path.split('.').reduce((a, k) => (a as Record<string, unknown>)[k], obj as unknown)
}

function decimals(step: number): number {
  if (step >= 1) return 0
  if (step < 0.001) return 4
  if (step < 0.01) return 3
  return 2
}

function fmt(v: number, step: number): string {
  return v.toFixed(decimals(step))
}

function copyToClipboard(text: string, onDone: () => void) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(onDone).catch(onDone)
  } else {
    const ta = document.createElement('textarea')
    ta.value = text
    document.body.appendChild(ta)
    ta.select()
    try {
      document.execCommand('copy')
    } catch (_) {
      // ignore
    }
    ta.remove()
    onDone()
  }
}

export default function ControlPanel() {
  const panelOpen = useConfigStore((s) => s.panelOpen)
  const setPanelOpen = useConfigStore((s) => s.setPanelOpen)
  const setConfigValue = useConfigStore((s) => s.setConfigValue)
  const resetConfig = useConfigStore((s) => s.resetConfig)

  // Key counter to force re-render of panel body on reset
  const [resetKey, setResetKey] = useState(0)
  const [copyLabel, setCopyLabel] = useState('copy values')

  const setOpen = useCallback(
    (v: boolean) => {
      setPanelOpen(v)
    },
    [setPanelOpen],
  )

  // Keyboard shortcuts
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName?.toLowerCase()
      if (e.key === '`' && tag !== 'input' && tag !== 'textarea') {
        e.preventDefault()
        setOpen(!useConfigStore.getState().panelOpen)
      }
      if (e.key === 'Escape' && useConfigStore.getState().panelOpen) {
        setOpen(false)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [setOpen])

  const handleChange = (c: Control, raw: string) => {
    const v = c.type === 'color' ? raw : parseFloat(raw)
    setConfigValue(c.k, v)
  }

  const handleCopy = () => {
    const json = JSON.stringify(useConfigStore.getState().config, null, 2)
    copyToClipboard(json, () => {
      setCopyLabel('copied ✓')
      setTimeout(() => setCopyLabel('copy values'), 1300)
    })
  }

  const handleReset = () => {
    resetConfig()
    setResetKey((k) => k + 1)
  }

  // Suppress unused variable warning for DEFAULTS
  void DEFAULTS

  return (
    <>
      {/* Gear button */}
      <button
        className={`fixed top-[18px] right-[18px] z-[55] w-10 h-10 flex items-center justify-center text-prose bg-surface/[0.72] border border-surface2 rounded-[11px] cursor-pointer backdrop-blur-[10px] transition-[color,border-color,opacity,transform] duration-[180ms,180ms,200ms,200ms] hover:text-heading hover:border-[#54585c]${panelOpen ? ' opacity-0 scale-90 pointer-events-none' : ''}`}
        aria-label="Open scene controls"
        aria-expanded={panelOpen}
        title="Scene controls ( ` )"
        onClick={() => setOpen(true)}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          stroke="currentColor"
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <line x1="3" y1="5" x2="15" y2="5" />
          <circle cx="11.5" cy="5" r="2" fill="#2B2B2B" />
          <line x1="3" y1="9" x2="15" y2="9" />
          <circle cx="6" cy="9" r="2" fill="#2B2B2B" />
          <line x1="3" y1="13" x2="15" y2="13" />
          <circle cx="12" cy="13" r="2" fill="#2B2B2B" />
        </svg>
      </button>

      {/* Panel */}
      <aside
        id="panel"
        className={`fixed top-0 right-0 z-[60] w-[312px] max-w-[88vw] h-screen flex flex-col bg-[rgba(34,35,38,0.94)] border-l border-surface2 backdrop-blur-[16px] shadow-[-18px_0_50px_rgba(0,0,0,.4)] transition-transform duration-[320ms] ease-[cubic-bezier(.4,0,.2,1)]${panelOpen ? ' translate-x-0' : ' translate-x-full'}`}
        aria-hidden={!panelOpen}
        aria-label="Scene controls"
      >
        {/* Panel header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-surface2 shrink-0">
          <span className="font-mono text-[13px] text-heading tracking-[.04em]">scene_controls</span>
          <button
            className="font-mono text-[11px] text-muted border border-surface2 rounded-[6px] px-[9px] py-[4px] cursor-pointer bg-transparent hover:text-prose hover:border-[#54585c] transition-[color,border-color] duration-150"
            onClick={() => setOpen(false)}
            aria-label="Close controls"
          >
            esc
          </button>
        </div>

        {/* Panel body */}
        <div className="panel-scroll flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-5" key={resetKey}>
          {SCHEMA.map((g) => (
            <div key={g.group}>
              <div className="font-mono text-[11px] tracking-[.1em] uppercase text-muted mb-[10px]">{g.group}</div>
              <div className="flex flex-col gap-[10px]">
                {g.controls.map((c) => {
                  const val = getP(
                    useConfigStore.getState().config as unknown as Record<string, unknown>,
                    c.k,
                  ) as number | string

                  if (c.type === 'color') {
                    return (
                      <div className="flex items-center justify-between" key={c.k}>
                        <span className="font-mono text-[12px] text-prose">{c.label}</span>
                        <input
                          type="color"
                          defaultValue={val as string}
                          onChange={(e) => handleChange(c, e.target.value)}
                          className="w-7 h-7 rounded cursor-pointer border-0 bg-transparent"
                        />
                      </div>
                    )
                  }

                  return (
                    <div key={c.k}>
                      <div className="flex items-center justify-between mb-[5px]">
                        <span className="font-mono text-[12px] text-prose">{c.label}</span>
                        <span className="font-mono text-[12px] text-muted" id={`cv-${c.k.replace('.', '-')}`}>
                          {fmt(val as number, c.step)}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={c.min}
                        max={c.max}
                        step={c.step}
                        defaultValue={val as number}
                        onChange={(e) => {
                          handleChange(c, e.target.value)
                          const el = document.getElementById(`cv-${c.k.replace('.', '-')}`)
                          if (el) el.textContent = fmt(parseFloat(e.target.value), c.step)
                        }}
                        className="w-full accent-gold"
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Panel footer */}
        <div className="flex gap-[8px] px-5 py-4 border-t border-surface2 shrink-0">
          <button
            className="flex-1 font-mono text-[12px] text-prose bg-surface2/60 border border-surface2 rounded-[8px] px-3 py-[7px] cursor-pointer hover:text-heading hover:border-[#54585c] transition-[color,border-color] duration-150"
            onClick={handleCopy}
          >
            {copyLabel}
          </button>
          <button
            className="font-mono text-[12px] text-muted bg-transparent border border-surface2 rounded-[8px] px-3 py-[7px] cursor-pointer hover:text-prose hover:border-[#54585c] transition-[color,border-color] duration-150"
            onClick={handleReset}
          >
            reset
          </button>
        </div>
      </aside>
    </>
  )
}
