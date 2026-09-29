/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        campus: {
          bg: "#FFFDFB",
          surface: "#FFFFFF",
          text: {
            primary: "#18181B",
            secondary: "#71717A",
            muted: "#A1A1AA",
          },
          border: "#E4E4E7",
          accent: {
            DEFAULT: "#E11D48",
            hover: "#BE123C",
            secondary: "#F97316",
            accent: "#F59E0B",
            light: "#FFE4E6",
            subtle: "#FFF1F2",
          },
          success: {
            DEFAULT: "#16A34A",
            light: "#DCFCE7",
            subtle: "#F0FDF4",
          },
          warning: {
            DEFAULT: "#D97706",
            light: "#FEF3C7",
            subtle: "#FFFBEB",
          },
          danger: {
            DEFAULT: "#DC2626",
            light: "#FEE2E2",
            subtle: "#FEF2F2",
          },
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },
      boxShadow: {
        subtle: '0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px -1px rgba(15, 23, 42, 0.05)',
        card: '0 4px 6px -1px rgba(15, 23, 42, 0.04), 0 2px 4px -2px rgba(15, 23, 42, 0.04)',
        elevated: '0 10px 15px -3px rgba(15, 23, 42, 0.06), 0 4px 6px -4px rgba(15, 23, 42, 0.06)',
      },
    },
  },
  plugins: [],
}
