import ElkLogo from '../../atoms/ElkLogo'

export default function Footer() {
  return (
    <footer className="py-10 border-t border-[rgba(60,63,65,0.5)] flex flex-row items-center justify-between flex-wrap gap-4">
      <span className="flex items-center gap-[8px] font-mono text-[14px] text-heading tracking-[.04em]">
        <ElkLogo size={19} />
        elk
      </span>
      <span className="flex gap-5">
        <a href="mailto:j@example.com" className="font-mono text-[13px] text-muted no-underline hover:text-prose transition-colors duration-150">email</a>
        <a href="#" target="_blank" rel="noopener" className="font-mono text-[13px] text-muted no-underline hover:text-prose transition-colors duration-150">
          github
        </a>
        <a href="#top" className="font-mono text-[13px] text-muted no-underline hover:text-prose transition-colors duration-150">back to top</a>
      </span>
      <small className="font-mono text-[11px] text-muted">
        &copy; 2026 [ELK / COMPANY NAME] — placeholder content. Press ` for scene controls.
      </small>
    </footer>
  )
}
