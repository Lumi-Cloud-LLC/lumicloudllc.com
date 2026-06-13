import { useEffect, useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gridVert from './grid.vert?raw'
import gridFrag from './grid.frag?raw'
import { useConfigStore } from '../../store/config'
import { mouse } from '../../lib/mouse'

const S = 150
const SEG = 40
const GRID_Z = -60

function buildGridGeo(LINES: number): THREE.BufferGeometry {
  const step = (2 * S) / LINES
  const segStep = (2 * S) / SEG
  const pos: number[] = []

  // horizontal lines
  for (let li = 0; li <= LINES; li++) {
    const y = -S + li * step
    for (let s = 0; s < SEG; s++) {
      const x0 = -S + s * segStep
      const x1 = -S + (s + 1) * segStep
      pos.push(x0, y, 0, x1, y, 0)
    }
  }

  // vertical lines
  for (let li = 0; li <= LINES; li++) {
    const x = -S + li * step
    for (let s = 0; s < SEG; s++) {
      const y0 = -S + s * segStep
      const y1 = -S + (s + 1) * segStep
      pos.push(x, y0, 0, x, y1, 0)
    }
  }

  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
  return g
}

export function Grid() {
  const { scene, camera } = useThree()
  const density = useConfigStore((s) => s.config.grid.density)

  const matRef = useRef<THREE.ShaderMaterial | null>(null)
  const linesRef = useRef<THREE.LineSegments | null>(null)

  const rayRef = useRef(new THREE.Raycaster())
  const gplaneRef = useRef(new THREE.Plane(new THREE.Vector3(0, 0, 1), -GRID_Z))
  const hitPtRef = useRef(new THREE.Vector3())
  const ndcRef = useRef(new THREE.Vector2(-5, -5))

  // Create material once
  useEffect(() => {
    const mat = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        uMouse: { value: new THREE.Vector2(9999, 9999) },
        uTime: { value: 0 },
        uActive: { value: 0 },
        uFogColor: { value: new THREE.Color(0x1e1f22) },
        uFogDensity: { value: useConfigStore.getState().config.fog.density },
        uGlowR: { value: useConfigStore.getState().config.grid.glowR },
        uBulge: { value: useConfigStore.getState().config.grid.bulge },
        uWave: { value: useConfigStore.getState().config.grid.wave },
        uWave2: { value: useConfigStore.getState().config.grid.wave2 },
        uWave2Freq: { value: useConfigStore.getState().config.grid.wave2Freq },
        uBright: { value: useConfigStore.getState().config.grid.bright },
        uGlow: { value: new THREE.Color(useConfigStore.getState().config.grid.glow) },
      },
      vertexShader: gridVert,
      fragmentShader: gridFrag,
    })
    matRef.current = mat

    return () => {
      mat.dispose()
    }
  }, [])

  // Rebuild geometry + LineSegments when density changes
  useEffect(() => {
    if (!matRef.current) return

    // Remove old
    if (linesRef.current) {
      scene.remove(linesRef.current)
      linesRef.current.geometry.dispose()
      linesRef.current = null
    }

    const geo = buildGridGeo(density)
    const lines = new THREE.LineSegments(geo, matRef.current)
    lines.position.z = GRID_Z
    scene.add(lines)
    linesRef.current = lines

    return () => {
      if (linesRef.current) {
        scene.remove(linesRef.current)
        linesRef.current.geometry.dispose()
        linesRef.current = null
      }
    }
  }, [scene, density])

  useFrame(({ clock }) => {
    const mat = matRef.current
    if (!mat) return

    const cfg = useConfigStore.getState().config
    const t = clock.getElapsedTime()

    // Update all uniforms
    mat.uniforms.uTime.value = t
    mat.uniforms.uFogDensity.value = cfg.fog.density
    mat.uniforms.uGlowR.value = cfg.grid.glowR
    mat.uniforms.uBulge.value = cfg.grid.bulge
    mat.uniforms.uWave.value = cfg.grid.wave
    mat.uniforms.uWave2.value = cfg.grid.wave2
    mat.uniforms.uWave2Freq.value = cfg.grid.wave2Freq
    mat.uniforms.uBright.value = cfg.grid.bright
    mat.uniforms.uGlow.value.set(cfg.grid.glow)

    // Manual raycasting using NDC from mouse
    ndcRef.current.set(mouse.ndx, mouse.ndy)
    rayRef.current.setFromCamera(ndcRef.current, camera as THREE.PerspectiveCamera)

    const ez = cfg.grid.ease
    if (mouse.active && rayRef.current.ray.intersectPlane(gplaneRef.current, hitPtRef.current)) {
      mat.uniforms.uMouse.value.set(hitPtRef.current.x, hitPtRef.current.y)
      mat.uniforms.uActive.value += (1 - mat.uniforms.uActive.value) * ez
    } else {
      mat.uniforms.uActive.value += (0 - mat.uniforms.uActive.value) * (ez * 0.75)
    }
  })

  return null
}
