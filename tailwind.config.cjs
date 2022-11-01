// tailwind.config.js
module.exports = {
  mode: 'jit',
  content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        primary: '#5473e8'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
