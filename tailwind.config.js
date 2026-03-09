module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        "jpc-blue": "#0046ad",
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        medical: {
          "primary": "#0046ad",
          "secondary": "#0d47a1",
          "accent": "#28a745",
          "neutral": "#1f2937",
          "base-100": "#ffffff",
          "info": "#3abff8",
          "success": "#36d399",
          "warning": "#fbbd23",
          "error": "#f87272",
        },
      },
    ],
  },
}
