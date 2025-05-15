/* eslint-disable @typescript-eslint/no-explicit-any */

import Stripe from "stripe";
import { createServerSupabaseClient } from "../supabase/server";

// Utility to store previous page before authentication
export const storePreviousPage = (currentPath: string) => {
	// Don't store login, signup, or password reset pages
	const excludedPaths = ["/login", "/signup", "/reset-password"];

	if (!excludedPaths.includes(currentPath)) {
		localStorage.setItem("previousPage", currentPath);
	}
};

// Use this in your protected routes or before redirecting to login

export const redirectToAuth = (
	router: any,
	currentPath: string,
	authPage: "/login" | "/signup" = "/login"
) => {
	storePreviousPage(currentPath);
	router.push(authPage);
};

export async function createPlans(stripe: any) {
	try {
		const PLANS = [
			{
				id: "weekly",
				name: "Etudify Weekly",
				trialDays: 3,
				initialAmount: 99, // $0.99
				recurringAmount: 599, // $5.99
				interval: "week" as const,
			},
			{
				id: "semester",
				name: "Etudify Semester",
				trialDays: 3,
				initialAmount: 99, // $0.99
				recurringAmount: 3999, // $39.99
				interval: "month" as const,
				intervalCount: 3,
			},
		];

		// Verify this is an admin or authorized request

		// Store created products and prices
		const createdPlans = [];

		// Create plans in Stripe
		for (const plan of PLANS) {
			// Create a product first
			const product = await stripe.products.create({
				name: plan.name,
				type: "service",
				metadata: {
					planId: plan.id,
				},
			});

			// Create a price for the product
			const price = await stripe.prices.create({
				unit_amount: plan.recurringAmount,
				currency: "eur",
				recurring: {
					interval: plan.interval,
					interval_count: plan.intervalCount || 1,
				},
				product: product.id,
				metadata: {
					planId: plan.id,
					trialDays: plan.trialDays,
				},
			});

			createdPlans.push({
				planId: plan.id,
				productId: product.id,
				priceId: price.id,
			});
		}
		console.log(createdPlans);
		return {
			message: "Plans created successfully",
			plans: createdPlans,
		};
	} catch (error) {
		console.error("Plan creation error:", error);
	}
}



// Utility function to format currency
export const formatCurrency = (amount: number, locale: string = 'en-US', currency: string = 'EUR') => {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency
    }).format(amount);
};

// Utility function to format date
export const formatDate = (dateString: string, locale: string = 'fr-FR', options?: Intl.DateTimeFormatOptions) => {
    const date = new Date(dateString);
    const defaultOptions: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    return new Intl.DateTimeFormat(locale, options || defaultOptions).format(date);
};

// Utility function to truncate text
export const truncate = (text: string, length: number) => {
    return text.length > length ? `${text.slice(0, length)}...` : text;
};



export async function trackSubscriptionInSupabase(subscription: Stripe.Subscription) {
	try {
		const supabase = createServerSupabaseClient();
		const subscriptionData = {
			subscription_id: subscription.id,
			stripe_customer_id: subscription.customer as string,
			supabase_user_id: subscription.metadata.supabaseUid || null,
			product_id: subscription.metadata.productId || null,
			price_id: subscription.items.data[0].price.id,
			customer_email: subscription.metadata.customerEmail || null,
			status: subscription.status,
			plan_name: subscription.metadata?.plan_name,
			current_period_start: new Date(
				subscription.current_period_start * 1000
			).toISOString(),
			current_period_end: new Date(
				subscription.current_period_end * 1000
			).toISOString(),
			trial_start: subscription.trial_start
				? new Date(subscription.trial_start * 1000).toISOString()
				: null,
			trial_end: subscription.trial_end
				? new Date(subscription.trial_end * 1000).toISOString()
				: null,
			renew: !subscription.cancel_at_period_end
		};

		const { error } = await supabase
			.from("subscriptions")
			.upsert(subscriptionData, {
				onConflict: "subscription_id",
			});

		if (error) {
			console.error("Error tracking subscription in Supabase:", error);
			throw error;
		}

		console.log(`Subscription ${subscription.id} tracked in Supabase`);
	} catch (error) {
		console.error("Comprehensive subscription tracking error:", error);
	}
}