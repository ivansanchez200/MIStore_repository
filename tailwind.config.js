/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#07070A",
        panel: "#101014",
        panel2: "#18181D",
        line: "rgba(255,255,255,0.07)",
        ink: "#FFFFFF",
        mute: "#8A8A93",
        mute2: "#54545E",
        // Acentos cálidos lunares (inspirados en la imagen)
        moonWarm: "#E8D5B0",
        moonAmber: "#C9A86A",
        moonGlow: "#F0E0C2",
        moonDeep: "#8B7355",
        moonRust: "#A0724A",
      },
      fontFamily: {
        sans: ["Inter", "Helvetica Neue", "Arial", "sans-serif"],
      },
      letterSpacing: {
        wide3: "0.2em",
        wide4: "0.32em",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        lineGrow: {
          "0%": { scaleX: "0", transformOrigin: "left" },
          "100%": { scaleX: "1", transformOrigin: "left" },
        },
        drift: {
          "0%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(30px, -20px) scale(1.1)" },
          "100%": { transform: "translate(0, 0) scale(1)" },
        },
        driftSlow: {
          "0%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(-40px, 30px) scale(1.15)" },
          "100%": { transform: "translate(0, 0) scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        sweep: {
          "0%": { transform: "translateX(-100%) skewX(-12deg)" },
          "100%": { transform: "translateX(200%) skewX(-12deg)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 1s cubic-bezier(0.16,1,0.3,1) both",
        fadeIn: "fadeIn 1.2s ease both",
        lineGrow: "lineGrow 1s cubic-bezier(0.16,1,0.3,1) both",
        drift: "drift 18s ease-in-out infinite",
        driftSlow: "driftSlow 24s ease-in-out infinite",
        shimmer: "shimmer 8s linear infinite",
        pulseGlow: "pulseGlow 4s ease-in-out infinite",
        sweep: "sweep 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
