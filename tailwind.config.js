/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        primary: 'var(--bg-primary)',
        secondary: 'var(--bg-secondary)',
        card: 'var(--bg-card)',
        accent: '#fbbf24',
        neon: 'var(--color-neon)',
        foreground: 'var(--text-foreground)',
        muted: 'var(--text-muted)',
      },
      backgroundImage: {
        'hero-gradient':
          'linear-gradient(to bottom right, var(--bg-primary), var(--bg-secondary))',
        glow: 'conic-gradient(from 180deg at 50% 50%, var(--color-neon) 0deg, #fbbf24 180deg, var(--color-neon) 360deg)',
      },
    },
  },
  plugins: [],
}
