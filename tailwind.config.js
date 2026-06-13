/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:        '#1E1F22',
        surface:   '#2B2B2B',
        surface2:  '#3C3F41',
        prose:     '#A9B7C6',
        muted:     '#808080',
        heading:   '#E8E8E2',
        gold:      '#FFC66D',
        sage:      '#6A8759',
        'sage-br': '#88B06E',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'serif'],
        sans:    ['"Hanken Grotesk"', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'ui-monospace', 'Menlo', 'monospace'],
      },
      backdropBlur: {
        '14': '14px',
      },
    },
  },
  plugins: [],
}
