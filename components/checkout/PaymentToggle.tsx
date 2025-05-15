/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import CardDetailsForm from "./CardDetailsForm";

type PaymentMethod = "card" | "bank";

const PaymentMethodToggle = () => {
	const [activeMethod, setActiveMethod] = useState<PaymentMethod>("card");

	return (
		<div className="">
			{/* Toggle Button */}
			{/* <div className="relative mb-6 rounded-full bg-gray-100 p-1 flex w-full max-w-xs mx-auto">
				<button
					onClick={() => setActiveMethod("card")}
					className={`relative rounded-full py-2 px-4 text-sm font-medium transition-all duration-200 flex-1 z-10 ${
						activeMethod === "card"
							? "text-gray-800"
							: "text-gray-500"
					}`}>
					<div className="flex items-center justify-center">
						<svg
							className="w-5 h-5 mr-2"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
							/>
						</svg>
						Card
					</div>
				</button>
				<button
					onClick={() => setActiveMethod("bank")}
					className={`relative rounded-full py-2 px-4 text-sm font-medium transition-all duration-200 flex-1 z-10 ${
						activeMethod === "bank"
							? "text-gray-800"
							: "text-gray-500"
					}`}>
					<div className="flex items-center justify-center">
						<svg
							className="w-5 h-5 mr-2"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
							/>
						</svg>
						Bank
					</div>
				</button>

				Animated Background Pill
				<motion.div
					className="absolute top-1 bottom-1 rounded-full bg-white shadow-sm"
					initial={{
						x: activeMethod === "card" ? 0 : "100%",
						width: "50%",
					}}
					animate={{
						x: activeMethod === "card" ? 0 : "100%",
						width: "50%",
					}}
					transition={{ type: "spring", stiffness: 300, damping: 30 }}
					style={{
						left: 0,
						transform:
							activeMethod === "card"
								? "translateX(0%)"
								: "translateX(0%)",
					}}
				/>
			</div> */}

			{/* Payment Method Content */}
			<div className="mt-6">
				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{
						opacity: activeMethod === "card" ? 1 : 0,
						y: activeMethod === "card" ? 0 : 10,
						display: activeMethod === "card" ? "block" : "none",
					}}
					transition={{ duration: 0.3 }}>
					{activeMethod === "card" && <CardDetailsForm />}
				</motion.div>

				{/* <motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{
						opacity: activeMethod === "bank" ? 1 : 0,
						y: activeMethod === "bank" ? 0 : 10,
						display: activeMethod === "bank" ? "block" : "none",
					}}
					transition={{ duration: 0.3 }}>
					{activeMethod === "bank" && <BankDetailsComponent />}
				</motion.div> */}
			</div>
		</div>
	);
};

export default PaymentMethodToggle;
