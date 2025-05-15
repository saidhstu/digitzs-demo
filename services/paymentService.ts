// // File: services/paymentService.ts
// import { CheckoutFormValues } from "../components/checkout/PaymentSection";
// import { SubscriptionPlan } from "../types/payment";

// class PaymentService {
// 	// Process payment with card details
// 	async processCardPayment(
// 		formData: CheckoutFormValues
// 	): Promise<{ success: boolean; transactionId?: string; error?: string }> {
// 		try {
// 			// In a real application, this would communicate with your payment processor API
// 			const response = await fetch("/api/payments/process", {
// 				method: "POST",
// 				headers: {
// 					"Content-Type": "application/json",
// 				},
// 				body: JSON.stringify({
// 					cardNumber: formData.cardNumber,
// 					expirationDate: formData.expirationDate,
// 					securityCode: formData.securityCode,
// 					billingFrequency: formData.billingFrequency,
// 				}),
// 			});

// 			const data = await response.json();

// 			if (!response.ok) {
// 				throw new Error(data.error || "Payment processing failed");
// 			}

// 			return {
// 				success: true,
// 				transactionId: data.transactionId,
// 			};
// 		} catch (error) {
// 			console.error("Payment processing error:", error);
// 			return {
// 				success: false,
// 				error:
// 					error instanceof Error
// 						? error.message
// 						: "Unknown payment error",
// 			};
// 		}
// 	}

// 	// Process payment with express checkout method
// 	async processExpressPayment(
// 		paymentMethodId: string,
// 		planId: string
// 	): Promise<{ success: boolean; transactionId?: string; error?: string }> {
// 		try {
// 			// In a real application, this would communicate with your payment processor API
// 			const response = await fetch("/api/payments/express", {
// 				method: "POST",
// 				headers: {
// 					"Content-Type": "application/json",
// 				},
// 				body: JSON.stringify({
// 					paymentMethodId,
// 					planId,
// 				}),
// 			});

// 			const data = await response.json();

// 			if (!response.ok) {
// 				throw new Error(
// 					data.error || "Express payment processing failed"
// 				);
// 			}

// 			return {
// 				success: true,
// 				transactionId: data.transactionId,
// 			};
// 		} catch (error) {
// 			console.error("Express payment processing error:", error);
// 			return {
// 				success: false,
// 				error:
// 					error instanceof Error
// 						? error.message
// 						: "Unknown payment error",
// 			};
// 		}
// 	}

// 	// Get available plans
// 	async getSubscriptionPlans(): Promise<SubscriptionPlan[]> {
// 		// In a real application, this would fetch from your API
// 		return [
// 			{
// 				id: "weekly-plan",
// 				name: "Weekly",
// 				trialDays: 3,
// 				price: 5.99,
// 				interval: "weekly",
// 			},
// 			{
// 				id: "semester-plan",
// 				name: "Semester",
// 				trialDays: 3,
// 				price: 3.33,
// 				interval: "semester",
// 				savings: 2.66,
// 				savingsPercentage: 45,
// 			},
// 		];
// 	}
// }

// export const paymentService = new PaymentService();
