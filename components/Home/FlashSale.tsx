"use client";
import { FlameIcon, GiftIcon } from "lucide-react";
import { useEffect, useState } from "react";

type FlashSaleBannerProps = {
	saleText: string;
	price: string;
	endTime: Date;
};

const FlashSaleBanner = ({
	saleText = "Vente flash : Essayez pendant",
	price = "$0.99",
	endTime = new Date(Date.now() + 10 * 60 * 60 * 1000),
}: FlashSaleBannerProps) => {
	const [timeLeft, setTimeLeft] = useState<{
		hours: number;
		minutes: number;
		seconds: number;
	}>({
		hours: 0,
		minutes: 0,
		seconds: 0,
	});

	useEffect(() => {
		const calculateTimeLeft = () => {
			const difference = endTime.getTime() - new Date().getTime();

			if (difference > 0) {
				const hours = Math.floor(difference / (1000 * 60 * 60));
				const minutes = Math.floor(
					(difference % (1000 * 60 * 60)) / (1000 * 60)
				);
				const seconds = Math.floor((difference % (1000 * 60)) / 1000);

				setTimeLeft({ hours, minutes, seconds });
			} else {
				setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
			}
		};

		// Calculate once right away
		calculateTimeLeft();

		// Set up interval to update every second
		const timerId = setInterval(calculateTimeLeft, 1000);

		// Cleanup interval on component unmount
		return () => clearInterval(timerId);
	}, [endTime]);

	// Helper to pad numbers with leading zero
	const padWithZero = (num: number): string => {
		return num.toString().padStart(2, "0");
	};

	return (
		<div className="w-full bg-gray-900 text-white py-2 px-4 flex items-center justify-center">
			<div className="flex items-center space-x-2 text-sm md:text-base">
				<FlameIcon className="h-5 w-5 text-orange-400" />
				<span>
					{saleText} <span className="font-bold">{price}</span>
				</span>
				<span className="ml-2">Se termine bientôt:</span>

				<div className="flex items-center space-x-1">
					<div className="bg-gray-800 rounded px-2 py-1 min-w-6 text-center">
						{padWithZero(timeLeft.hours)}
					</div>
					<span>:</span>
					<div className="bg-gray-800 rounded px-2 py-1 min-w-6 text-center">
						{padWithZero(timeLeft.minutes)}
					</div>
					<span>:</span>
					<div className="bg-gray-800 rounded px-2 py-1 min-w-6 text-center">
						{padWithZero(timeLeft.seconds)}
					</div>
				</div>
			</div>
		</div>
	);
};

// Demo component to show the banner in action
const FlashSale = () => {
	// Setting end time to 10 hours from now for demo
	const endTime = new Date();
	endTime.setHours(endTime.getHours() + 10);

	return (
		<div className="flex flex-col sticky top-0 z-[999]">
			<FlashSaleBanner
				saleText="Flash sale: Try for"
				price="$0.99"
				endTime={endTime}
			/>
			<div className="w-full bg-blue-200 text-gray-800 gap-2 py-2 px-4 flex items-center justify-center">
				<div className="flex gap-2 items-center space-x-2 text-sm md:text-base">
					<GiftIcon className="h-5 w-5 " />
					Vente anticipée du deuxième semestre
				</div>
			</div>
		</div>
	);
};

export default FlashSale;
