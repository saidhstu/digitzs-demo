"use client";

import { plans, usePayment } from "@/lib/contexts/PaymentContext";
import { Field, useFormikContext } from "formik";

import React from "react";



const BillingFrequencyOptions: React.FC = () => {
	const { setSelectedPlan, selectedPlan } = usePayment();
	const { setFieldValue, values } = useFormikContext<{
		billingFrequency?: string;
	}>();

	// Function to handle plan selection
	const handlePlanChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedValue = event.target.value;
		const selectedPla = plans.find((plan) => plan.id === selectedValue);
		if (selectedPla) {
			setSelectedPlan(selectedPla); // Update the selected plan in context
			setFieldValue("billingFrequency", selectedValue); // Update Formik's field value
		}
	};

	return (
		<div className="mt-6">
			<p className="mb-2 text-sm font-medium text-gray-700">
				Fréquence de facturation après{" "}
				<span className="text-blue-600">Essai de 3 jours</span>
			</p>

			{/* Semester Plan */}
			<div className="mb-3 flex items-center">
				<Field
					type="radio"
					id="semester"
					name="billingFrequency"
					value="semester"
					className="h-4 w-4 text-blue-500 focus:ring-blue-400"
					checked={
						selectedPlan?.id === "semester" ||
						values.billingFrequency === "semester"
					}
					onChange={handlePlanChange}
				/>
				<label
					htmlFor="semester"
					className="ml-2 text-sm text-gray-700">
					Semestre
				</label>
				<div className="ml-2 rounded-md bg-gray-800 px-2 py-1 text-xs font-medium text-white">
				€3.33/par semaine
				</div>
			</div>

			{/* Weekly Plan */}
			<div className="flex items-center">
				<Field
					type="radio"
					id="weekly"
					name="billingFrequency"
					value="weekly"
					className="h-4 w-4 text-blue-500 focus:ring-blue-400"
					// Default to true if no selectedPlan exists yet or if weekly is selected
					checked={
						selectedPlan?.id === "weekly" ||
						values.billingFrequency === "weekly" ||
						(!selectedPlan && !values.billingFrequency)
					}
					onChange={handlePlanChange}
				/>
				<label htmlFor="weekly" className="ml-2 text-sm text-gray-700">
					Hebdomadaire
				</label>
			</div>
		</div>
	);
};

export default BillingFrequencyOptions;
