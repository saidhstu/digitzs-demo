export interface PaymentMethod {
	id: string;
	type: "card" | "paypal" | "googlepay" | "applepay" | "bank";
	last4?: string;
	brand?: string;
	expiryMonth?: number;
	expiryYear?: number;
}

export interface SubscriptionPlan {

	id: string;
	name: string;
	trialText?: string;
	trialDays?: number;
	productId: string;
	priceId: string;
	price?: number;
	interval?: "weekly" | "monthly" | "semester" | "yearly";
	savings?: number;
	savingsPercentage?: number;
	description?: string;
	detailedDescription?:string[];
	details: {
		name: string;
		initialAmount: number; // Amount in cents (e.g., 99 for $0.99)
		recurringAmount: number; // Amount in cents (e.g., 599 for $5.99)
		interval: "day" | "week" | "month" | "year"; // Restrict to valid Stripe intervals
		intervalCount: number; // Number of intervals (e.g., 1 for weekly, 12 for yearly)
		displayRecurring: string; // Display format for UI (e.g., "$5.99/week")
	};
}

export interface OrderSummaryItem {
	name: string;
	description?: string;
	price: number;
	isRecurring: boolean;
	interval?: string;
}
