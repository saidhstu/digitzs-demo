/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSession } from "@/lib/contexts/AuthContext";
import { usePayment } from "@/lib/contexts/PaymentContext";
import {
	PaymentElement,
	PaymentRequestButtonElement,
	useElements,
	useStripe,
} from "@stripe/react-stripe-js";
import Link from "next/link";

import React, { useEffect, useRef, useState } from "react";

function CheckoutByCard() {
	const stripe = useStripe();
	const elements = useElements();
	const paymentButtonRef = useRef<HTMLDivElement>(null);
	const paymentRequestRef = useRef<any>(null);

	const { selectedPlan } = usePayment();
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [paymentIntentCreated, setPaymentIntentCreated] = useState(false);
	const [agreed, setAgreed] = useState(false);
	const { user } = useSession();
	const email = user?.user_metadata?.email;
	const [clientSecret, setClientSecret] = useState<string | null>(null);

	const [canMakePayment, setCanMakePayment] = useState(false);
	const [isCreatingIntent, setIsCreatingIntent] = useState(false);

	// New state to track payment method click
	const [paymentMethodClicked, setPaymentMethodClicked] = useState<
		"stripe-button" | "manual-card" | null
	>(null);
	const succesUrl = "/checkout/success";
	// Initialize Payment Request Button only once and store in a ref
	useEffect(() => {
		if (!stripe || !selectedPlan || paymentRequestRef.current) return;

		const pr = stripe.paymentRequest({
			country: "FR",
			currency: "eur",
			total: {
				label: `${selectedPlan.name} Subscription`,
				amount: selectedPlan.details.initialAmount,
			},
			requestPayerName: true,
			requestPayerEmail: true,
		});

		pr.canMakePayment().then((result) => {
			if (result) {
				console.log("Payment request supported:", result);
				paymentRequestRef.current = pr;
				setCanMakePayment(true);
			}
		});
	}, [stripe, selectedPlan]);

	// Set up the payment request handler
	useEffect(() => {
		if (!paymentRequestRef.current || !stripe) return;
		const pr = paymentRequestRef.current;

		const handlePaymentMethod = async (event: any) => {
			if (!clientSecret) {
				event.complete("fail");
				setError("L'initialisation du paiement a échoué. Veuillez réessayer.");
				return;
			}
			try {
				const { error, paymentIntent } =
					await stripe.confirmCardPayment(
						clientSecret,
						{ payment_method: event.paymentMethod.id },
						{ handleActions: false }
					);
				if (error) {
					event.complete("fail");
					setError(error.message || "Le paiement a échoué");
				} else if (paymentIntent.status === "requires_action") {
					event.complete("success");
					const { error } = await stripe.confirmCardPayment(
						clientSecret
					);
					if (error) {
						setError(
							error.message || "L'authentification du paiement a échoué"
						);
					} else {
						window.location.href = `${window.location.origin}${succesUrl}`;
					}
				} else {
					event.complete("success");
					window.location.href = `${window.location.origin}${succesUrl}`;
				}
			} catch (err: any) {
				event.complete("fail");
				setError(err.message || "Une erreur inattendue est survenue");
			}
		};

		pr.on("paymentmethod", handlePaymentMethod);
		return () => {
			pr.off("paymentmethod", handlePaymentMethod);
		};
	}, [clientSecret, stripe]);

	// Validate manual card payment before creating intent
	const validateManualCardPayment = async () => {
		if (!stripe || !elements) {
			setError("Le système de paiement n'a pas été initialisé.");
			return false;
		}

		// Check agreement
		if (!agreed) {
			setError("Veuillez accepter les Conditions générales et la Politique de confidentialité");
			return false;
		}

		// Check email
		if (!email) {
			setError("L'e-mail de l'utilisateur est requis");
			return false;
		}

		// Validate payment element
		const { error: submitError } = await elements.submit();
		if (submitError) {
			setError(
				submitError.message || "Veuillez vérifier vos informations de paiement"
			);
			return false;
		}

		return true;
	};

	// Function to create payment intent
	const createPaymentIntent = async () => {
		if (
			!selectedPlan ||
			!email ||
			paymentIntentCreated ||
			isCreatingIntent
		) {
			return null;
		}
		try {
			setIsCreatingIntent(true);
			setLoading(true);
			console.log("Creating payment intent...");
			const response = await fetch("/checkout/api", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					...selectedPlan,
					paymentMethodType: paymentMethodClicked,
				}),
			});
			const data = await response.json();
			if (data.error) {
				setError(data.error.message || "Échec de l'initialisation du paiement");
				setIsCreatingIntent(false);
				setLoading(false);
				return null;
			}
			console.log("Payment intent created successfully");
			setPaymentIntentCreated(true);
			setClientSecret(data.clientSecret);
			setIsCreatingIntent(false);
			setLoading(false);
			return data.clientSecret;
		} catch (err: any) {
			setError("Échec de l'initialisation du système de paiement. Veuillez réessayer");
			setIsCreatingIntent(false);
			setLoading(false);
			return null;
		}
	};

	// Overlay button handler: create intent and trigger payment dialog
	const handleOverlayClick = async (e: React.MouseEvent) => {
		e.preventDefault();
		if (!paymentRequestRef.current) return;

		// Set payment method clicked
		setPaymentMethodClicked("stripe-button");

		if (!clientSecret) {
			const secret = await createPaymentIntent();
			if (!secret) return;
		}
		try {
			console.log(
				"Calling paymentRequest.show() to trigger payment dialog."
			);
			await paymentRequestRef.current.show();
		} catch (error) {
			setError("Impossible d'ouvrir la fenêtre de paiement. Veuillez réessayer.");
		}
	};

	// Handle form submission for regular card payments
	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		// Set payment method clicked
		setPaymentMethodClicked("manual-card");

		// Validate manual card payment first
		const isValid = await validateManualCardPayment();
		if (!isValid) return;

		if (!stripe || !elements || !selectedPlan) {
			return;
		}

		setLoading(true);
		setError(null);

		try {
			let secret = clientSecret;
			if (!secret) {
				secret = await createPaymentIntent();
				if (!secret) return;
			}

			const { error } = await stripe.confirmPayment({
				elements,
				clientSecret: secret,
				confirmParams: {
					return_url: `${window.location.origin}${succesUrl}`,
					payment_method_data: {
						billing_details: { email },
					},
				},
			});

			if (error) {
				setError(error.message || "La création de l'abonnement a échoué");
				setLoading(false);
			}
		} catch (err: any) {
			setError(err.message || "Une erreur imprévue est survenue");
			setLoading(false);
		}
	};

	const paymentElementOptions: any = {
		layout: { type: "tabs", defaultCollapsed: false },
	};

	if (!selectedPlan) return <div>Chargement...</div>;

	return (
		<form id="payment-form" onSubmit={handleSubmit}>
			{/* Express Checkout (Payment Request Button) with Overlay */}
			<div className="mb-6">
				{canMakePayment && paymentRequestRef.current && (
					<>
						<div className="mb-4">
							<div className="relative" ref={paymentButtonRef}>
								<div>
									<PaymentRequestButtonElement
										options={{
											paymentRequest:
												paymentRequestRef.current,
											style: {
												paymentRequestButton: {
													theme: "dark",
													height: "44px",
												},
											},
										}}
									/>
								</div>
								{!clientSecret && (
									<button
										type="button"
										onClick={handleOverlayClick}
										disabled={
											paymentMethodClicked ===
												"stripe-button" &&
											isCreatingIntent
										}
										className={`absolute inset-0 w-full h-full rounded-md cursor-pointer ${
											paymentMethodClicked ===
												"stripe-button" &&
											isCreatingIntent
												? "bg-black opacity-100 flex items-center justify-center"
												: "hover:bg-gray-100 hover:opacity-[0.5]"
										}`}>
										{paymentMethodClicked ===
											"stripe-button" &&
											isCreatingIntent && (
												<div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
											)}
									</button>
								)}
							</div>
						</div>
						<div className="mt-4 mb-4 relative">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-gray-300"></div>
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="px-2 bg-white text-gray-500">
									Ou payez par carte
								</span>
							</div>
						</div>
					</>
				)}
			</div>
			{/* Payment Element for regular card payments */}
			<div className="mb-4">
				<PaymentElement
					id="payment-element"
					options={paymentElementOptions}
				/>
			</div>
			{error && (
				<div className="rounded-md bg-red-50 p-3 mb-4 text-sm text-red-600">
					<p>{error}</p>
				</div>
			)}
			<div className="mb-4">
				<div className="flex items-center">
					<input
						type="checkbox"
						checked={agreed}
						onChange={(e) => setAgreed(e.target.checked)}
						className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
					/>
					<span className="ml-2 text-sm text-gray-600">
						J&apos;accepte les 	<Link
									href="https://www.etudify.ai/conditions-g%C3%A9n%C3%A9rales-dutilisation"
									className="text-blue-500 hover:text-blue-600">
									Conditions
								</Link>

			
								{" et "}<Link
									href="https://www.etudify.ai/politique-de-confidentialit%C3%A9"
									className="text-blue-500 hover:text-blue-600">
									Politique de confidentialité
								</Link>
					</span>
				</div>
			</div>
			<button
				type="submit"
				disabled={!stripe || loading || !agreed || !email}
				style={{ 
					background: "linear-gradient(90deg, #626EBF 0%, #908EED 100%)"
				}}
				className="w-full rounded-md bg-blue-500 py-3 font-semibold text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2  cursor-pointer disabled:cursor-not-allowed disabled:opacity-50">
				{loading && paymentMethodClicked === "manual-card"
					? "Processing..."
					: `Start ${selectedPlan.trialText} for €${(
							selectedPlan.details.initialAmount / 100
					  ).toFixed(2)}`}
			</button>
			<p className="mt-4 text-xs text-gray-500 text-center">
			En vous abonnant, vous acceptez nos{" "}
				<Link href="https://www.etudify.ai/conditions-g%C3%A9n%C3%A9rales-dutilisation" className="underline">
					Conditions
				</Link>{" "}
				et{" "}
				<a href="https://www.etudify.ai/politique-de-confidentialit%C3%A9" className="underline">
					Politique de confidentialité
				</a>
				.
			</p>
		</form>
	);
}

export default CheckoutByCard;
