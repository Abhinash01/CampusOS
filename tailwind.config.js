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
          bg: "#F8FAFC",
          surface: "#FFFFFF",
          text: {
            primary: "#0F172A",
            secondary: "#64748B",
            muted: "#94A3B8",
          },
          border: "#E2E8F0",
          accent: {
            DEFAULT: "#4F46E5",
            hover: "#4338CA",
            light: "#EEF2FF",
            subtle: "#E0E7FF",
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
