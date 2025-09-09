/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        scale: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' }
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'spin-reverse': {
          'to': { transform: 'rotate(-360deg)' }
        },
        'tweet-fly-in': {
          '0%': { transform: 'translateX(-100%) scale(0.8)', opacity: '0' },
          '50%': { transform: 'translateX(10px) scale(1.05)', opacity: '0.8' },
          '100%': { transform: 'translateX(0) scale(1)', opacity: '1' }
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(59, 130, 246, 0.8)' }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'typewriter': {
          '0%': { width: '0' },
          '100%': { width: '100%' }
        },
        'blink': {
          '0%, 50%': { borderColor: 'transparent' },
          '51%, 100%': { borderColor: 'rgb(59, 130, 246)' }
        },
        'ripple': {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '100%': { transform: 'scale(2)', opacity: '0' }
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out forwards',
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 2s ease-in-out infinite',
        'scale': 'scale 2s ease-in-out infinite',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'spin-reverse': 'spin-reverse 3s linear infinite',
        'tweet-fly-in': 'tweet-fly-in 1.2s ease-out',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'typewriter': 'typewriter 2s ease-out',
        'blink': 'blink 1s infinite',
        'ripple': 'ripple 2s ease-out infinite'
      }
    },
  },
  plugins: [],
};
