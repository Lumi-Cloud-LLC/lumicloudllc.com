interface ElkLogoProps {
  size?: number
}

export default function ElkLogo({ size = 21 }: ElkLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#E8E8E2"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9.5 13 C9.5 16 10.5 17.5 12 18.5 C13.5 17.5 14.5 16 14.5 13" />
      <path d="M9.5 13 C8.6 10.5 8.6 8 9 6" />
      <path d="M14.5 13 C15.4 10.5 15.4 8 15 6" />
      <path d="M9.15 9.2 C7 8.5 5.8 7 5 5" />
      <path d="M8.8 11 C7 11 5.6 10 4.6 8.6" />
      <path d="M14.85 9.2 C17 8.5 18.2 7 19 5" />
      <path d="M15.2 11 C17 11 18.4 10 19.4 8.6" />
      <path d="M9 6 L12 4 L15 6" />
    </svg>
  )
}
