import { useRef } from 'react'

/**
 * 3D tilt wrapper — card rotates toward the cursor with a moving glare.
 */
export default function Tilt({ children, className = '', max = 10, glare = true, as: Tag = 'div', ...rest }) {
  const ref = useRef(null)

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    el.style.setProperty('--rx', `${(0.5 - py) * max * 2}deg`)
    el.style.setProperty('--ry', `${(px - 0.5) * max * 2}deg`)
    el.style.setProperty('--gx', `${px * 100}%`)
    el.style.setProperty('--gy', `${py * 100}%`)
  }
  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }

  return (
    <Tag ref={ref} className={`tilt ${className}`} onPointerMove={onMove} onPointerLeave={onLeave} {...rest}>
      {children}
      {glare && <span className="tilt-glare" aria-hidden="true" />}
    </Tag>
  )
}
