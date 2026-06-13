import { useEffect, useState } from 'react'
import ElkLogo from '../../atoms/ElkLogo'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) setActiveSection(en.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )

    ;['approach', 'work', 'about'].forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })

    return () => {
      window.removeEventListener('scroll', onScroll)
      obs.disconnect()
    }
  }, [])

  const navBase =
    'fixed top-[18px] left-1/2 -translate-x-1/2 z-40 flex items-center gap-7 py-[9px] pr-[9px] pl-[18px] rounded-full border backdrop-blur-[14px] transition-[background,box-shadow,border-color] duration-[250ms]'
  const navScrolled = scrolled
    ? 'bg-[rgba(34,35,38,0.82)] shadow-[0_10px_34px_rgba(0,0,0,.34)] border-[#494d4f]'
    : 'bg-[rgba(43,43,43,0.6)] border-surface2'

  return (
    <nav className={`${navBase} ${navScrolled}`} id="nav">
      <span className="flex items-center gap-[10px] font-mono text-[14px] text-heading tracking-[.04em]">
        <ElkLogo size={21} />
        elk
      </span>
      <span className="flex gap-[6px] max-[720px]:hidden">
        {(['approach', 'work', 'about'] as const).map((id) => (
          <a
            key={id}
            href={`#${id}`}
            className={`relative text-prose no-underline text-[13.5px] px-[11px] py-[5px] rounded-full transition-[color,background] duration-[180ms] hover:text-heading ${
              activeSection === id ? 'text-heading bg-surface2/50' : ''
            }`}
          >
            {id.charAt(0).toUpperCase() + id.slice(1)}
          </a>
        ))}
      </span>
    </nav>
  )
}
