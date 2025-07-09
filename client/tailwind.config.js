/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "pulse-float": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.08)" },
        },
        wave: {
          "0%, 100%": { transform: "scaleY(1)" },
          "50%": { transform: "scaleY(1.5)" },
        },
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        "float-pulse": "pulse-float 1.6s ease-in-out infinite",
        wave: "wave 1s ease-in-out infinite",
      },
      backdropFilter: {
        // Add this section
        none: "none",
        blur: "blur(20px)", // You can customize the blur amount
        // Add more blur values if needed, e.g., 'sm': 'blur(4px)', 'md': 'blur(12px)'
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"), // Example of another plugin
    require("@tailwindcss/forms"), // Example of another plugin
    require("tailwindcss-filters"),
  ],
};
