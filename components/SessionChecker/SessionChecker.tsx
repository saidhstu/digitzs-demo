"use client";

import { useSession } from "@/lib/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

interface SessionCheckerProps {
	children: React.ReactNode;
}

const SessionChecker: React.FC<SessionCheckerProps> = ({ children }) => {
	const router = useRouter();
	const { session, logout, isLoading } = useSession();

	useEffect(() => {
		const checkSessionValidity = () => {
			if (!isLoading && !session) {
				router.replace("/login");
				return;
			}

			// Check if session is expired
			const currentTime = Math.floor(Date.now() / 1000);

			if (session?.expires_at && currentTime >= session.expires_at) {
				// Session has expired
				logout();
				router.replace("/login");
				toast.error("Votre session a expiré. Veuillez vous reconnecter.");
			}
		};

		// Check session immediately and set up periodic checks
		checkSessionValidity();
		const intervalId = setInterval(checkSessionValidity, 60000); // Check every minute

		// Cleanup interval on component unmount
		return () => clearInterval(intervalId);
	}, [session, logout, router, isLoading]);

	// Show loading state while checking session
	if (!session) {
		return (
			<div className="flex justify-center items-center min-h-screen">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
			</div>
		);
	} else return <>{children}</>;
};

export default SessionChecker;
