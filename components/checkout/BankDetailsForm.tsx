"use client";

import React, { useState } from "react";

// Define bank interface
interface Bank {
	id: string;
	name: string;
	logo: string;
}

const BankDetailsForm: React.FC = () => {
	const [searchQuery, setSearchQuery] = useState<string>("");

	// List of available banks
	const banks: Bank[] = [
		{
			id: "bank-of-america",
			name: "Bank of America",
			logo: "/bank-logos/bank-of-america.svg",
		},
		{ id: "pnc", name: "PNC", logo: "/bank-logos/pnc.svg" },
		{
			id: "wells-fargo",
			name: "Wells Fargo",
			logo: "/bank-logos/wells-fargo.svg",
		},
		{ id: "chase", name: "Chase", logo: "/bank-logos/chase.svg" },
		{ id: "usaa", name: "USAA", logo: "/bank-logos/usaa.svg" },
		{
			id: "navy-federal",
			name: "Navy Federal Credit Union",
			logo: "/bank-logos/navy-federal.svg",
		},
	];

	// Filter banks based on search
	const filteredBanks = searchQuery
		? banks.filter((bank) =>
				bank.name.toLowerCase().includes(searchQuery.toLowerCase())
		  )
		: banks;

	return (
		<div className="mb-6">
			{/* Search input */}
			<div className="relative mb-4">
				<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
					<svg
						className="h-5 w-5"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
				</div>
				<input
					type="text"
					placeholder="Search for your bank"
					className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-500 focus:outline-none"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
			</div>

			{/* Banks grid */}
			<div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
				{filteredBanks.map((bank) => (
					<label
						key={bank.id}
						htmlFor={bank.id}
						className="flex items-center justify-center p-4 border border-gray-200 rounded-md hover:border-blue-500 cursor-pointer transition-colors">
						<input
							type="radio"
							id={bank.id}
							name="selectedBank"
							value={bank.id}
							className="sr-only"
						/>
						<div className="h-10 flex items-center justify-center">
							{/* For demo purposes, we'll use div with bank names instead of actual images */}
							{/* In a real app, you would use Next.js Image component with actual bank logos */}
							<div className="text-center">
								{bank.id === "bank-of-america" && (
									<div className="flex items-center text-blue-700 font-semibold">
										<span>Bank</span>
										<span className="text-red-600 mx-1">
											of
										</span>
										<span>America</span>
									</div>
								)}
								{bank.id === "pnc" && (
									<div className="text-orange-600 font-bold text-xl">
										PNC
									</div>
								)}
								{bank.id === "wells-fargo" && (
									<div className="text-red-700 font-bold">
										WELLS FARGO
									</div>
								)}
								{bank.id === "chase" && (
									<div className="flex items-center text-gray-800 font-bold">
										CHASE
										<div className="ml-1 w-5 h-5 bg-blue-500 rounded-sm"></div>
									</div>
								)}
								{bank.id === "usaa" && (
									<div className="flex items-center text-gray-800 font-bold">
										<span>USAA</span>
										<span className="text-xs ml-1">®</span>
									</div>
								)}
								{bank.id === "navy-federal" && (
									<div className="text-center">
										<div className="text-navy-blue font-semibold text-sm">
											NAVY FEDERAL
										</div>
										<div className="text-navy-blue text-xs">
											Credit Union
										</div>
									</div>
								)}
							</div>
						</div>
					</label>
				))}
			</div>
		</div>
	);
};

export default BankDetailsForm;
