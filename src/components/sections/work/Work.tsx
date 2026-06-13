import WorkGraph from './WorkGraph'

export default function Work() {
  return (
    <section className="py-24" id="work">
      <div className="font-mono text-[12px] tracking-[.14em] uppercase text-muted mb-4">// selected work</div>
      <h2 className="font-display font-medium text-[clamp(27px,4vw,40px)] text-heading tracking-[-0.015em] mb-[42px] max-w-[20ch] text-balance text-halo">
        A few systems, drawn abstractly.
      </h2>
      <div className="grid grid-cols-[1fr_1fr] grid-rows-[auto_auto] gap-[18px] max-[720px]:grid-cols-1">
        <article className="relative bg-surface/[0.62] border border-surface2 rounded-2xl p-[30px] backdrop-blur-[8px] transition-[transform,border-color,box-shadow] duration-200 ease-[ease] hover:-translate-y-[3px] hover:border-[#52565a] hover:shadow-[0_14px_40px_rgba(0,0,0,.3)] row-span-2">
          <WorkGraph />
          <div className="font-mono text-[11px] tracking-[.12em] uppercase text-sage-br mb-2">interpreter</div>
          <h3 className="font-display font-medium text-[17px] text-heading mb-[9px]">A language, from scratch</h3>
          <p className="text-[14px] text-prose mb-4">
            Lexer, parser, and a tree-walking interpreter — built to understand how languages really
            work, end to end.
          </p>
          <div className="flex flex-wrap gap-[6px] mb-4">
            {['lexer', 'parser', 'interpreter'].map((tag) => (
              <span key={tag} className="font-mono text-[11px] text-muted bg-surface2/60 border border-surface2 rounded-full px-[10px] py-[3px]">
                {tag}
              </span>
            ))}
          </div>
          <span className="absolute top-[26px] right-[26px] text-[18px] text-muted" aria-hidden="true">↗</span>
        </article>

        <article className="relative bg-surface/[0.62] border border-surface2 rounded-2xl p-[26px] backdrop-blur-[8px] transition-[transform,border-color,box-shadow] duration-200 ease-[ease] hover:-translate-y-[3px] hover:border-[#52565a] hover:shadow-[0_14px_40px_rgba(0,0,0,.3)]">
          <div className="font-mono text-[11px] tracking-[.12em] uppercase text-sage-br mb-2">data structure</div>
          <h3 className="font-display font-medium text-[17px] text-heading mb-[9px]">Persistent data structure</h3>
          <p className="text-[14px] text-prose mb-4">
            A versioned map combining hash tables and prefix tries, with structural sharing across
            every edit.
          </p>
          <div className="flex flex-wrap gap-[6px] mb-4">
            {['hashing', 'tries', 'immutability'].map((tag) => (
              <span key={tag} className="font-mono text-[11px] text-muted bg-surface2/60 border border-surface2 rounded-full px-[10px] py-[3px]">
                {tag}
              </span>
            ))}
          </div>
          <span className="absolute top-[22px] right-[22px] text-[18px] text-muted" aria-hidden="true">↗</span>
        </article>

        <article className="relative bg-surface/[0.62] border border-surface2 rounded-2xl p-[26px] backdrop-blur-[8px] transition-[transform,border-color,box-shadow] duration-200 ease-[ease] hover:-translate-y-[3px] hover:border-[#52565a] hover:shadow-[0_14px_40px_rgba(0,0,0,.3)]">
          <div className="font-mono text-[11px] tracking-[.12em] uppercase text-sage-br mb-2">observability</div>
          <h3 className="font-display font-medium text-[17px] text-heading mb-[9px]">Systems dashboard</h3>
          <p className="text-[14px] text-prose mb-4">
            A live view of system resources with queryable logs — from metrics collection through to
            the UI.
          </p>
          <div className="flex flex-wrap gap-[6px] mb-4">
            {['metrics', 'logs', 'ui'].map((tag) => (
              <span key={tag} className="font-mono text-[11px] text-muted bg-surface2/60 border border-surface2 rounded-full px-[10px] py-[3px]">
                {tag}
              </span>
            ))}
          </div>
          <span className="absolute top-[22px] right-[22px] text-[18px] text-muted" aria-hidden="true">↗</span>
        </article>
      </div>
    </section>
  )
}
