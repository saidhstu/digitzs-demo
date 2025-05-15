"use client";

import { useSession } from "@/lib/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface AuthLayoutProps {
	children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
	const router = useRouter();
	const { session, isLoading } = useSession();
	const [previousPath, setPreviousPath] = useState<string | null>(null);

	useEffect(() => {
		const checkSessionValidity = () => {
			// Check if session exists and we're on an auth page
			if (!isLoading && session) {
				// Determine the redirect destination
				let redirectPath = "/";

				// Try to get previous path from browser history
				if (window.history.state && window.history.state.previousPath) {
					redirectPath = window.history.state.previousPath;
				} else if (previousPath) {
					redirectPath = previousPath;
				}

				// Ensure we don't redirect to another auth page
				const authPages = ["/login", "/signup", "/reset-password"];
				if (authPages.includes(redirectPath)) {
					redirectPath = "/";
				}

				// Redirect to previous page or dashboard
				router.replace(redirectPath);

				// toast.success("You're already logged in");
			}
		};

		// Track previous path
		const handleRouteChange = () => {
			const currentPath = window.location.pathname;

			// Only set previous path if it's not an auth page
			const authPages = ["/login", "/signup", "/reset-password"];
			if (!authPages.includes(currentPath)) {
				// Use browser history state to store previous path
				window.history.replaceState(
					{ ...window.history.state, previousPath: currentPath },
					""
				);
				setPreviousPath(currentPath);
			}
		};

		// Add event listener for route changes
		window.addEventListener("popstate", handleRouteChange);

		// Check session immediately
		checkSessionValidity();

		// Cleanup
		return () => {
			window.removeEventListener("popstate", handleRouteChange);
		};
	}, [session, isLoading, router, previousPath]);

	// Show loading state while checking session
	if (!session && !isLoading) {
		return <>{children}</>;
	}
	return (
		<div className="flex justify-center items-center min-h-screen">
			<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
		</div>
	);
};

export default AuthLayout;
