export default function WorkGraph() {
  return (
    <svg
      width="170"
      height="150"
      viewBox="0 0 170 150"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="block mb-4"
    >
      <path d="M48 52 L112 40" stroke="#5C5F61" fill="none" />
      <path d="M112 40 L132 96" stroke="#5C5F61" fill="none" />
      <path d="M48 52 L66 110" stroke="#5C5F61" fill="none" />
      <path d="M66 110 L98 124" stroke="#5C5F61" fill="none" />
      <path d="M132 96 L98 124" stroke="#5C5F61" fill="none" />
      <path d="M66 110 L132 96" stroke="#5C5F61" fill="none" />
      <circle cx="48" cy="52" r="13" fill="#242528" stroke="#7C7F81" />
      <circle cx="112" cy="40" r="13" fill="#242528" stroke="#7C7F81" />
      <circle cx="132" cy="96" r="13" fill="#242528" stroke="#7C7F81" />
      <circle cx="66" cy="110" r="13" fill="#242528" stroke="#7C7F81" />
      <circle cx="98" cy="124" r="14" fill="#2E3A2C" stroke="#6A8759" strokeWidth="1.6" />
    </svg>
  )
}
