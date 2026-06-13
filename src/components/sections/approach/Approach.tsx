import ApproachCard from './ApproachCard'
import IconPrototyping from './icons/IconPrototyping'
import IconValidation from './icons/IconValidation'
import IconDevTools from './icons/IconDevTools'

const CARDS = [
  {
    num: '01',
    icon: <IconPrototyping />,
    title: 'Idea prototyping',
    description: 'Pressure-test the concept fast with a working build, not a slide deck.',
  },
  {
    num: '02',
    icon: <IconValidation />,
    title: 'Software validation',
    description: 'Find what breaks before your users do - correctness, edge cases, load.',
  },
  {
    num: '03',
    icon: <IconDevTools />,
    title: 'Dev tools & systems',
    description: 'Languages, data structures, infrastructure - the unglamorous load-bearing parts.',
  },
]

export default function Approach() {
  return (
    <section className="py-24" id="approach">
      <div className="font-mono text-[12px] tracking-[.14em] uppercase text-muted mb-4">// What we do</div>
      <h2 className="font-display font-medium text-[clamp(27px,4vw,40px)] text-heading tracking-[-0.015em] mb-[42px] max-w-[20ch] text-balance text-halo">
        Three ways an idea becomes something real
      </h2>
      <div className="grid grid-cols-3 gap-[18px] max-[720px]:grid-cols-1">
        {CARDS.map((card) => (
          <ApproachCard key={card.num} {...card} />
        ))}
      </div>
    </section>
  )
}
