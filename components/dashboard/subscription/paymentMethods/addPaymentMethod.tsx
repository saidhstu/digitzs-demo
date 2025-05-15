/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
	CardElement,
	Elements,
	useElements,
	useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { toast } from "react-hot-toast";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!, {
	locale: 'fr',
  });

const AddPaymentMethod = ({ customerId ,setIsSuccess}: { customerId: string,setIsSuccess:any }) => {
	const stripe = useStripe();
	const elements = useElements();
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		setLoading(true);

		if (!stripe || !elements) {
			setLoading(false);
			return;
		}

		const cardElement = elements.getElement(CardElement);
		if (!cardElement) {
			setLoading(false);
			return;
		}

		const { paymentMethod, error } = await stripe.createPaymentMethod({
			type: "card",
			card: cardElement,
		});

		if (error) {
			toast.error(error?.message as string);
			setLoading(false);
			return;
		}

		try {
			const res = await fetch("/api/payment-methods", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					customerId,
					paymentMethodId: paymentMethod?.id,
				}),
			});
			if (!res.ok) throw new Error("Échec de l'ajout du mode de paiement");
            setIsSuccess(true)
			toast.success("Mode de paiement ajouté avec succès");
		} catch (err: any) {
			toast.error(err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="p-6 bg-white rounded-lg  ">
			<h2 className="text-lg font-semibold mb-4">Ajouter un mode de paiement</h2>
			<form onSubmit={handleSubmit}>
				<CardElement className="border p-3 rounded-md" />
				<button
				style={{ 
					background: "linear-gradient(90deg, #626EBF 0%, #908EED 100%)"
				}}
					type="submit"
					className="mt-4 cursor-pointer bg-blue-500 text-white p-2 rounded"
					disabled={loading}>
					{loading ? "Enregistrement en cours..." : "Enregistrer la carte"}
				</button>
			</form>
		</div>
	);
};

const WrappedAddPaymentMethod = ({ customerId,setIsSuccess }: { customerId: string,setIsSuccess:any }) => (
	<Elements stripe={stripePromise} options={{ locale: 'fr' }}>
		<AddPaymentMethod customerId={customerId} setIsSuccess={setIsSuccess}/>
	</Elements>
);

export default WrappedAddPaymentMethod;
