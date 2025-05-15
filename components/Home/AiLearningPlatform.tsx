import { Camera, Sparkles } from "lucide-react";
import React from "react";

interface FeatureCardProps {
	videoSrc: string;
	videoAlt: string;
	icon: React.ReactNode;
	title: string;
	description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
	videoSrc,
	icon,
	title,
	description,
}) => {
	return (
		<div className="bg-white rounded-2xl border border-gray-300 shadow-md flex flex-col">
			<div className="flex-grow">
				<video
					id="Personal AI"
					autoPlay
					muted
					loop
					playsInline
					className="h-full w-full rounded-2xl max-h-full">
					<source src={videoSrc} type="video/mp4" />
				</video>
			</div>

			<div className="p-6">
				<div className="flex items-center gap-3 mb-3">
					<div className="text-blue-500">{icon}</div>
					<h2 className="text-xl font-bold">{title}</h2>
				</div>

				<p className="text-gray-700">{description}</p>
			</div>
		</div>
	);
};

const AILearningPlatform: React.FC = () => {
	const featureData = [
		{
			videoSrc:
				"https://www.Etudify.gg/assets/videos/Screenshot/screenshot.mp4",
			videoAlt: "Capture d’écran d’une question d’histoire",
			icon: <Camera size={24}  className="text-gray-500"/>,
			title: "Capturez n'importe quelle question",
			description:
				"Vous ne voulez pas utiliser le bouton ou préférez rester discret ? Prenez une capture d’écran… et voilà !",
		},
		{
			videoSrc:
				"https://www.Etudify.gg/assets/videos/Highlight/highlight.mp4",
			videoAlt: "Capture d’écran d’une question de biologie",
			icon: <Sparkles size={24} className="text-gray-500" />,
			title: "Surligner et résoudre",
			description:
				"Surlignez n’importe quelle question et obtenez des réponses instantanément, sans effort",
		},
		{
			videoSrc:
            "https://www.Etudify.gg/assets/videos/ai-chat/ai-chat.mp4"
				,
			videoAlt: "Capture d’écran d’une question de biologie",
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="25"
					height="20"
					viewBox="0 0 20 20"
					fill="none">
					<path
						d="M10 0C4.48625 0 0 4.48485 0 9.99688C0 11.7388 0.46375 13.4633 1.3275 14.9591C1.62375 15.5152 1.2075 17.4595 0.275 18.3943C0.01375 18.6554 -0.0700001 19.0465 0.0624999 19.3914C0.19375 19.7363 0.5175 19.9725 0.88625 19.9925C0.985 19.9975 1.08625 20 1.18875 20C2.62 20 4.35625 19.4914 5.48875 18.9116C6.33375 19.3402 7.2275 19.6464 8.1525 19.8213C8.75625 19.9363 9.3775 19.9938 10 19.9938C15.5138 19.9938 20 15.5089 20 9.99688C20 4.48485 15.5138 0 10 0ZM6.25 11.2465C5.56 11.2465 5 10.6867 5 9.99688C5 9.30709 5.56 8.74727 6.25 8.74727C6.94 8.74727 7.5 9.30709 7.5 9.99688C7.5 10.6867 6.94 11.2465 6.25 11.2465ZM10 14.9953C8.76375 14.9953 7.6925 14.0756 7.50625 12.856C7.47875 12.676 7.5375 12.4973 7.6625 12.3736C7.785 12.2524 7.95125 12.1987 8.12375 12.2249C9.355 12.4174 10.6313 12.4186 11.8675 12.2249C12.0425 12.1987 12.2137 12.2537 12.3375 12.3774C12.4613 12.5011 12.5188 12.6785 12.4925 12.8535C12.3075 14.0744 11.235 14.9953 9.99875 14.9953H10ZM13.75 11.2465C13.06 11.2465 12.5 10.6867 12.5 9.99688C12.5 9.30709 13.06 8.74727 13.75 8.74727C14.44 8.74727 15 9.30709 15 9.99688C15 10.6867 14.44 11.2465 13.75 11.2465Z"
						fill="gray"></path>
				</svg>
			),
			title: "IA personnelle",
			description:
				"Coincé sur une question ? Pas de souci. Votre IA personnelle est là pour répondre à tous vos besoins d’étude!",
		},
		{
			videoSrc:
				"https://www.Etudify.gg/assets/videos/answers-anything/answers-anything.mp4",
			videoAlt: "Capture d’écran d’une question de biologie",
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="25"
					height="20"
					viewBox="0 0 21 16"
					fill="none">
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M10.7464 0.545549L19.8666 4.40115C19.9691 4.44694 20.0562 4.52145 20.1173 4.61568C20.1785 4.7099 20.211 4.81981 20.211 4.93212C20.211 5.04443 20.1785 5.15434 20.1173 5.24856C20.0562 5.34279 19.9691 5.4173 19.8666 5.46309L18.7526 5.93506C18.7516 6.12614 18.7521 7.07144 18.7527 8.09061C18.7535 9.29557 18.7543 10.6038 18.7525 10.8908C19.311 11.1778 19.4926 12.2061 19.1586 12.7787L19.8076 15.0587C19.8256 15.1282 19.8218 15.2015 19.7968 15.2688C19.7717 15.3361 19.7267 15.3941 19.6676 15.435C19.6086 15.4758 19.5385 15.4976 19.4667 15.4973C19.3949 15.4971 19.3249 15.4748 19.2662 15.4335C19.0053 15.2375 18.6867 15.1337 18.3604 15.1385C18.0538 15.146 17.7569 15.2478 17.5102 15.4301C17.4537 15.4729 17.3854 15.4973 17.3146 15.4998C17.2437 15.5023 17.1739 15.4828 17.1146 15.4439C17.0548 15.4063 17.0083 15.351 16.9816 15.2856C16.9548 15.2203 16.9492 15.1483 16.9653 15.0795L17.4755 12.7891C17.0893 12.153 17.3692 10.9779 18.0585 10.804C18.0598 10.5593 18.059 9.64212 18.0583 8.68883C18.0574 7.59616 18.0565 6.45602 18.0585 6.22658C16.5121 6.88266 12.3564 8.63934 10.7464 9.3187C10.6045 9.37792 10.445 9.37916 10.3022 9.32217L5.2909 7.20868C5.04437 7.10145 3.96079 6.64513 2.95137 6.22003C2.13918 5.87799 1.375 5.55617 1.13347 5.45268C1.03059 5.40653 0.943298 5.33155 0.882171 5.2368C0.821044 5.14205 0.788703 5.03162 0.789066 4.91886C0.789428 4.80611 0.822479 4.69588 0.884213 4.60153C0.945948 4.50718 1.03372 4.43275 1.13689 4.38727L10.3022 0.545549C10.3724 0.515496 10.4479 0.5 10.5243 0.5C10.6006 0.5 10.6762 0.515496 10.7464 0.545549ZM9.19368 9.60623C9.62545 9.78865 9.9384 9.92087 10.0323 9.96048C10.3479 10.0906 10.7022 10.0906 11.0179 9.96048C11.1079 9.92241 11.4107 9.79453 11.8307 9.61717C13.3155 8.99009 16.2649 7.74451 16.4525 7.66309V11.0432C16.4498 11.2281 16.402 11.4096 16.313 11.5717C16.2241 11.7338 16.0968 11.8717 15.9424 11.9733C14.2599 13.0934 12.2752 13.6723 10.2544 13.6322C8.41023 13.5793 6.61965 13.0001 5.09392 11.9629C4.94321 11.8618 4.8193 11.7256 4.73286 11.566C4.64641 11.4064 4.60002 11.2282 4.59766 11.0467V7.66656C4.79732 7.74883 7.70334 8.97658 9.19368 9.60623Z"
						fill="gray"></path>
				</svg>
			),
			title: "Répond à tout, absolument tout",
			description:
				"Quiz, test, devoirs? Nous avons ce qu'il vous faut. Question de mathématiques? Aucun problème. Images ou diagrammes? Un jeu d'enfant.",
		},
	];

	return (
		<div id="how-it-works" className="max-w-5xl mx-auto px-4 mt-20 py-12">
			<h1 className="text-3xl md:text-5xl font-bold text-center mb-12">
				Boostez votre apprentissage avec
				<br /> une approche native de l&apos;IA
			</h1>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{featureData.map((feature, index) => (
					<FeatureCard
						key={index}
						videoSrc={feature.videoSrc}
						videoAlt={feature.videoAlt}
						icon={feature.icon}
						title={feature.title}
						description={feature.description}
					/>
				))}
			</div>
		</div>
	);
};

export default AILearningPlatform;
