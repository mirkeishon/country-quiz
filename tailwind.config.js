module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      Montserrat: ['Montserrat', 'sans-serif'],
      Poppins: ['Poppins', 'sans-serif']
    },
    backgroundImage:{
      'country': 'url("/src/assets/background.png")'
    }
  },
  plugins: [],
}
