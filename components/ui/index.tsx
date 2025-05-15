/* eslint-disable @typescript-eslint/no-unused-vars */
import { cva, type VariantProps } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
// Button Component
interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const buttonVariants = cva(
	"inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
	{
		variants: {
			variant: {
				default:
					"bg-primary text-primary-foreground hover:bg-primary/90",
				destructive:
					"bg-destructive text-destructive-foreground hover:bg-destructive/90",
				outline:
					"border border-input hover:bg-accent hover:text-accent-foreground",
				secondary:
					"bg-secondary text-secondary-foreground hover:bg-secondary/80",
				ghost: "hover:bg-accent hover:text-accent-foreground",
				link: "underline-offset-4 hover:underline text-primary",
			},
			size: {
				default: "h-10 py-2 px-4",
				sm: "h-9 px-3 rounded-md",
				lg: "h-11 px-8 rounded-md",
				icon: "h-10 w-10",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
);

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		return (
			<button
				ref={ref}
				className={cn(buttonVariants({ variant, size, className }))}
				{...props}
			/>
		);
	}
);
Button.displayName = "Button";

// Card Component
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
	variant?: "default" | "destructive";
}

const Card = ({ className, variant = "default", ...props }: CardProps) => {
	return (
		<div
			className={cn(
				"rounded-lg border bg-card text-card-foreground shadow-sm",
				variant === "destructive" &&
					"border-destructive/50 bg-destructive/10",
				className
			)}
			{...props}
		/>
	);
};

const CardHeader = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => {
	return (
		<div
			className={cn("flex flex-col space-y-1.5 p-6 pb-0", className)}
			{...props}
		/>
	);
};

const CardTitle = ({
	className,
	...props
}: React.HTMLAttributes<HTMLHeadingElement>) => {
	return (
		<h3
			className={cn(
				"text-2xl font-semibold leading-none tracking-tight",
				className
			)}
			{...props}
		/>
	);
};

const CardContent = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => {
	return <div className={cn("p-6 pt-0", className)} {...props} />;
};

// Dialog Component
interface DialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	children: React.ReactNode;
}

const Dialog = ({ open, onOpenChange, children }: DialogProps) => {
	return open ? (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/50"
			onKeyDown={(e) => {
				if (e.key === "Escape") onOpenChange(false);
			}}>
			<div className="relative w-full max-w-lg m-4">{children}</div>
		</div>
	) : null;
};

const DialogContent = ({
	children,
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => {
	return (
		<div
			className={cn(
				"relative bg-white rounded-lg shadow-lg p-6 space-y-4",
				"dark:bg-gray-800 dark:text-white",
				className
			)}
			{...props}>
			{children}
		</div>
	);
};

const DialogHeader = ({
	children,
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => {
	return (
		<div className={cn("space-y-2", className)} {...props}>
			{children}
		</div>
	);
};

const DialogTitle = ({
	children,
	className,
	...props
}: React.HTMLAttributes<HTMLHeadingElement>) => {
	return (
		<h2
			className={cn(
				"text-xl font-semibold leading-none tracking-tight",
				className
			)}
			{...props}>
			{children}
		</h2>
	);
};

const DialogDescription = ({
	children,
	className,
	...props
}: React.HTMLAttributes<HTMLParagraphElement>) => {
	return (
		<p
			className={cn(
				"text-sm text-gray-500 dark:text-gray-400",
				className
			)}
			{...props}>
			{children}
		</p>
	);
};

export {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
};

