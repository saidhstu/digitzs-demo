// File: components/checkout/PaymentSection.tsx
"use client";
import { usePayment } from "@/lib/contexts/PaymentContext";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Form, Formik } from "formik";
import React from "react";
import BillingFrequencyOptions from "./BillingFrequencyOptions";
import PaymentMethodToggle from "./PaymentToggle";

const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || "",
	{
		apiVersion: "2025-02-24.acacia",
	}
);

// Define TypeScript interfaces
export interface CheckoutFormValues {
	paymentMethod: "card" | "bank";
	cardNumber?: string;
	expirationDate?: string;
	securityCode?: string;
	country: string;
	phoneNumber: string;
	selectedBank?: string;
	billingFrequency: "weekly" | "semester";
}

const PaymentSection: React.FC = () => {
	// Validation schema using Zod

	// Initial form values
	const initialValues: CheckoutFormValues = {
		paymentMethod: "card",
		cardNumber: "",
		expirationDate: "",
		securityCode: "",
		country: "Bangladesh",
		phoneNumber: "",
		selectedBank: "",
		billingFrequency: "weekly",
	};

	// Handle form submission
	const handleSubmit = (values: CheckoutFormValues) => {
		console.log("Form values:", values);
		// Add payment processing logic here
	};

	const { selectedPlan } = usePayment();

	if (!selectedPlan) {
		return (
			<div className="flex justify-center items-center min-h-screen">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
			</div>
		);
	}

	return (
		<div className="rounded-lg bg-white p-6 shadow-md">
			<h2 className=" text-xl font-bold">Paiement express</h2>
			<Elements
				stripe={stripePromise}
				options={{
					mode: "subscription",
					amount: 99,
					currency: "eur",
				}}>
				<PaymentMethodToggle />
			</Elements>

			<Formik initialValues={initialValues} onSubmit={handleSubmit}>
				<Form>
					<BillingFrequencyOptions />
				</Form>
			</Formik>
		</div>
	);
};

export default PaymentSection;
