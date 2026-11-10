import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        fg: 'var(--fg)',
        muted: 'var(--muted)',
        border: 'var(--border)',
        rule: 'var(--rule)',
        accent: 'var(--accent)',
      },
      fontFamily: {
        newsreader: ['var(--font-newsreader)', 'serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
        geist: ['var(--font-geist-mono)', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      animation: {
        'blur-in': 'wordBlurIn 0.62s cubic-bezier(0.22, 0.61, 0.36, 1) forwards',
        'work-in': 'workIn 0.62s cubic-bezier(0.22, 0.61, 0.36, 1) forwards',
        'draw-in': 'drawIn 1.2s cubic-bezier(0.22, 0.61, 0.36, 1) forwards',
        'pulse-travel': 'pulseTravel 3s ease-in-out infinite',
      },
      keyframes: {
        wordBlurIn: {
          '0%': { filter: 'blur(5px)', transform: 'translateY(4px)', opacity: '0' },
          '100%': { filter: 'blur(0)', transform: 'translateY(0)', opacity: '1' },
        },
        workIn: {
          '0%': { filter: 'blur(3px)', opacity: '0', transform: 'translateY(8px)' },
          '100%': { filter: 'blur(0)', opacity: '1', transform: 'translateY(0)' },
        },
        drawIn: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
        pulseTravel: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.6' },
        },
      },
    },
  },
  plugins: [],
}
export default config