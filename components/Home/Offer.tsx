"use client";
import Image from "next/image";
import React, { useState } from "react";

type SubscriptionPeriod = "Weekly" | "3-Month";

const EtudifySubscription: React.FC = () => {
	const [selectedPeriod, setSelectedPeriod] =
		useState<SubscriptionPeriod>("Weekly");

	return (
		<div className="mt-10">
			<div className="flex items-center w-fit rounded-full px-4 py-2 mx-auto  bg-blue-200 text-black justify-center mb-4">
				<span className="text-lg font-medium">Vous économisez</span>
				<span className="text-xl font-bold  ml-2">45%</span>
				<svg
					className="w-6 h-6 text-blue-500 ml-1"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg">
					<path
						d="M7 17L17 7M17 7H10M17 7V14"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</div>

			<div className="flex justify-center space-x-2 mb-6">
				<button
					className={`px-4 py-2 rounded-full ${
						selectedPeriod === "Weekly"
							? "bg-gray-100 font-semibold"
							: "bg-gray-50"
					}`}
					onClick={() => setSelectedPeriod("Weekly")}>
					Hebdomadaire
				</button>
				<button
					className={`px-4 py-2 rounded-full ${
						selectedPeriod === "3-Month"
							? "bg-gray-100 font-semibold"
							: "bg-gray-50"
					}`}
					onClick={() => setSelectedPeriod("3-Month")}>
					3 mois
				</button>
			</div>

			<div className="max-w-2xl border border-gray-300  mx-auto p-6 bg-white rounded-3xl  shadow-lg">
				<div className="bg-gray-50 rounded-lg p-3 mb-6 text-center">
					<span className="font-medium">72 heures </span>
					<span className="font-bold">Accès illimité</span>
					<span className="font-medium"> à Etudify</span>
				</div>

				<div className="text-center mb-4">
					<h1 className="text-4xl font-extrabold text-navy mb-2">
						ESSAYEZ POUR 0,99 $
					</h1>
					<div className="flex items-center justify-center">
						<svg
							className="w-5 h-5 mr-2"
							viewBox="0 0 20 20"
							fill="currentColor"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.5 2.5a1 1 0 001.414-1.414L11 9.586V6z"
								fillRule="evenodd"
								clipRule="evenodd"
							/>
						</svg>
						<span className="text-gray-600">
							Offre valable jusqu&apos;au{" "}
							<span className="font-semibold">20 juillet</span>
						</span>
					</div>
				</div>

				<button className="cursor-pointer  bg-blue-500 hover:bg-blue-600 text-gray-900 text-lg font-medium py-4 px-8 rounded-lg w-full mb-4 transition-colors shadow-lg bg-gradient-to-r from-blue-500 to-blue-600">
					Commencez maintenant
				</button>

				<div className="grid grid-cols-2 gap-y-3 mb-6">
					<div className="flex items-start">
						<svg
							className="w-5 h-5 mr-2 mt-0.5"
							viewBox="0 0 20 20"
							fill="currentColor"
							xmlns="http://www.w3.org/2000/svg">
							<path
								fillRule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
								clipRule="evenodd"
							/>
						</svg>
						<span className="font-semibold">Réponses instantanées</span>
					</div>
					<div className="flex items-start">
						<svg
							className="w-5 h-5 mr-2 mt-0.5"
							viewBox="0 0 20 20"
							fill="currentColor"
							xmlns="http://www.w3.org/2000/svg">
							<path
								fillRule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
								clipRule="evenodd"
							/>
						</svg>
						<span className="font-semibold">
							Entièrement indétectable
						</span>
					</div>
					<div className="flex items-start">
						<svg
							className="w-5 h-5 mr-2 mt-0.5"
							viewBox="0 0 20 20"
							fill="currentColor"
							xmlns="http://www.w3.org/2000/svg">
							<path
								fillRule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
								clipRule="evenodd"
							/>
						</svg>
						<span className="font-semibold">Plus de 10 millions</span>
						<span>Questions résolues</span>
					</div>
					<div className="flex items-start">
						<svg
							className="w-5 h-5 mr-2 mt-0.5"
							viewBox="0 0 20 20"
							fill="currentColor"
							xmlns="http://www.w3.org/2000/svg">
							<path
								fillRule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
								clipRule="evenodd"
							/>
						</svg>
						<span className="font-semibold">
							Sans plagiat et discret
						</span>
					</div>
					<div className="flex items-start">
						<svg
							className="w-5 h-5 mr-2 mt-0.5"
							viewBox="0 0 20 20"
							fill="currentColor"
							xmlns="http://www.w3.org/2000/svg">
							<path
								fillRule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
								clipRule="evenodd"
							/>
						</svg>
						<span className="font-semibold">Propulsé par </span>
						<span>une intelligence artificielle de pointe</span>
					</div>
					<div className="flex items-start">
						<svg
							className="w-5 h-5 mr-2 mt-0.5"
							viewBox="0 0 20 20"
							fill="currentColor"
							xmlns="http://www.w3.org/2000/svg">
							<path
								fillRule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
								clipRule="evenodd"
							/>
						</svg>
						<span className="font-semibold">Plus de 530 000 étudiants</span>
					</div>
				</div>

				<div className="text-center text-sm text-gray-500 mb-4">
					Annulation à tout moment | Garantie de satisfaction | Renouvellement à 5,99 $/semaine
				</div>

				<hr className="text-gray-300" />
				<div className="flex justify-between items-center mt-1">
					<div className="flex space-x-2">
						<Image
							src="/paymentMethods.png"
							alt="payments"
							width={216}
							height={33}
							className="object-cover"
						/>
					</div>
					<div className="flex flex-col items-center">
						<span>Question résolue</span>
						<span className="font-bold text-2xl ml-1">Plus de 10 millions</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EtudifySubscription;
