/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import GlobalModal from "@/components/ui/modal";
import {
    AlertTriangle,
    CheckCircle2,
    ChevronRight,
    XCircle,
} from "lucide-react";
import React, { useEffect, useState } from "react";
const SubscriptionDashboard: React.FC = () => {
	// Subscription State
	const [subscription, setSubscription] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// Modal States
	const [activeModal, setActiveModal] = useState<"cancel" | "update" | null>(
		null
	);

	// Fetch Subscription Details
	useEffect(() => {
		const fetchSubscriptionDetails = async () => {
			try {
				const response = await fetch("/dashboard/api", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				});

				if (!response.ok) {
					throw new Error("Failed to fetch subscription details");
				}
				const data = await response.json();
				setSubscription(data?.at(0));
				setLoading(false);
			} catch (err) {
				setError(
					err instanceof Error
						? err.message
						: "An unexpected error occurred"
				);
				setLoading(false);
			}
		};

		fetchSubscriptionDetails();
	}, []);

	// Cancel Subscription Handler
	const handleCancelSubscription = async () => {
		try {
			const response = await fetch("/api/subscription/cancel", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					subscriptionId: subscription.subscription_id,
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to cancel subscription");
			}

			// Update local state
			setSubscription((prev: any) => ({
				...prev,
				status: "canceled",
				cancelAtPeriodEnd: true,
			}));

			setActiveModal(null);
		} catch (err) {
			setError(
				err instanceof Error
					? err.message
					: "An unexpected error occurred"
			);
		}
	};

	// Render Loading State
	if (loading) {
		return (
			<div className="fixed inset-0 flex items-center justify-center ">
				<div className="text-center">
					<div className="animate-pulse w-16 h-16 bg-blue-300 rounded-full mx-auto mb-4"></div>
				</div>
			</div>
		);
	}

	// Render Error State
	if (error) {
		return (
			<div className="fixed inset-0 flex items-center justify-center bg-blue-50">
				<div className="bg-white p-8 rounded-xl shadow-2xl text-center max-w-md border border-blue-200">
					<AlertTriangle className="mx-auto w-16 h-16 text-blue-500 mb-4" />
					<h2 className="text-2xl font-bold text-blue-800 mb-4">
						Oops! Something went wrong
					</h2>
					<p className="text-blue-700 mb-6">{error}</p>
					<button
						onClick={() => window.location.reload()}
						className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors">
						Try Again
					</button>
				</div>
			</div>
		);
	}

	// No Subscription Found
	if (!subscription) {
		return (
			<div className="fixed inset-0 flex items-center justify-center bg-blue-50">
				<div className="bg-white p-8 rounded-xl shadow-2xl text-center max-w-md border border-blue-200">
					<XCircle className="mx-auto w-16 h-16 text-blue-500 mb-4" />
					<h2 className="text-2xl font-bold text-blue-800 mb-4">
						No Active Subscription
					</h2>
					<p className="text-blue-700 mb-6">
						You do not have an active subscription at the moment.
					</p>
					<button
						onClick={() => (window.location.href = "/pricing")}
						className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center mx-auto">
						Choose a Plan <ChevronRight className="ml-2" />
					</button>
				</div>
			</div>
		);
	}

	// Calculate trial status
	const now = new Date();
	const trialStart = new Date(subscription.trial_start);
	const trialEnd = new Date(subscription.trial_end);
	const isWithinTrial = now >= trialStart && now <= trialEnd;

	return (
		<div className="fixed inset-0 overflow-y-auto">
			{/* Main Content */}
			<div className="min-h-full flex items-center justify-center p-4">
				<div className="w-full max-w-3xl shadow">
					<div className="bg-white  rounded-2xl overflow-hidden ">
						{/* Header */}
						<div className="bg-blue-500 text-white px-6 py-4">
							<h1 className="text-xl font-bold">
								Subscription Details
							</h1>
						</div>

						{/* Subscription Content */}
						<div className="p-6 space-y-6">
							{/* Status Section */}
							<div className="flex items-center justify-between bg-blue-100 p-4 rounded-lg">
								<div className="flex items-center space-x-4">
									{isWithinTrial ? (
										<AlertTriangle className="text-blue-600 w-10 h-10" />
									) : subscription.status === "active" ? (
										<CheckCircle2 className="text-green-600 w-10 h-10" />
									) : (
										<XCircle className="text-red-600 w-10 h-10" />
									)}
									<div>
										<h2 className="text-xl font-semibold text-blue-900">
											{isWithinTrial
												? "Trial Subscription"
												: subscription.status ===
												  "active"
												? "Active Subscription"
												: "Canceled Subscription"}
										</h2>
										{isWithinTrial && (
											<p className="text-blue-700">
												Ends on{" "}
												{trialEnd.toLocaleDateString()}
											</p>
										)}
									</div>
								</div>
							</div>

							{/* Subscription Details Grid */}
							<div className="grid md:grid-cols-2 gap-6">
								<div className="bg-blue-100 p-4 rounded-lg">
									<h3 className="text-blue-600 mb-2">
										Subscription Email
									</h3>
									<p className="font-semibold text-blue-900">
										{subscription.customer_email}
									</p>
								</div>
								<div className="bg-blue-100 p-4 rounded-lg">
									<h3 className="text-blue-600 mb-2">
										Plan
									</h3>
									<p className="font-semibold text-blue-900">
										{subscription?.plan_name}
									</p>
								</div>
								<div className="bg-blue-100 p-4 rounded-lg">
									<h3 className="text-blue-600 mb-2">
										Next Billing Date
									</h3>
									<p className="font-semibold text-blue-900">
										{new Date(
											subscription.current_period_end
										).toLocaleDateString()}
									</p>
								</div>
								<div className="bg-blue-100 p-4 rounded-lg">
									<h3 className="text-blue-600 mb-2">
										Last Billing Date
									</h3>
									<p className="font-semibold text-blue-900">
										{new Date(
											subscription.current_period_start
										).toLocaleDateString()}
									</p>
								</div>
							</div>

							{/* Action Buttons */}
							<div className="flex space-x-4 mt-6">
								{(isWithinTrial ||
									subscription.status === "active") && (
									<button
										onClick={() => setActiveModal("cancel")}
										className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors flex items-center">
										<XCircle className="mr-2" /> Cancel
										Subscription
									</button>
								)}
								<button
									onClick={() => setActiveModal("update")}
									className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center">
									<CheckCircle2 className="mr-2" /> Update
									Payment Method
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Cancel Subscription Modal */}
			<GlobalModal
				isOpen={activeModal === "cancel"}
				onClose={() => setActiveModal(null)}
				title="Cancel Subscription">
				<div className="space-y-4">
					<p className="text-blue-700">
						{isWithinTrial
							? "Your trial will end and you'll lose access to the service."
							: "You will retain access until the end of the current billing period."}
					</p>
					<div className="flex justify-end space-x-4">
						<button
							onClick={() => setActiveModal(null)}
							className="flex-1 border border-blue-300 text-blue-700 py-3 rounded-lg hover:bg-blue-100 transition-colors">
							Keep Subscription
						</button>
						<button
							onClick={handleCancelSubscription}
							className="flex-1 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors">
							Confirm Cancellation
						</button>
					</div>
				</div>
			</GlobalModal>

			{/* Update Payment Method Modal */}
			<GlobalModal
				isOpen={activeModal === "update"}
				onClose={() => setActiveModal(null)}
				title="Mettre à jour le mode de paiement">
				<div className="space-y-4">
					<p className="text-blue-700">
						Please contact our support team to update your payment
						method.
					</p>
					<div className="flex justify-end space-x-4">
						<button
							onClick={() => setActiveModal(null)}
							className="flex-1 border border-blue-300 text-blue-700 py-3 rounded-lg hover:bg-blue-100 transition-colors">
							Cancel
						</button>
						<a
							href="mailto:support@yourcompany.com"
							className="flex-1 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors text-center inline-flex items-center justify-center">
							Contact Support
						</a>
					</div>
				</div>
			</GlobalModal>
		</div>
	);
};
 

export default SubscriptionDashboard;
