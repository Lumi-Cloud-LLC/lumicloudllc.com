// Module-level mutable mouse state - NOT React state to avoid re-renders
export const mouse = {
  clientX: 0,
  clientY: 0,
  ndx: -5,    // NDC x (-1..1) for raycasting
  ndy: -5,    // NDC y (-1..1) for raycasting
  px: 0,      // parallax offset (-0.5..0.5)
  py: 0,      // parallax offset (-0.5..0.5)
  active: false,
}

if (typeof window !== 'undefined') {
  window.addEventListener('mousemove', (e) => {
    mouse.clientX = e.clientX
    mouse.clientY = e.clientY
    mouse.ndx = (e.clientX / window.innerWidth) * 2 - 1
    mouse.ndy = -(e.clientY / window.innerHeight) * 2 + 1
    mouse.px = e.clientX / window.innerWidth - 0.5
    mouse.py = e.clientY / window.innerHeight - 0.5
    mouse.active = true
  })

  document.addEventListener('mouseleave', () => {
    mouse.active = false
  })
}
