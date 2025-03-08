/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "memo-green": "url('/src/assets/memo.png')",
      },
      fontFamily: {
        sans: ["Abordage", "system-ui", "sans-serif"],
        abordage: ["Abordage"],
      },
      keyframes: {
        fall: {
          "0%": {
            transform: "translateY(-20vh)",
            opacity: "0",
          },
          "10%": {
            opacity: "1",
          },
          "100%": {
            transform: "translateY(100vh)",
            opacity: "0",
          },
        },
      },
      animation: {
        fall: "fall linear infinite",
      },
    },
  },
  plugins: [],
};
