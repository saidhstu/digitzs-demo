/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { usePayment } from "@/lib/contexts/PaymentContext";

import {
	PaymentRequestButtonElement,
	useElements,
	useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

// Main Express Checkout Component
export default function ExpressCheckoutForm() {
	const stripe = useStripe();
	const elements = useElements();
	const [paymentRequest, setPaymentRequest] = useState<any>(null);
	const [error, setError] = useState<string | null>(null);
	const [availablePaymentMethods, setAvailablePaymentMethods] = useState<
		string[]
	>([]);
	const { selectedPlan } = usePayment();
	console.log(selectedPlan);

	// Setup PaymentRequest (Google Pay/Apple Pay/Link)
	useEffect(() => {
		if (!stripe || !selectedPlan) return;

		const pr = stripe.paymentRequest({
			country: "FR",
			currency: "eur",
			total: {
				label: `${selectedPlan.name} Trial`,
				amount: Number(selectedPlan.details.initialAmount),
			},
			requestPayerEmail: true,
			requestPayerName: true,
		});

		pr.canMakePayment()
			.then((result: any) => {
				console.log("Payment method detection result:", result);

				if (result) {
					setPaymentRequest(pr);

					// Collect available payment methods
					const methods = [];
					if (result.applePay) methods.push("Apple Pay");
					if (result.googlePay) methods.push("Google Pay");
					if (result.link) methods.push("Link");

					setAvailablePaymentMethods(methods);
				}
			})
			.catch((error: any) => {
				console.error("Payment method detection error:", error);
			});

		pr.on("paymentmethod", async (event: any) => {
			if (!stripe || !elements) {
				event.complete("fail");
				return;
			}

			try {
				// Create subscription on backend
				const response = await fetch("/api/create-subscription", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						planId: selectedPlan?.id,
						paymentMethodId: event.paymentMethod.id,
						customerEmail: event.payerEmail,
					}),
				});

				const data = await response.json();

				if (data.clientSecret) {
					// Confirm the payment
					const { error } = await stripe.confirmCardPayment(
						data.clientSecret,
						{
							payment_method: event.paymentMethod.id,
						}
					);

					if (error) {
						event.complete("fail");
						setError(error.message || "Paiement échoué");
					} else {
						event.complete("success");
						window.location.href = "/subscription-success";
					}
				} else {
					throw new Error("Impossible de récupérer le secret du client");
				}
			} catch (err: any) {
				console.error("Payment error:", err);
				event.complete("fail");
				setError(err.message || "Une erreur inattendue s'est produite.");
			}
		});
	}, [stripe, elements, selectedPlan]);

	return (
		<div className="max-w-md mx-auto ">
			{/* Error messages */}
			{error && (
				<div className="rounded-md bg-red-50 p-3 mb-4 text-sm text-red-600">
					<p>{error}</p>
				</div>
			)}

			{/* Express Checkout Buttons */}
			{paymentRequest && (
				<div>
					<PaymentRequestButtonElement
						options={{
							paymentRequest,
							style: {
								paymentRequestButton: {
									theme: "dark",
									height: "48px",
								},
							},
						}}
					/>
				</div>
			)}
		</div>
	);
}
