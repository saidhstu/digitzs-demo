/* eslint-disable @typescript-eslint/no-unused-vars */
// File: hooks/usePaymentForm.ts
import { CheckoutFormValues } from "@/components/checkout/PaymentSection";
import { useState } from "react";

export const usePaymentForm = () => {
	const [maskedCardNumber, setMaskedCardNumber] = useState<string>("");
	const [processing, setProcessing] = useState<boolean>(false);
	const [paymentError, setPaymentError] = useState<string | null>(null);

	// Format card number with spaces
	const formatCardNumber = (value: string): string => {
		const val = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
		const matches = val.match(/\d{4,16}/g);
		const match = (matches && matches[0]) || "";
		const parts = [];

		for (let i = 0; i < match.length; i += 4) {
			parts.push(match.substring(i, i + 4));
		}

		if (parts.length) {
			return parts.join(" ");
		} else {
			return value;
		}
	};

	// Format expiration date with slash
	const formatExpirationDate = (value: string): string => {
		const cleanValue = value.replace(/[^\d]/g, "");
		if (cleanValue.length <= 2) {
			return cleanValue;
		}
		return `${cleanValue.slice(0, 2)}/${cleanValue.slice(2, 4)}`;
	};

	// Process payment
	const processPayment = async (
		values: CheckoutFormValues
	): Promise<boolean> => {
		setProcessing(true);
		setPaymentError(null);

		try {
			// Simulating API call to payment processor
			await new Promise((resolve) => setTimeout(resolve, 1500));

			// Payment success simulation (for demo purposes)
			const success = Math.random() > 0.2; // 80% success rate

			if (!success) {
				setPaymentError(
					"Your payment could not be processed. Please try again."
				);
				setProcessing(false);
				return false;
			}

			setProcessing(false);
			return true;
		} catch (error) {
			setPaymentError(
				"An unexpected error occurred. Please try again later."
			);
			setProcessing(false);
			return false;
		}
	};

	return {
		maskedCardNumber,
		setMaskedCardNumber,
		formatCardNumber,
		formatExpirationDate,
		processing,
		paymentError,
		processPayment,
	};
};
