"use server";
import Logo from "@/public/logo";
import { Chrome } from "lucide-react";
import Link from "next/link";

// Navigation items array
const navItems = [
	{ label: "Extension Chrome", href: "#how-it-works", icon: Chrome },
	{ label: "Comment ça fonctionne", href: "#how-it-works" },
	{ label: "Avis", href: "#reviews" },
	{ label: "Centre d'assistance.", href: "#help-center" },
];

const Navbar = async () => {

	// CTA buttons array

	return (
		<nav className="w-full bg-white shadow-soft border-b border-gray-200">
			<div className="container mx-auto flex items-center justify-between py-4 px-4">
				{/* Logo and Brand */}
				<div className="flex items-center">
					<Logo />
				</div>

				{/* Navigation Links - Center */}
				<div className="hidden md:flex items-center space-x-1">
					{navItems.map(
						({ label, href, icon: Icon }, index: number) => (
							<Link
								key={index}
								href={href}
								className="group flex items-center gap-1 px-4 py-2 rounded-md text-secondary font-medium transition duration-200 hover:bg-gray-200 hover:text-primary">
								{Icon && (
									<Icon className="h-4 w-4 group-hover:text-primary transition duration-200" />
								)}
								<span>{label}</span>
							</Link>
						)
					)}
				</div>

			</div>
		</nav>
	);
};

export default Navbar;
