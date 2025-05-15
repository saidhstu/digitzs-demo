/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Session, User } from "@supabase/supabase-js";
import React, {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { toast } from "react-hot-toast";
import { createClient } from "../supabase/client";

// Define interfaces for login and signup credentials
interface LoginCredentials {
	email: string;
	password: string;
}

interface SignupCredentials extends LoginCredentials {
	firstName?: string;
	lastName?: string;
}

// Define the shape of the session context
interface SessionContextType {
	session: Session | null;
	user: User | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	isPostLoading: boolean;
	resetPassword: (email: string) => Promise<{ success: boolean }>;
	updatePassword: ({ password, token }: { password: string; token: string }) => Promise<{ success: boolean }>;
	// Authentication methods
	loginWithEmail: (
		credentials: LoginCredentials
	) => Promise<{ success: boolean; error?: string }>;
	loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
	signup: (
		credentials: SignupCredentials
	) => Promise<{ success: boolean; error?: string }>;
	logout: () => Promise<void>;

	// Additional utility methods
	refreshSession: () => Promise<void>;
}

// Create the session context
const SessionContext = createContext<SessionContextType>({
	session: null,
	user: null,
	isAuthenticated: false,
	isLoading: true,
	isPostLoading: false,
	loginWithEmail: async () => ({ success: false }),
	loginWithGoogle: async () => ({ success: false }),
	signup: async () => ({ success: false }),
	logout: async () => {},
	refreshSession: async () => {},
	resetPassword:async () => ({ success: false }),
	updatePassword:async () => ({ success: false })
});

// Session Provider Component
export const SessionProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [session, setSession] = useState<Session | null>(null);
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isPostLoading, setIsPostLoading] = useState<boolean>(false);
	const supabase = createClient();
	
	// Login with Email
	const loginWithEmail = async ({ email, password }: LoginCredentials) => {
		setIsPostLoading(true);
		try {
			const { error } = await supabase.auth.signInWithPassword({
				email,
				password,
			});

			if (error) {
				toast.error(error.message || "Login failed");
				return { success: false, error: error.message };
			}

		
			return { success: true };
		} catch (err: any) {
			toast.error(err.message || "An unexpected error occurred");
			return { success: false, error: err.message };
		} finally {
			setIsPostLoading(false);
		}
	};

	// Login with Google
	const loginWithGoogle = async () => {
		setIsLoading(true);
		try {
		  const { data, error } = await supabase.auth.signInWithOAuth({
			provider: "google",
			options: {
			  redirectTo: `${window.location.origin}/auth/callback`,
			  // Don't specify any unnecessary scopes - use defaults
			},
		  });
	  
		  if (error) {
			toast.error(error.message || "Google login failed");
			setIsLoading(false);
			return { success: false, error: error.message };
		  }
	  
		  // If we get here, the redirect will happen automatically
		  return { success: true };
		} catch (err: any) {
		  toast.error(err.message || "Google login failed");
		  setIsLoading(false);
		  return { success: false, error: err.message };
		}
	  };

	// Signup
	const signup = async ({
		email,
		password,
		firstName,
		lastName,
	}: SignupCredentials) => {
		setIsPostLoading(true);
		try {
			// Signup with Supabase
			const { data, error } = await supabase.auth.signUp({
				email,
				password,
				options: {
					data: {
						first_name: firstName,
						last_name: lastName,
					},
				},
			});

			if (error) {
				toast.error(error.message || "Signup failed");
				return { success: false, error: error.message };
			}

			// Create profile in profiles table
			// if (data.user) {
			// 	const { error: profileError } = await supabase
			// 		.from("profiles")
			// 		.upsert({
			// 			id: data.user.id,
			// 			first_name: firstName,
			// 			last_name: lastName,
			// 			email,
			// 		});

			// 	if (profileError) {
			// 		console.error("Profile creation error:", profileError);
			// 	}
			// }

			toast.success(
				"Signup successful. Please check your email to confirm."
			);
			return { success: true };
		} catch (err: any) {
			toast.error(err.message || "Signup failed");
			return { success: false, error: err.message };
		} finally {
			setIsPostLoading(false);
		}
	};

	// Logout
	const logout = async () => {
		setIsLoading(true);
		try {
			await supabase.auth.signOut();
			// toast.success("Logged out successfully");
		} catch (error: any) {
			toast.error(error.message || "Logout failed");
		} finally {
			setIsLoading(false);
		}
	};

	// Refresh Session
	const refreshSession = async () => {
		setIsLoading(true);
		try {
			const {
				data: { session: currentSession },
			} = await supabase.auth.getSession();
			setSession(currentSession);
			setUser(currentSession?.user ?? null);

			// Add a supabase_user_id cookie or remove it if the user is logged out
			if (currentSession?.user) {
				console.log("User ID:", currentSession.user.id);
				document.cookie = `supabase_user_id=${currentSession.user.id}; path=/;`;
			} else {
				console.log("User logged out");
				document.cookie = "supabase_user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
			}
		} catch (error) {
			console.error("Session refresh error:", error);
		} finally {
			setIsLoading(false);
		}
	};

	// Listen to authentication changes
	useEffect(() => {
		// Initial session fetch
		const fetchSession = async () => {
			const {
				data: { session: currentSession },
			} = await supabase.auth.getSession();
			setSession(currentSession);
			setUser(currentSession?.user ?? null);
			setIsLoading(false);

			// Add a supabase_user_id cookie or remove it if the user is logged out
			if (currentSession?.user) {
				console.log("User ID:", currentSession.user.id);
				document.cookie = `supabase_user_id=${currentSession.user.id}; path=/;`;
			} else {
				console.log("User logged out");
				document.cookie = "supabase_user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
			}
		};

		fetchSession();

		// Subscribe to auth changes
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((event, currentSession) => {
			setSession(currentSession);
			setUser(currentSession?.user ?? null);

			// Add a supabase_user_id cookie or remove it if the user is logged out
			if (currentSession?.user) {
				console.log("User ID:", currentSession.user.id);
				document.cookie = `supabase_user_id=${currentSession.user.id}; path=/;`;
			} else {
				console.log("User logged out");
				document.cookie = "supabase_user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
			}
		});

		// Cleanup subscription
		return () => {
			subscription.unsubscribe();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Derive authentication status
	const isAuthenticated = !!session && !!user;
// Password reset request
// Updated resetPassword function for your AuthContext
const resetPassword = async (email: string): Promise<{ success: boolean }> => {
	setIsPostLoading(true);
	try {
	  // Use the existing auth callback URL path
	  const callbackUrl = `${window.location.origin}/auth/callback`;
	  
	  const { error } = await supabase.auth.resetPasswordForEmail(email, {
		redirectTo: callbackUrl,
	  });
  
	  if (error) {
		console.error("Reset password error:", error);
		toast.error(error.message);
		return { success: false };
	  }
  
	  return { success: true };
	} catch (err) {
	  console.error("Unexpected reset password error:", err);
	  toast.error("Failed to request password reset");
	  return { success: false };
	} finally {
	  setIsPostLoading(false);
	}
  };
  
  // Use this updatePassword function with your existing AuthContext
  const updatePassword = async ({
	password,
  }: {
	password: string;
  }): Promise<{ success: boolean }> => {
	setIsPostLoading(true);
	try {
	  // Supabase automatically uses the token from the URL
	  const { error } = await supabase.auth.updateUser({
		password: password,
	  });
  
	  if (error) {
		console.error("Update password error:", error);
		toast.error(error.message || "Failed to reset password");
		return { success: false };
	  }
  
	  toast.success("Password reset successfully!");
	  return { success: true };
	} catch (err) {
	  console.error("Unexpected update password error:", err);
	  toast.error("Failed to reset password");
	  return { success: false };
	} finally {
	  setIsPostLoading(false);
	}
  };
	// Context value
	const contextValue = {
		session,
		user,
		isAuthenticated,
		isLoading,
		loginWithEmail,
		loginWithGoogle,
		signup,
		logout,
		refreshSession,
		isPostLoading,
		updatePassword,
		resetPassword
	};

	return (
		<SessionContext.Provider value={contextValue}>
			{children}
		</SessionContext.Provider>
	);
};

// Custom hook to use the session context
export const useSession = () => {
	const context = useContext(SessionContext);
	if (context === undefined) {
		throw new Error("useSession must be used within a SessionProvider");
	}
	return context;
};
