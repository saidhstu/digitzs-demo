"use client";

import GlobalModal from "@/components/ui/modal";
import { CreditCard, Loader2, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import WrappedAddPaymentMethod from "./addPaymentMethod";

interface PaymentMethod {
	id: string;
	card: {
		brand: string;
		last4: string;
	};
}

interface PaymentMethodsResponse {
	paymentMethods: PaymentMethod[];
	defaultPaymentMethod: string | null;
}

const PaymentMethods = ({ customerId }: { customerId: string }) => {
	const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
	const [defaultPaymentMethod, setDefaultPaymentMethod] = useState<string | null>(null);
	const [addPaymentMethod, setAddPaymentMethod] = useState<string>("");
	const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);
	const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState<string>("");
	const [isLoading, setIsLoading] = useState(true);
	const [isDeleting, setIsDeleting] = useState<string | null>(null);

	useEffect(() => {
		const fetchPaymentMethods = async () => {
			setIsLoading(true);
			try {
				const res = await fetch(`/api/payment-methods/?customerId=${customerId}`);
				if (!res.ok) throw new Error("Échec de la récupération des méthodes de paiement");
				const data: PaymentMethodsResponse = await res.json();
				setPaymentMethods(data.paymentMethods);
				setDefaultPaymentMethod(data.defaultPaymentMethod);
			} catch (error) {
				console.error("Error fetching payment methods:", error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchPaymentMethods();
		setAddPaymentMethod("");
	}, [customerId, isUpdateSuccess]);

	useEffect(() => {
		setAddPaymentMethod("");
		setIsUpdateSuccess(false)
	}, [isUpdateSuccess]);

	const deletePaymentMethod = async (paymentMethodId: string) => {
		if (paymentMethodId === defaultPaymentMethod) return; // Prevent deletion of the default method
		setIsDeleting(paymentMethodId);
		try {
			const res = await fetch(`/api/payment-methods/?paymentMethodId=${paymentMethodId}`, {
				method: "DELETE",
			});
			if (!res.ok) throw new Error("Échec de la suppression de la méthode de paiement");
			setPaymentMethods((prev) => prev.filter((pm) => pm.id !== paymentMethodId));
			if (defaultPaymentMethod === paymentMethodId) {
				setDefaultPaymentMethod(null);
			}
		} catch (error) {
			console.error("Error deleting payment method:", error);
		} finally {
			setIsDeleting(null);
		}
	};

	return (
		<>
			<div className="bg-white p-6 rounded-3xl min-h-[200px]">
				<h2 className="text-lg border-b border-gray-300 pb-3 font-semibold flex items-center justify-between mb-4">
					<span>Méthodes de paiement</span>
					<button
						onClick={() => setAddPaymentMethod(customerId)}
						disabled={isLoading}
						style={{ 
							background: "linear-gradient(90deg, #626EBF 0%, #908EED 100%)"
						}}
						className="bg-blue-600 text-[16px] hover:bg-blue-700 text-white cursor-pointer rounded px-4 py-1 disabled:opacity-50 disabled:cursor-not-allowed">
						Mettre à jour
					</button>
				</h2>
				
				{isLoading ? (
					<div className="flex items-center justify-center h-[150px]">
						<Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
						<span className="ml-2 text-gray-600">Chargement des méthodes de paiement...</span>
					</div>
				) : paymentMethods.length === 0 ? (
					<div className="text-center py-10 text-gray-500">
						<p>Aucune méthode de paiement trouvée.</p>
						<p className="mt-2 text-sm">Cliquez sur le bouton « Mettre à jour » pour ajouter une méthode de paiement.</p>
					</div>
				) : (
					<ul>
						{paymentMethods.map((method) => (
							<li key={method.id} className="flex justify-between items-center p-3 border-b">
								<div className="flex items-center space-x-3">
									<CreditCard className="text-gray-600 h-6 w-6" />
									<span>
										**** **** **** {method.card.last4} ({method.card.brand})
										{method.id === defaultPaymentMethod && (
											<span className="ml-2 text-green-500 font-bold">Par défaut</span>
										)}
									</span>
								</div>
								{isDeleting === method.id ? (
									<Loader2 className="h-5 w-5 text-red-500 animate-spin" />
								) : (
									<button
										className={`text-red-500 cursor-pointer hover:text-red-700 ${
											method.id === defaultPaymentMethod ? "opacity-50 cursor-not-allowed" : ""
										}`}
										onClick={() => setConfirmDeleteModalOpen(method.id)}
										disabled={method.id === defaultPaymentMethod}>
										<Trash2 className="h-5 w-5" />
									</button>
								)}
							</li>
						))}
					</ul>
				)}
			</div>

			{/* Confirm Delete Modal */}
			<GlobalModal
				className="bg-gray-200"
				isOpen={confirmDeleteModalOpen !== ""}
				title="Confirmation"
				onClose={() => setConfirmDeleteModalOpen("")}>
				{confirmDeleteModalOpen === defaultPaymentMethod ? (
					<p className="text-red-500 font-semibold">
						Vous ne pouvez pas supprimer la méthode de paiement par défaut. Veuillez d’abord définir une autre méthode comme méthode par défaut.
					</p>
				) : (
					<>
						<p className="text-gray-700 mb-4">Êtes-vous sûr de vouloir supprimer cette méthode de paiement ?</p>
						<div className="flex justify-end space-x-4">
							<button
								className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 cursor-pointer"
								onClick={() => setConfirmDeleteModalOpen("")}>
								Cancel
							</button>
							<button
								style={{ 
									background: "linear-gradient(90deg, #626EBF 0%, #908EED 100%)"
								}}
								className=" text-white px-4 cursor-pointer py-2 rounded hover:bg-red-600"
								onClick={() => {
									deletePaymentMethod(confirmDeleteModalOpen);
									setConfirmDeleteModalOpen("");
								}}>
								{isDeleting === confirmDeleteModalOpen ? (
									<div className="flex items-center">
										<Loader2 className="h-4 w-4 animate-spin mr-2" />
										Suppression...
									</div>
								) : (
									"Confirm Delete"
								)}
							</button>
						</div>
					</>
				)}
			</GlobalModal>

			{/* Add Payment Method Modal */}
			<GlobalModal
				className="bg-gray-200"
				isOpen={addPaymentMethod !== ""}
				title="Mettre à jour le mode de paiement"
				onClose={() => setAddPaymentMethod("")}>
				<WrappedAddPaymentMethod customerId={addPaymentMethod} setIsSuccess={setIsUpdateSuccess} />
			</GlobalModal>
		</>
	);
};

export default PaymentMethods;