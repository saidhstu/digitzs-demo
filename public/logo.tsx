import Image from "next/image";

const Logo = () => {
	return (
		<div className="flex  items-center">
			<Image alt="logo" src={'/logo.png'} height={32} width={130} />
		</div>
	);
};

export default Logo;
