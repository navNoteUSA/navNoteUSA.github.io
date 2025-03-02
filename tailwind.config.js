/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0A0F1D',      // Deep dark blue-black (more matte)
        secondary: '#3366CC',    // Professional blue (more solid)
        accent: '#00C896',       // Vibrant teal (for AI accents)
        dark: '#050914',         // Almost black matte
        light: '#FFFFFF',        // Pure white
        highlight: '#00E6FF',    // Bright cyan for interactive elements
        purple: '#6E3CBC',       // Deeper purple for accents
      },
      fontFamily: {
        sans: ['Roboto', 'Inter', 'sans-serif'], // Match app's Roboto font
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient': 'gradient 8s ease infinite',
        'hexagon-hover': 'hexagon-hover 3s ease-in-out infinite',
        'orbit': 'orbit 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'hexagon-hover': {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-5px) scale(1.05)' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(120px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(120px) rotate(-360deg)' },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': 'linear-gradient(to bottom right, rgba(10, 15, 29, 0.95), rgba(5, 9, 20, 0.98))',
        'hex-pattern': 'url("/hexagon-pattern.svg")',
      },
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(20px)',
      },
      borderRadius: {
        'hexagon': '24px',
      },
      boxShadow: {
        'blue-glow': '0 0 20px rgba(51, 102, 204, 0.4)',
        'green-glow': '0 0 20px rgba(0, 200, 150, 0.4)',
        'neo': '5px 5px 10px rgba(0, 0, 0, 0.3), -5px -5px 10px rgba(255, 255, 255, 0.05)',
      },
    },
  },
  plugins: [],
};