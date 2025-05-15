// File: components/common/PhoneNumberInput.tsx
"use client";

import { ErrorMessage, Field, useFormikContext } from "formik";
import { E164Number, isValidPhoneNumber } from "libphonenumber-js";
import React, { useState } from "react";
import PhoneInput, { Country } from "react-phone-number-input";
import "react-phone-number-input/style.css";

interface PhoneNumberInputProps {
	name: string;
	label?: string;
	required?: boolean;
	initialCountry?: Country;
	className?: string;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
	name,
	label = "Phone Number",
	required = false,
	initialCountry = "US",
	className = "",
}) => {
	//   const [country, setCountry] = useState<Country>(initialCountry);
	const [value, setValue] = useState<E164Number | undefined>(undefined);
	const [touched, setTouched] = useState(false);
	const [validationError, setValidationError] = useState<string | null>(null);

	const { setFieldValue, setFieldTouched } = useFormikContext();

	const handleChange = (phoneNumber: E164Number | undefined) => {
		setValue(phoneNumber);
		setFieldValue(name, phoneNumber || "");

		// Validate the phone number
		if (phoneNumber) {
			try {
				const isValid = isValidPhoneNumber(phoneNumber);
				if (!isValid) {
					setValidationError(
						"Invalid phone number for the selected country"
					);
				} else {
					setValidationError(null);
				}
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
			} catch (error) {
				setValidationError("Please enter a valid phone number");
			}
		} else {
			setValidationError(required ? "Phone number is required" : null);
		}
	};

	const handleBlur = () => {
		setTouched(true);
		setFieldTouched(name, true);
	};

	return (
		<div className={`mb-4 ${className}`}>
			<label
				htmlFor={name}
				className="mb-1 block text-sm font-medium text-gray-700">
				{label} {required && <span className="text-blue-500">*</span>}
			</label>

			<div
				className={`rounded-md border ${
					touched && validationError
						? "border-red-500"
						: "border-gray-300"
				} focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200`}>
				<PhoneInput
					id={name}
					name={name}
					international
					defaultCountry={initialCountry}
					value={value}
					onChange={handleChange}
					onBlur={handleBlur}
					countryCallingCodeEditable={false}
					className="w-full rounded-md px-4 py-2 outline-none"
				/>
			</div>

			{touched && validationError && (
				<div className="mt-1 flex items-center text-sm text-red-500">
					<div className="mr-1 h-4 w-4 rounded-full bg-red-100 text-center text-xs text-red-500">
						!
					</div>
					<span>{validationError}</span>
				</div>
			)}

			{/* This hidden field is for Formik to track */}
			<Field type="hidden" name={name} />
			{!validationError && (
				<ErrorMessage
					name={name}
					component="div"
					className="mt-1 text-sm text-red-500"
				/>
			)}
		</div>
	);
};

export default PhoneNumberInput;
