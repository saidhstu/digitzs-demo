import {
    Award,
    Check,
    CheckCircle,
    Clock,
    LifeBuoy,
    Shield,
    Star,
} from "lucide-react";
import Image from "next/image";

const Hero = () => {
	return (
		<div className="flex mt-10 flex-col md:flex-row max-w-6xl mx-auto p-4 gap-8 bg-gray-50">
			{/* Left Column - Product Info */}
			<div className="w-full md:w-1/2 flex flex-col">
				{/* Rating Bar */}
				<div className="flex items-center mb-5">
					<div className="flex -space-x-2 mr-3">
						<Image
							src="https://cdn-icons-png.freepik.com/512/6596/6596121.png"
							alt="User avatar"
							width={32}
							height={32}
							className="w-8 h-8 rounded-full border-2 border-white"
						/>
						<Image
							src="https://cdn-icons-png.freepik.com/512/6596/6596121.png"
							alt="User avatar"
							width={32}
							height={32}
							className="w-8 h-8 rounded-full border-2 border-white"
						/>
						<Image
							src="https://cdn-icons-png.freepik.com/512/6596/6596121.png"
							alt="User avatar"
							width={32}
							height={32}
							className="w-8 h-8 rounded-full border-2 border-white"
						/>
					</div>
					<div className="font-bold">4.8/5</div>
					<div className="flex mx-2">
						{[1, 2, 3, 4, 5].map((star) => (
							<Star
								key={star}
								className="w-5 h-5 fill-blue-400 text-blue-400"
							/>
						))}
					</div>
					<div className="text-sm text-gray-600">
						Basé sur plus de 530 000 utilisateurs
					</div>
				</div>

				{/* Main Heading */}
				<h1 className="text-2xl md:text-3xl font-bold text-gray-900 ">
					Extension Chrome IA
				</h1>
				<h2 className="text-lg md:text-xl font-bold text-gray-800 mb-5">
					Répond à toutes vos questions, facilement et sans effort.
				</h2>

				{/* Feature List */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
					<div className="flex items-center">
						<Check className="w-5 h-5 text-green-500 mr-2" />
						<span className="text-sm">
							Fonctionne sur n&apos;importe quel{" "}
							<strong>plateforme/devoir en ligne</strong>
						</span>
					</div>
					<div className="flex  text-sm items-center">
						<Check className="w-5 h-5 text-green-500 mr-2" />
						<span>
							Plus de <strong>530 000+</strong> utilisateurs actifs
						</span>
					</div>
					<div className="flex text-sm items-center">
						<Check className="w-5 h-5 text-green-500 mr-2" />
						<span>
							Entièrement <strong>indétectable et sans plagiat</strong>
						</span>
					</div>
					<div className="flex text-sm items-center">
						<Check className="w-5 h-5 text-green-500 mr-2" />
						<span>
							<strong>Réponses instantanées</strong> et explications
						</span>
					</div>
				</div>

				{/* CTA Button */}
				<button className=" cursor-pointer  bg-blue-500 hover:bg-blue-600 text-gray-900 text-lg font-medium py-4 px-8 rounded-lg w-full mb-5 transition-colors shadow-lg bg-gradient-to-r from-blue-500 to-blue-600">
					Essayez pour 0,99 $
				</button>

				{/* Trust Badges */}
				<div className="flex justify-center text-sm text-gray-600 mb-5 space-x-4">
					<div className="flex items-center">
						<Shield className="w-4 h-4 mr-1" />
						<span>Satisfaction garantie</span>
					</div>
					<div className="flex items-center">
						<Clock className="w-4 h-4 mr-1" />
						<span>Annulation à tout moment</span>
					</div>
					<div className="flex items-center">
						<LifeBuoy className="w-4 h-4 mr-1" />
						<span>Support client 24/7</span>
					</div>
				</div>

				{/* Stats */}
				<div className="flex justify-between items-center">
					<div className="flex flex-col items-center">
						<div className="flex items-center">
							<div className="w-12 h-12 flex items-center justify-center">
								<Award />
							</div>
							<div className="font-bold text-xl">98%</div>
						</div>
						<div className="text-sm">Réponses Précises</div>
					</div>

					<div className="flex flex-col items-center">
						<div className="flex items-center">
							<div className="w-12 h-12 flex items-center justify-center">
								<Star />
							</div>
							<div className="font-bold text-xl">4,8 étoiles</div>
						</div>
						<div className="text-sm">Évalué par les étudiants</div>
					</div>

					<div className="flex flex-col items-center">
						<div className="flex items-center">
							<div className="w-12 h-12 flex items-center justify-center">
								<CheckCircle />
							</div>
							<div className="font-bold text-xl">Plus de 10 millions</div>
						</div>
						<div className="text-sm">Questions résolues</div>
					</div>
				</div>
			</div>

			{/* Right Column - Product Demo */}
			<div className="w-full md:w-1/2">
				{/* Performance Badge */}
				<div className="bg-blue-50 p-3 rounded-lg mb-5 flex items-center justify-center">
					{/* <Lightning className="w-5 h-5 text-blue-500 mr-2" /> */}
					<span className="font-medium">
						Maintenant 3 fois plus rapide ET 71 % plus précis
					</span>
				</div>

				{/* Demo Screenshot */}

				<div className="flex-grow">
					<video
						id="Personal AI"
						autoPlay
						muted
						loop
            height='700'
						playsInline
						className="h-full w-full  max-h-full">
						<source
							src={
								"https://www.Etudify.gg/assets/videos/hero/hero-section.mp4"
							}
							type="video/mp4"
						/>
					</video>
				</div>
			</div>
		</div>
	);
};

export default Hero;
