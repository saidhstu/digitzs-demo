/* eslint-disable @typescript-eslint/no-unused-vars */
// File: contexts/PaymentContext.tsx
"use client";

import React, { createContext, ReactNode, useContext, useState } from "react";

import { PaymentMethod, SubscriptionPlan } from "../../types/payment";

export const plans: SubscriptionPlan[] = [ 
    { 
        id: "weekly", 
        name: "Etudify Hebdomadaire", 
        trialText: "(Essai de 3 jours)", 
        description: 
            "En poursuivant, vous autorisez Etudify2 LLC à prélever 0,99 € aujourd’hui, puis 5,99 €/semaine après votre essai de 3 jours, avec des paiements récurrents jusqu’à annulation", 
        detailedDescription: [
			"Accès hebdomadaire flexible à toutes les fonctionnalités d’Etudify",
			"Parfait pour les besoins d’étude à court terme ou occasionnels",
			"Annulez à tout moment sans engagement à long terme",
			"Idéal pour les étudiants ayant un emploi du temps d’étude variable",
			"Accès complet aux outils et ressources d’étude premium"
        ],
        productId: process.env.NEXT_PUBLIC_STRIPE_WEEKLY_PRODUCT_ID!, 
        priceId: process.env.NEXT_PUBLIC_STRIPE_WEEKLY_PRICE_ID!, 
        details: { 
            name: "Weekly", 
            initialAmount: 99, // $0.99 in cents 
            recurringAmount: 599, // $5.99 in cents 
            interval: "week", 
            intervalCount: 1, 
            displayRecurring: "5,99€ par semaine",
        }, 
    }, 
    { 
        id: "semester", 
        name: "Plan Semestriel", 
        productId: process.env.NEXT_PUBLIC_STRIPE_SEMESTER_PRODUCT_ID!, 
        priceId: process.env.NEXT_PUBLIC_STRIPE_SEMESTER_PRICE_ID!, 
        trialText: "(3 mois)", 
        description: 
            "En continuant, vous autorisez Etudify2 LLC à prélever 0,99 € aujourd’hui, puis 39,99 € tous les 3 mois après votre essai de 3 jours, avec des paiements récurrents jusqu’à annulation.", 
        detailedDescription: [
          	"Compagnon d’étude complet à long terme",
			"Économies importantes par rapport au plan hebdomadaire",
			"Accès ininterrompu à toutes les fonctionnalités d’Etudify",
			"Parfait pour les engagements d’étude sur un semestre",
			"Meilleur rapport qualité-prix pour les apprenants réguliers",
			"Coût mensuel effectif le plus bas"
        ],
        details: { 
            name: "Quarterly", 
            initialAmount: 99, // $0.99 in cents 
            recurringAmount: 3999, // $39.99 in cents 
            interval: "month", 
            intervalCount: 3, 
            displayRecurring: "39,99€ tous les 3 mois", 
        }, 
    }, 
];


interface PaymentContextType {
	selectedPlan: SubscriptionPlan | null;
	setSelectedPlan: (plan: SubscriptionPlan) => void;
	savedPaymentMethods: PaymentMethod[];
	loadingPaymentMethods: boolean;
	processingPayment: boolean;
	paymentError: string | null;
	 
	// processPayment: (formData: any) => Promise<boolean>;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const PaymentProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(
		plans[0]
	);
	const [savedPaymentMethods, setSavedPaymentMethods] = useState<
		PaymentMethod[]
	>([]);
	const [loadingPaymentMethods, setLoadingPaymentMethods] =
		useState<boolean>(false);
	const [processingPayment, setProcessingPayment] = useState<boolean>(false);
	const [paymentError, setPaymentError] = useState<string | null>(null);

	// Fetch available plans on component mount
	// React.useEffect(() => {
	// 	const fetchPlans = async () => {
	// 		const plans = await paymentService.getSubscriptionPlans();
	// 		if (plans.length > 0) {
	// 			setSelectedPlan(plans[0]);
	// 		}
	// 	};

	// 	fetchPlans();
	// }, []);

	 
	// const processPayment = async (formData: any): Promise<boolean> => {
	// 	setProcessingPayment(true);
	// 	setPaymentError(null);

	// 	try {
	// 		const result = await paymentService.processCardPayment(formData);

	// 		if (!result.success) {
	// 			setPaymentError(result.error || "Payment processing failed");
	// 			setProcessingPayment(false);
	// 			return false;
	// 		}

	// 		setProcessingPayment(false);
	// 		return true;
	// 	} catch (error) {
	// 		setPaymentError(
	// 			"An unexpected error occurred during payment processing"
	// 		);
	// 		setProcessingPayment(false);
	// 		return false;
	// 	}
	// };

	return (
		<PaymentContext.Provider
			value={{
				selectedPlan,
				setSelectedPlan,
				savedPaymentMethods,
				loadingPaymentMethods,
				processingPayment,
				paymentError,
				// processPayment,
			}}>
			{children}
		</PaymentContext.Provider>
	);
};

export const usePayment = (): PaymentContextType => {
	const context = useContext(PaymentContext);
	if (context === undefined) {
		throw new Error("doit être utilisé à l’intérieur d’un PaymentProvider");
	}
	return context;
};
