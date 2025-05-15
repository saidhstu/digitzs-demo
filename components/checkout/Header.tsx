import Logo from "@/public/logo";
import React from "react";

const Header: React.FC = () => {
	return (
		<div className="mb-6 text-center">
			<div className="flex justify-center">
				<div className="flex items-center">
					<Logo />
				</div>
			</div>
			<div className="mt-4">
				<span className="text-blue-600 font-semibold">Essai de 3 jours</span>
				<span className="ml-2 text-gray-800 font-bold">
					N’attendez plus – Améliorez vos notes dès aujourd’hui!
				</span>
			</div>
		</div>
	);
};

export default Header;
