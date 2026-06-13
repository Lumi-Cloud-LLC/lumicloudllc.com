export default function About() {
  return (
    <section className="py-24" id="about">
      <div className="font-mono text-[12px] tracking-[.14em] uppercase text-muted mb-4">// about</div>
      <div className="grid grid-cols-[1fr_1fr] gap-12 items-start max-[720px]:grid-cols-1">
        <div className="font-mono text-[12px] tracking-[.14em] uppercase text-muted">// the layer underneath</div>
        <p className="font-display text-[clamp(19px,2.4vw,25px)] leading-[1.5] text-prose max-w-[32ch]">
          We work on the layer underneath the product - the <b>language</b>, the{' '}
          <b>data structure</b>, the <b>build system</b>. The kind of work that doesn&rsquo;t demo
          well but decides whether everything on top holds up. If you have an idea that needs a
          foundation, that&rsquo;s the part I&rsquo;m good at.
        </p>
      </div>
    </section>
  )
}
