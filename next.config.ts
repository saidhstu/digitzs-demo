import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	// Example configuration options

	images: {
		domains: [
			"cdn-icons-png.freepik.com",
			"thumbor.forbes.com",
			"placehold.co",
			"www.etudify.ai",
			"cdn1.iconfinder.com",
			"www.iconpacks.net",
			"lh3.googleusercontent.com"
		], // Add the domain(s) you want to allow for images
	},
	// Other Next.js configuration options can go here
};

export default nextConfig;
