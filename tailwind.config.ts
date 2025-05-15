import aspectRatio from "@tailwindcss/aspect-ratio";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
		"./app/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				primary: "#2563eb", // Blue accent
				secondary: "#1e293b", // Dark background
				accent: "#facc15", // blue highlight
				muted: "#64748b", // Muted gray-blue
				background: "#f8fafc", // Light gray background
			},
			fontFamily: {
				sans: ["Inter", "sans-serif"],
				heading: ["Poppins", "sans-serif"],
			},
			boxShadow: {
				soft: "0 4px 6px rgba(0, 0, 0, 0.1)",
				strong: "0 8px 16px rgba(0, 0, 0, 0.2)",
			},
			borderRadius: {
				xl: "1rem",
				"2xl": "1.5rem",
			},
			container: {
				center: true,
				padding: "1.5rem",
			},
		},
	},
	plugins: [typography, forms, aspectRatio],
};

export default config;
