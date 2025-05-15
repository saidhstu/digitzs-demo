import Image from "next/image";
import React from "react";

type Testimonial = {
	id: number;
	date: string;
	text: string;
	name: string;
	rating?: number;
	platform?: "google" | "twitter";
};

const testimonials: Testimonial[] = [
	{
		id: 1,
		date: "1er août",
		text: "I never knew I needed this Chrome Extension so much until I started using it! Fully undetectable 🕵️‍♂️",
		name: "Jena Brown",
		platform: "twitter",
	},
	{
		id: 2,
		date: "1er août",
		text: "Cette extension a dépassé toutes mes attentes pour chaque question💯",
		name: "Mason Williams",
		platform: "google",
		rating: 5,
	},
	{
		id: 3,
		date: "20 nov.",
		text:  `J'avais un peu de doutes au début, car je l'avais utilisée pour quelques tests. 
			C'est tellement précis. Je suis tellement reconnaissant pour cela, car cela me permet de réussir n'importe quel quiz ou devoir facilement 🥰`,
		name: "Mark Atty",
		platform: "google",
		rating: 4,
	},
	{
		id: 4,
		date: "28 mars",
		text: `Si j'avais eu cela au lycée, j'aurais eu un 4.0 facile. 
           La seule chose que je n'aime pas, c'est que je viens juste de la découvrir alors que je suis sur le point de terminer mes études.`,
		name: "Devyn Ford",
		platform: "google",
		rating: 5,
	},
	{
		id: 5,
		date: "17 juil.",
		text: `Je n'ai jamais le temps d'étudier ou de me préparer pour les quiz, donc Etudify est un véritable sauveur. 
           Je n'ai plus jamais à m'inquiéter des quiz, des devoirs ou des tests. Super !`,
		name: "AJ Bell",
		rating: 5,
	},
	{
		id: 6,
		date: "14 juin",
		text: `C'est tellement rapide, je presse simplement le bouton et ça m'aide à répondre en 2 secondes.`,
		name: "Jennifer Hill",
		rating: 5,
	},
	{
		id: 7,
		date: "14 juin",
		text: "Fait exactement ce qu'il dit. Je l'utilise pour tout ce que je peux. J'adore !",
		name: "Luna Castillo",
		rating: 5,
	},
	{
		id: 8,
		date: "16 avr.",
		text: `Je ne savais même pas que ça existait ! Au début, ça ne s'intégrait pas avec BrightSpace, 
           mais mon ami m'a montré la fonction capture d'écran pour que ça fonctionne même si ce n'est pas intégré sur la plateforme.`,
		name: "Simon Sozzi",
		rating: 4,
	},
	{
		id: 9,
		date: "17 fév.",
		text: `Le support était super rapide. Au début, j'avais des problèmes pour me connecter, alors j'ai envoyé un e-mail 
           et ils m'ont aidé immédiatement. Merci !!`,
		name: "Adiana Madrigal",
		rating: 5,
	},
];

type TestimonialCardProps = {
	testimonial: Testimonial;
};

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
	// Render star icons if a rating is provided
	const starIcons = testimonial.rating
		? Array.from({ length: testimonial.rating }).map((_, i) => (
				<svg
					key={i}
					className="w-4 h-4 text-blue-400 fill-current"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg">
					<path d="M9.049.927c.3-.921 1.603-.921 1.902 0l1.945 5.973a1 1 0 00.95.69h6.281c.969 0 1.371 1.24.588 1.81l-5.082 3.693a1 1 0 00-.364 1.118l1.945 5.973c.3.921-.755 1.688-1.54 1.118l-5.082-3.693a1 1 0 00-1.176 0l-5.082 3.693c-.785.57-1.84-.197-1.54-1.118l1.945-5.973a1 1 0 00-.364-1.118L.286 9.4C-.498 8.83-.096 7.59.873 7.59h6.281a1 1 0 00.95-.69L9.049.927z" />
				</svg>
		  ))
		: null;

	return (
		<div className="border  border-gray-200 rounded-lg p-4 bg-white shadow-sm">
			{/* Top row: Date + Star Rating */}
			<div className="flex justify-between items-center mb-2">
				<span className="text-xs text-gray-500">
					{testimonial.date}
				</span>
				{starIcons && <div className="flex space-x-1">{starIcons}</div>}
			</div>

			{/* Main text */}
			<p className="text-sm text-gray-700 mb-4">{testimonial.text}</p>

			{/* Bottom row: Name + Platform Icon */}
			<div className="flex justify-between items-center">
				<p className="text-sm font-semibold text-gray-800">
					{testimonial.name}
				</p>
				{/* Display platform icon if available */}
				{testimonial.platform === "google" && (
					<Image
						src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
						alt="Google"
						width={20}
						height={20}
						className="h-5 w-5"
					/>
				)}
				{testimonial.platform === "twitter" && (
					<Image
						width={20}
						height={20}
						src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
						alt="Twitter"
						className="h-5 w-5"
					/>
				)}
			</div>
		</div>
	);
};

const Testimonials: React.FC = () => {
	return (
		<div id="reviews" className="max-w-6xl mx-auto px-4 py-8">
			<h2 className="text-center text-3xl font-bold mb-6">
				Rejoignez plus de 530 000 étudiants
			</h2>

			{/* Responsive 3-column layout */}
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
				{testimonials.map((testimonial) => (
					<TestimonialCard
						key={testimonial.id}
						testimonial={testimonial}
					/>
				))}
			</div>
		</div>
	);
};

export default Testimonials;
