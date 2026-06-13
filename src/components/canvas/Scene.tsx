import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useRef } from 'react'
import { useConfigStore } from '../../store/config'
import { mouse } from '../../lib/mouse'
import { Grid } from './Grid'
import Polyhedra from './Polyhedra'

function FogController() {
  const density = useConfigStore((s) => s.config.fog.density)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return <fogExp2 attach="fog" color={0x1e1f22} density={density} />
}

function CameraController() {
  const stateRef = useRef({ cx: 0, cy: 0 })

  useFrame(({ camera }) => {
    const cfg = useConfigStore.getState().config
    const P = cfg.camera.parallax
    const s = stateRef.current

    s.cx += (mouse.px - s.cx) * 0.05
    s.cy += (mouse.py - s.cy) * 0.05

    camera.position.x = s.cx * 22 * P
    camera.position.y = -s.cy * 14 * P
    ;(camera as THREE.PerspectiveCamera).lookAt(0, 0, -10)
  })

  return null
}

export default function Scene() {
  return (
    <Canvas
      style={{ position: 'fixed', inset: 0, zIndex: 0, display: 'block' }}
      camera={{ position: [0, 0, 64], fov: 60, near: 0.1, far: 600 }}
      gl={{ antialias: true, alpha: false }}
      dpr={[1, 2]}
      events={undefined}
      onCreated={({ gl }) => {
        gl.setClearColor(0x1e1f22, 1)
      }}
    >
      <FogController />
      <CameraController />
      <Grid />
      <Polyhedra />
    </Canvas>
  )
}
