import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Float, Lightformer } from '@react-three/drei'
import * as THREE from 'three'

/* ───────────── helpers ───────────── */

const rand = (a, b) => a + Math.random() * (b - a)

function useLatteArt() {
  return useMemo(() => {
    const c = document.createElement('canvas')
    c.width = c.height = 512
    const g = c.getContext('2d')
    const grd = g.createRadialGradient(256, 256, 20, 256, 256, 256)
    grd.addColorStop(0, '#6b4226')
    grd.addColorStop(0.7, '#4a2b17')
    grd.addColorStop(1, '#2a160a')
    g.fillStyle = grd
    g.fillRect(0, 0, 512, 512)
    // rosetta / leaf pour
    g.fillStyle = '#f1dfc4'
    for (let i = 0; i < 7; i++) {
      const y = 360 - i * 36
      const w = 150 - i * 15
      g.globalAlpha = 0.95
      g.beginPath()
      g.ellipse(256, y, w, 22, 0, 0, Math.PI * 2)
      g.fill()
    }
    g.globalAlpha = 1
    g.strokeStyle = '#3b2010'
    g.lineWidth = 7
    g.lineCap = 'round'
    g.beginPath()
    g.moveTo(256, 400)
    g.lineTo(256, 118)
    g.stroke()
    g.fillStyle = '#f1dfc4'
    g.beginPath()
    g.arc(256, 400, 16, 0, Math.PI * 2)
    g.fill()
    const t = new THREE.CanvasTexture(c)
    t.colorSpace = THREE.SRGBColorSpace
    t.anisotropy = 8
    return t
  }, [])
}

function useSoftSprite() {
  return useMemo(() => {
    const c = document.createElement('canvas')
    c.width = c.height = 128
    const g = c.getContext('2d')
    const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64)
    grd.addColorStop(0, 'rgba(255,255,255,0.9)')
    grd.addColorStop(0.4, 'rgba(255,255,255,0.35)')
    grd.addColorStop(1, 'rgba(255,255,255,0)')
    g.fillStyle = grd
    g.fillRect(0, 0, 128, 128)
    return new THREE.CanvasTexture(c)
  }, [])
}

/* ───────────── cup ───────────── */

function Cup() {
  const art = useLatteArt()

  const cupGeo = useMemo(() => {
    const outer = new THREE.SplineCurve([
      new THREE.Vector2(0.0, 0.0),
      new THREE.Vector2(0.42, 0.0),
      new THREE.Vector2(0.52, 0.06),
      new THREE.Vector2(0.78, 0.4),
      new THREE.Vector2(0.97, 0.95),
      new THREE.Vector2(1.0, 1.08),
    ]).getPoints(36)
    const inner = new THREE.SplineCurve([
      new THREE.Vector2(0.94, 1.08),
      new THREE.Vector2(0.9, 0.95),
      new THREE.Vector2(0.72, 0.42),
      new THREE.Vector2(0.4, 0.16),
      new THREE.Vector2(0.0, 0.14),
    ]).getPoints(30)
    return new THREE.LatheGeometry([...outer, new THREE.Vector2(0.97, 1.1), ...inner], 96)
  }, [])

  const saucerGeo = useMemo(() => {
    const pts = new THREE.SplineCurve([
      new THREE.Vector2(0, 0),
      new THREE.Vector2(0.95, 0),
      new THREE.Vector2(1.5, 0.08),
      new THREE.Vector2(1.82, 0.24),
      new THREE.Vector2(1.86, 0.3),
      new THREE.Vector2(1.78, 0.3),
      new THREE.Vector2(1.45, 0.17),
      new THREE.Vector2(0.95, 0.1),
      new THREE.Vector2(0, 0.1),
    ]).getPoints(60)
    return new THREE.LatheGeometry(pts, 96)
  }, [])

  const ceramic = {
    color: '#f6f1ea',
    roughness: 0.18,
    metalness: 0.0,
    clearcoat: 1,
    clearcoatRoughness: 0.08,
    envMapIntensity: 1.1,
  }

  return (
    <group position={[0, -0.9, 0]} rotation={[0.12, 0, 0]}>
      {/* saucer */}
      <mesh geometry={saucerGeo}>
        <meshPhysicalMaterial {...ceramic} side={THREE.DoubleSide} />
      </mesh>
      {/* gold ring on saucer */}
      <mesh position={[0, 0.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.8, 0.012, 12, 128]} />
        <meshStandardMaterial color="#d4af69" metalness={1} roughness={0.25} />
      </mesh>
      {/* cup */}
      <group position={[0, 0.12, 0]}>
        <mesh geometry={cupGeo}>
          <meshPhysicalMaterial {...ceramic} side={THREE.DoubleSide} />
        </mesh>
        {/* gold rim */}
        <mesh position={[0, 1.095, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.975, 0.016, 12, 128]} />
          <meshStandardMaterial color="#d4af69" metalness={1} roughness={0.22} />
        </mesh>
        {/* handle */}
        <mesh position={[0.93, 0.66, 0]} rotation={[0, 0, -Math.PI / 2 - 0.12]}>
          <torusGeometry args={[0.34, 0.075, 20, 48, Math.PI * 1.1]} />
          <meshPhysicalMaterial {...ceramic} />
        </mesh>
        {/* coffee surface with latte art */}
        <mesh position={[0, 0.93, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.86, 64]} />
          <meshPhysicalMaterial map={art} roughness={0.28} clearcoat={0.6} clearcoatRoughness={0.25} />
        </mesh>
      </group>
    </group>
  )
}

/* ───────────── steam ───────────── */

function Steam() {
  const tex = useSoftSprite()
  const refs = useRef([])
  const puffs = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        seed: Math.random() * 10,
        offset: i / 16,
        x: rand(-0.28, 0.28),
        z: rand(-0.2, 0.2),
        s: rand(0.7, 1.2),
      })),
    []
  )
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    puffs.forEach((p, i) => {
      const m = refs.current[i]
      if (!m) return
      const life = (t * 0.16 + p.offset) % 1
      m.position.set(
        p.x + Math.sin(t * 0.8 + p.seed + life * 5) * 0.2 * life,
        0.35 + life * 2.4,
        p.z + Math.cos(t * 0.6 + p.seed) * 0.1
      )
      const sc = (0.5 + life * 1.5) * p.s
      m.scale.set(sc, sc, 1)
      m.material.opacity = Math.sin(life * Math.PI) * 0.1
    })
  })
  return (
    <group position={[0, 0.1, 0]}>
      {puffs.map((_, i) => (
        <sprite key={i} ref={(el) => (refs.current[i] = el)}>
          <spriteMaterial map={tex} transparent depthWrite={false} color="#fff3df" />
        </sprite>
      ))}
    </group>
  )
}

/* ───────────── beans ───────────── */

function Bean({ scale = 1, color = '#3a2214' }) {
  const groove = useMemo(() => {
    const pts = []
    for (let i = 0; i <= 28; i++) {
      const x = -0.86 + (i / 28) * 1.72
      const y = 0.09 * Math.sin(x * 3.4)
      const inside = 1 - x * x - (y / 0.62) ** 2
      const z = 0.45 * Math.sqrt(Math.max(inside, 0)) + 0.004
      pts.push(new THREE.Vector3(x, y, z))
    }
    return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 40, 0.028, 8, false)
  }, [])
  return (
    <group scale={scale}>
      <mesh scale={[1, 0.62, 0.45]}>
        <sphereGeometry args={[1, 40, 28]} />
        <meshPhysicalMaterial color={color} roughness={0.35} clearcoat={0.6} clearcoatRoughness={0.3} />
      </mesh>
      <mesh geometry={groove}>
        <meshStandardMaterial color="#120a05" roughness={0.9} />
      </mesh>
    </group>
  )
}

function BeanCloud() {
  const beans = useMemo(
    () =>
      Array.from({ length: 26 }, () => {
        const a = rand(0, Math.PI * 2)
        const r = rand(2.6, 6.4)
        return {
          pos: [Math.cos(a) * r, rand(-2.6, 2.8), Math.sin(a) * r * 0.55 - rand(0, 2.5)],
          rot: [rand(0, 6), rand(0, 6), rand(0, 6)],
          scale: rand(0.16, 0.42),
          speed: rand(0.6, 1.6),
          color: Math.random() > 0.8 ? '#5a3720' : '#3a2214',
        }
      }),
    []
  )
  return (
    <>
      {beans.map((b, i) => (
        <Float key={i} speed={b.speed} rotationIntensity={1.6} floatIntensity={1.4}>
          <group position={b.pos} rotation={b.rot}>
            <Bean scale={b.scale} color={b.color} />
          </group>
        </Float>
      ))}
    </>
  )
}

/* ───────────── gold dust ───────────── */

function GoldDust() {
  const ref = useRef()
  const geo = useMemo(() => {
    const n = 260
    const arr = new Float32Array(n * 3)
    for (let i = 0; i < n; i++) {
      arr[i * 3] = rand(-8, 8)
      arr[i * 3 + 1] = rand(-4, 4)
      arr[i * 3 + 2] = rand(-6, 3)
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(arr, 3))
    return g
  }, [])
  const tex = useSoftSprite()
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.02
  })
  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        map={tex}
        color="#e8c47a"
        size={0.07}
        transparent
        opacity={0.75}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/* ───────────── rig (parallax + scroll) ───────────── */

function Rig({ scrollRef }) {
  const group = useRef()
  const cupGroup = useRef()
  const { size } = useThree()
  const mouse = useRef({ x: 0, y: 0 })

  useMemo(() => {
    if (typeof window === 'undefined') return
    window.addEventListener('pointermove', (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1
    })
  }, [])

  const isMobile = size.width < 800

  useFrame(({ clock }, dt) => {
    const t = clock.getElapsedTime()
    const s = scrollRef.current || 0
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, mouse.current.x * 0.18, 0.04)
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, mouse.current.y * 0.08, 0.04)
      group.current.position.y = s * 2.2
    }
    if (cupGroup.current) {
      cupGroup.current.rotation.y = t * 0.28 + s * 3.2
      cupGroup.current.position.y = Math.sin(t * 0.9) * 0.08
    }
  })

  return (
    <group ref={group}>
      <group ref={cupGroup} position={[isMobile ? 0 : 2.35, isMobile ? 0.5 : 0.1, 0]} scale={isMobile ? 0.62 : 0.82}>
        <Cup />
        <Steam />
      </group>
      <BeanCloud />
      <GoldDust />
    </group>
  )
}

/* ───────────── scene ───────────── */

export default function Scene3D({ scrollRef }) {
  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 2.4, 8.2], fov: 38 }}
      onCreated={({ camera }) => camera.lookAt(0, -0.1, 0)}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <fog attach="fog" args={['#0a0706', 9, 17]} />
      <ambientLight intensity={0.25} />
      <spotLight position={[-5, 6, 5]} angle={0.5} penumbra={1} intensity={110} color="#ffd9a0" />
      <pointLight position={[5, 1, 3]} intensity={30} color="#d4af69" />
      <pointLight position={[0, -3, 4]} intensity={8} color="#8a5a34" />

      <Environment resolution={256}>
        <Lightformer form="rect" intensity={3.2} color="#ffe2b8" position={[0, 5, -4]} scale={[12, 3, 1]} />
        <Lightformer form="rect" intensity={2.2} color="#d4af69" position={[-6, 1, 2]} scale={[2, 8, 1]} />
        <Lightformer form="rect" intensity={1.6} color="#fff" position={[6, 2, 4]} scale={[2, 6, 1]} />
        <Lightformer form="ring" intensity={2} color="#ffd9a0" position={[0, 0, 6]} scale={4} />
      </Environment>

      <Rig scrollRef={scrollRef} />
    </Canvas>
  )
}
