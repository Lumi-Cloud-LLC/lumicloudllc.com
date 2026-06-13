import { useRef } from 'react'

export default function Contact() {
  const fromRef = useRef<HTMLInputElement>(null)
  const subjectRef = useRef<HTMLInputElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const from = encodeURIComponent(fromRef.current?.value.trim() ?? '')
    const subj = encodeURIComponent(subjectRef.current?.value.trim() || 'Project enquiry')
    const body = encodeURIComponent(
      (messageRef.current?.value.trim() ?? '') +
        '\n\n- ' +
        (fromRef.current?.value.trim() ?? ''),
    )
    window.location.href =
      'mailto:j@example.com?subject=' + subj + '&body=' + body + '%0A%0A(reply-to: ' + from + ')'
  }

  const inputClass =
    'font-sans text-[14.5px] text-heading bg-[rgba(30,31,34,0.7)] border border-surface2 rounded-[9px] px-[13px] py-[11px] transition-[border-color,box-shadow] focus:outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(255,198,109,.14)] w-full'

  return (
    <section className="py-24" id="contact">
      <div className="font-mono text-[12px] tracking-[.14em] uppercase text-muted mb-4">// contact</div>
      <div className="grid grid-cols-[1fr_1fr] gap-12 items-start max-[720px]:grid-cols-1">
        <div>
          <h2 className="font-display font-medium text-[clamp(27px,4vw,40px)] text-heading tracking-[-0.015em] mb-[28px] text-balance text-halo">
            Let&rsquo;s talk.
          </h2>
          <span className="flex items-center gap-[8px] font-mono text-[13px] text-sage-br mb-8">
            <span className="w-[7px] h-[7px] rounded-full bg-sage-br [animation:pulse_2.6s_ease-out_infinite]" />
            available for new work
          </span>
          <div className="flex flex-col gap-4">
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-[12px] text-muted w-[56px] shrink-0">Email</span>
              <a href="mailto:j@example.com" className="font-sans text-[14px] text-prose no-underline hover:text-heading transition-colors duration-150">
                j@example.com
              </a>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-[12px] text-muted w-[56px] shrink-0">GitHub</span>
              <a href="#" target="_blank" rel="noopener" className="font-sans text-[14px] text-prose no-underline hover:text-heading transition-colors duration-150">
                github.com/elk
              </a>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-[12px] text-muted w-[56px] shrink-0">Based</span>
              <span className="font-sans text-[14px] text-prose">Remote · UTC&minus;5 · working worldwide</span>
            </div>
          </div>
        </div>
        <form
          className="bg-surface/[0.62] border border-surface2 rounded-2xl p-[26px] backdrop-blur-[8px] flex flex-col gap-4"
          id="contactForm"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-[6px]">
            <label htmlFor="from" className="font-mono text-[12px] text-muted">From</label>
            <input
              type="email"
              id="from"
              name="from"
              ref={fromRef}
              placeholder="you@company.com"
              required
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-[6px]">
            <label htmlFor="subject" className="font-mono text-[12px] text-muted">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              ref={subjectRef}
              placeholder="What are you building?"
              required
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-[6px]">
            <label htmlFor="message" className="font-mono text-[12px] text-muted">Message</label>
            <textarea
              id="message"
              name="message"
              ref={messageRef}
              placeholder="A sentence or two about the idea, the system, or the problem."
              required
              className={`${inputClass} min-h-[120px] resize-y`}
            />
          </div>
          <button
            type="submit"
            className="font-mono text-[13px] font-medium text-[#3a2e12] bg-gold border-none px-4 py-[9px] rounded-full cursor-pointer no-underline transition-[transform,box-shadow] duration-150 hover:-translate-y-px hover:shadow-[0_6px_22px_rgba(255,198,109,.22)] whitespace-nowrap self-start"
          >
            Send message
          </button>
        </form>
      </div>
    </section>
  )
}
