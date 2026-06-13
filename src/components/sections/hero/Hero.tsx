export default function Hero() {
  return (
    <header className="min-h-screen flex flex-col justify-center items-center text-center gap-[22px]" id="top">
      <span className="hero-eyebrow font-mono text-[13px] tracking-[.16em] uppercase text-sage-br transition-[opacity,transform] duration-700 ease-[ease]">
        // solo software studio
      </span>
      <h1 className="hero-h1 font-display font-bold text-[clamp(40px,7vw,78px)] leading-[1.01] text-heading tracking-[-0.025em] max-w-[14ch] text-balance text-halo transition-[opacity,transform] duration-700 ease-[ease] [transition-delay:100ms]">
        Software, built right.
      </h1>
      <p className="hero-p max-w-[50ch] text-[clamp(16px,2vw,19px)] text-prose text-halo transition-[opacity,transform] duration-700 ease-[ease] [transition-delay:200ms]">
        Idea prototyping, software validation, and the dev tools to ship it — built from the systems up by one engineer who owns the outcome.
      </p>
      <span className="hero-row flex gap-[14px] flex-wrap justify-center mt-[6px] transition-[opacity,transform] duration-700 ease-[ease] [transition-delay:300ms]">
        <a href="#work" className="inline-flex items-center gap-2 font-mono text-[13px] text-prose border border-surface2 px-[18px] py-[10px] rounded-full cursor-pointer no-underline transition-[border-color,color,transform] duration-150 hover:border-prose hover:text-heading hover:-translate-y-px">
          See the work <span aria-hidden="true">→</span>
        </a>
      </span>
      <span className="hero-meta font-mono text-[12px] tracking-[.04em] text-muted flex items-center gap-[10px] transition-[opacity,transform] duration-700 ease-[ease] [transition-delay:400ms]">
        <span className="w-[7px] h-[7px] rounded-full bg-sage-br [animation:pulse_2.6s_ease-out_infinite]" />
        available for new work · 2026
      </span>
    </header>
  )
}
