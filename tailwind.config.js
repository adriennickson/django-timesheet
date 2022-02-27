module.exports = {
  content: [
    "./timesheet/**/*.{html,js,jsx}",
    "./dmz/**/*.{html,js,jsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
