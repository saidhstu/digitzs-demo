import Stripe from "stripe";

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY || "", {
	apiVersion: "2025-02-24.acacia",
});
export default stripe;
