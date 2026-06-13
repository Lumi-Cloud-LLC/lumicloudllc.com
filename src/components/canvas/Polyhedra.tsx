import { useEffect, useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useConfigStore } from '../../store/config'

const BX = 70
const BY = 44
const BZ = 46

const makers: Array<(r: number) => THREE.BufferGeometry> = [
  (r) => new THREE.IcosahedronGeometry(r),
  (r) => new THREE.OctahedronGeometry(r),
  (r) => new THREE.TetrahedronGeometry(r),
  (r) => new THREE.DodecahedronGeometry(r),
  (r) => new THREE.BoxGeometry(r * 1.4, r * 1.4, r * 1.4),
]

interface ShapeUserData {
  rx: number
  ry: number
  rz: number
  vx: number
  vy: number
  vz: number
  ph: number
  hue: number
  rnd: number
}

function fade1(v: number, lim: number, fadeMargin: number): number {
  return Math.min(1, (lim - Math.abs(v)) / fadeMargin)
}

export default function Polyhedra() {
  const { scene } = useThree()
  const count = useConfigStore((s) => s.config.shapes.count)

  const groupRef = useRef<THREE.Group | null>(null)
  const shapesRef = useRef<THREE.LineSegments[]>([])
  const lastScrollYRef = useRef(0)
  const smoothVelRef = useRef(0)
  const boostRef = useRef(1)
  const reduceMotionRef = useRef(false)

  useEffect(() => {
    reduceMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  // Create group once
  useEffect(() => {
    const group = new THREE.Group()
    scene.add(group)
    groupRef.current = group

    return () => {
      scene.remove(group)
      groupRef.current = null
    }
  }, [scene])

  // Rebuild shapes when count changes
  useEffect(() => {
    const group = groupRef.current
    if (!group) return

    // Dispose old shapes
    for (const m of shapesRef.current) {
      group.remove(m)
      m.geometry.dispose()
      ;(m.material as THREE.Material).dispose()
    }
    shapesRef.current = []

    const n = count
    for (let i = 0; i < n; i++) {
      const r = 2.6 + Math.random() * 4.4
      const baseGeo = makers[i % makers.length](r)
      const geo = new THREE.EdgesGeometry(baseGeo)
      baseGeo.dispose()
      const mat = new THREE.LineBasicMaterial({ transparent: true, opacity: 0.5, fog: true })
      const m = new THREE.LineSegments(geo, mat)
      m.position.set(
        (Math.random() - 0.5) * BX * 2,
        (Math.random() - 0.5) * BY * 2,
        (Math.random() - 0.5) * BZ * 2 - 8,
      )
      const ud: ShapeUserData = {
        rx: (Math.random() - 0.5) * 0.006,
        ry: (Math.random() - 0.5) * 0.006,
        rz: (Math.random() - 0.5) * 0.004,
        vx: (Math.random() - 0.5) * 0.05,
        vy: (Math.random() - 0.5) * 0.05,
        vz: (Math.random() - 0.5) * 0.03,
        ph: Math.random() * Math.PI * 2,
        hue: Math.random(),
        rnd: Math.random(),
      }
      m.userData = ud
      group.add(m)
      shapesRef.current.push(m)
    }

    return () => {
      for (const m of shapesRef.current) {
        group.remove(m)
        m.geometry.dispose()
        ;(m.material as THREE.Material).dispose()
      }
      shapesRef.current = []
    }
  }, [count])

  useFrame(({ clock }) => {
    const cfg = useConfigStore.getState().config
    const t = clock.getElapsedTime()

    // Scroll-velocity boost — always accelerates (abs), never reverses drift
    const scrollY = window.scrollY ?? 0
    const rawDelta = Math.abs(scrollY - lastScrollYRef.current)
    lastScrollYRef.current = scrollY
    if (!reduceMotionRef.current) {
      const { scrollK, scrollMax, scrollEase } = cfg.shapes
      // Stage 1: smooth the raw per-frame delta to kill jitter
      smoothVelRef.current += (rawDelta - smoothVelRef.current) * 0.2
      // Stage 2: ease the boost toward the smoothed target
      const target = 1 + Math.min(smoothVelRef.current * scrollK, scrollMax)
      boostRef.current += (target - boostRef.current) * scrollEase
    } else {
      smoothVelRef.current = 0
      boostRef.current = 1
    }
    const boost = boostRef.current

    const { drift, rot, pulse, fade: fadeMargin, brightPct } = cfg.shapes
    const { speed: hueSp, sat: hueSat, lit: hueLit } = cfg.hue

    for (const m of shapesRef.current) {
      const u = m.userData as ShapeUserData
      m.rotation.x += u.rx * rot
      m.rotation.y += u.ry * rot
      m.rotation.z += u.rz * rot
      m.position.x += u.vx * drift * boost
      m.position.y += u.vy * drift * boost
      m.position.z += u.vz * drift * boost

      // Hard wrap at boundaries
      if (m.position.x > BX) m.position.x = -BX
      else if (m.position.x < -BX) m.position.x = BX
      if (m.position.y > BY) m.position.y = -BY
      else if (m.position.y < -BY) m.position.y = BY
      if (m.position.z > BZ) m.position.z = -BZ
      else if (m.position.z < -BZ) m.position.z = BZ

      m.scale.setScalar(1 + pulse * Math.sin(t * 0.9 + u.ph))

      const bright = u.rnd < brightPct
      const sat = hueSat + (bright ? 0.09 : 0)
      const lit = hueLit + (bright ? 0.04 : 0)
      const baseOp = bright ? 0.82 : 0.5

      const mat = m.material as THREE.LineBasicMaterial
      mat.color.setHSL(((u.hue + t * hueSp) % 1 + 1) % 1, sat, lit)

      const fd = Math.max(
        0,
        Math.min(
          fade1(m.position.x, BX, fadeMargin),
          fade1(m.position.y, BY, fadeMargin),
          fade1(m.position.z, BZ, fadeMargin),
        ),
      )
      mat.opacity = baseOp * fd
    }
  })

  return null
}
