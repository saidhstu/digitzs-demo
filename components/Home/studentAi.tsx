import Image from "next/image";

const StudentAITool = () => {
	return (
		<div className="max-w-6xl mx-auto px-4 py-12">
			<h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
				L&apos;IA la plus puissante
				<br />
				outil pour les étudiants
			</h1>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{/* Plagiarism Free Card */}
				<div className="bg-gray-100 rounded-3xl justify-between p-8 flex flex-col items-center">
					<div className=" flex items-center justify-center w-[289.58px] my-auto h-[169.58px]">
						<Image
							className=" object-contain"
							src={"/plagarism.png"}
							alt="paper mode"
							width={289.58}
							height={169.58}
						/>
					</div>
					<h2 className="text-xl font-semibold">Sans plagiat</h2>
				</div>

				{/* Fully Undetectable Card */}
				<div className="bg-gray-100 rounded-3xl p-8 flex flex-col items-center">
					<div className=" relative ">
						<Image
							className=" w-[] object-contain"
							src={"/paper-mode.png"}
							alt="paper mode"
							width={289.58}
							height={169.58}
						/>
					</div>
					<h2 className="text-xl font-semibold mt-4">
						Totalement indétectable.
					</h2>
				</div>

				{/* Multiple Languages Card */}
				<div className="bg-gray-100 rounded-3xl p-8 flex flex-col items-center">
                <div className=" flex items-center justify-center w-[289.58px] my-auto h-[169.58px]">
						<Image
							className=" object-contain"
							src={"/multi-language.png"}
							alt="paper mode"
							width={289.58}
							height={169.58}
						/>
					</div>
					<h2 className="text-xl font-semibold">
						Plusieurs langues.
					</h2>
				</div>
			</div>
		</div>
	);
};

export default StudentAITool;
