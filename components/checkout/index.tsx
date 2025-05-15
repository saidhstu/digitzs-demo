"use client";
import { usePayment } from "@/lib/contexts/PaymentContext";
import React from "react";
import Header from "./Header";
import OrderSummarySection from "./OrderSummarySection";
import PaymentSection from "./PaymentSection";

const CheckoutPage: React.FC = () => {
	const { selectedPlan } = usePayment();

	if (!selectedPlan) {
		return null;
	}
	return (
		<div className="min-h-screen flex items-center  p-4">
			
			<div className="mx-auto max-w-6xl">
				{/* Header */}
				<Header />

				<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
					{/* Left Column - Payment Form */}

					<PaymentSection />

					{/* Right Column - Order Summary */}
					<OrderSummarySection />
				</div>
			</div>
		</div>
	);
};

export default CheckoutPage;
