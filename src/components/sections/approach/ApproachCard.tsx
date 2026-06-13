import { type ReactNode } from 'react'

interface ApproachCardProps {
  num: string
  icon: ReactNode
  title: string
  description: string
}

export default function ApproachCard({ num, icon, title, description }: ApproachCardProps) {
  return (
    <div className="relative bg-surface/[0.62] border border-surface2 rounded-[14px] p-6 backdrop-blur-[8px] transition-[transform,border-color,box-shadow] duration-200 ease-[ease] hover:-translate-y-[3px] hover:border-[#52565a] hover:shadow-[0_14px_40px_rgba(0,0,0,.3)]">
      <span className="absolute top-5 right-[22px] font-mono text-[12px] text-muted">{num}</span>
      {icon}
      <h3 className="font-mono font-medium text-[15px] text-heading mb-[9px] tracking-[.01em]">{title}</h3>
      <p className="text-[14px] text-prose">{description}</p>
    </div>
  )
}
