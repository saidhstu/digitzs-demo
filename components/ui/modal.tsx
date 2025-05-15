/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import Modal from "react-modal";

// Types for modal props
interface GlobalModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
	title?: string;
	className?: string;
}

const GlobalModal: React.FC<GlobalModalProps> = ({
	isOpen,
	onClose,
	children,
	title,
	className = "",
}) => {
	// Set app element on component mount
	useEffect(() => {
		// Try multiple selectors
		const appElement =
			document.getElementById("__next") ||
			document.getElementById("root") ||
			document.body;

		Modal.setAppElement(appElement);
	}, []);

	// Custom styles for the modal
	const customStyles:any = {
		overlay: {
			backgroundColor: "rgba(0, 0, 0, 0.7)",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			zIndex: 1000,
		},
		content: {
			position: "relative",
			top: "auto",
			left: "auto",
			right: "auto",
			bottom: "auto",
			border: "none",
			background: "white",
			overflow: "visible",
			borderRadius: "1rem",
			padding: 0,
			maxWidth: "500px",
			width: "90%",
			margin: "0 auto",
		},
	};

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onClose}
			style={customStyles}
			contentLabel={title}
			className={`bg-white rounded-2xl shadow-xl ${className}`}
			overlayClassName="fixed inset-0 flex items-center justify-center">
			{/* Modal Header */}
			{title && (
				<div className=" bg-blue-400 text-white px-6 py-4 rounded-t-2xl border-b relative">
					<h2 className="text-xl font-bold">{title}</h2>
					<button
						onClick={onClose}
						className="absolute cursor-pointer top-1/2 right-4 transform -translate-y-1/2 text-white hover:text-blue-200 transition-colors">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>
			)}

			{/* Modal Content */}
			<div className="p-6">{children}</div>
		</Modal>
	);
};

export default GlobalModal;