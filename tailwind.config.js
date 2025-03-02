/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2E3D62',      // Dark blue from app logo
        secondary: '#4D9DE0',    // Light blue from app logo
        accent: '#78C091',       // Green from app logo
        dark: '#0A1128',         // Deep dark blue
        light: '#FFFFFF',        // White
        highlight: '#00F0FF',    // Cyan highlight for interactive elements
        purple: '#B026FF',       // Purple for accents
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
        'hero-pattern': 'linear-gradient(to bottom right, rgba(46, 61, 98, 0.9), rgba(10, 17, 40, 0.95))',
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
        'blue-glow': '0 0 20px rgba(77, 157, 224, 0.5)',
        'green-glow': '0 0 20px rgba(120, 192, 145, 0.5)',
        'neo': '5px 5px 10px rgba(0, 0, 0, 0.3), -5px -5px 10px rgba(255, 255, 255, 0.05)',
      },
    },
  },
  plugins: [],
};