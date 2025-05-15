import Logo from "@/public/logo";

const Footer = () => {
	return (
		<footer className="bg-white text-gray-700 mt-20 py-8">
			<div className="max-w-screen-xl mx-auto px-4">
				{/* Top section: Logo/Info + Links */}
				<div className="flex flex-col md:flex-row md:justify-between space-y-8 md:space-y-0">
					{/* Left column: Logo, address, contact, socials */}
					<div className="md:w-1/3">
						{/* Logo & name */}
						<div className="flex items-center space-x-2">
							{/* Replace with your actual logo file or SVG */}
							{/* <img
                src="/Etudify-logo.svg"
                alt="Etudify+"
                className="h-8 w-auto"
              /> */}
							<Logo />
						</div>

						{/* Address */}
						<p className="mt-4 text-sm leading-6">
							651 N Broad St, Suite 201 <br />
							Middletown, 19709, Delaware
						</p>

						{/* Contact */}
						<p className="mt-2 text-sm">
							CONTACT EMAIL: <br />
							<a
								href="mailto:support@Etudify.ggg"
								className="text-blue-600 hover:underline">
								support@Etudify.ggg
							</a>
						</p>

						{/* Social icons (placeholders) */}
						<div className="flex space-x-4 mt-4">
							{/* Example: Facebook icon */}
							<a
								href="#"
								aria-label="Facebook"
								className="text-gray-500 hover:text-gray-900">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									viewBox="0 0 24 24"
									className="w-5 h-5">
									<path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.129 8.438 9.878v-6.99H8.078v-2.888h2.36V9.845c0-2.337 1.394-3.627 3.53-3.627 1.023 0 2.093.184 2.093.184v2.297h-1.179c-1.163 0-1.527.72-1.527 1.458v1.746h2.598l-.415 2.888h-2.183v6.99C18.343 21.129 22 16.991 22 12z" />
								</svg>
							</a>
							{/* Example: Twitter icon */}
							<a
								href="#"
								aria-label="Twitter"
								className="text-gray-500 hover:text-gray-900">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									viewBox="0 0 24 24"
									className="w-5 h-5">
									<path d="M19.633 7.997c.013.177.013.354.013.531 0 5.409-4.118 11.64-11.64 11.64-2.315 0-4.465-.674-6.272-1.845.324.038.635.05.97.05 1.93 0 3.707-.66 5.115-1.76a4.093 4.093 0 01-3.822-2.836c.247.038.494.063.753.063.361 0 .722-.05 1.06-.138a4.086 4.086 0 01-3.276-4.01v-.05c.55.306 1.184.495 1.856.52a4.07 4.07 0 01-1.816-3.397c0-.747.202-1.445.555-2.046a11.592 11.592 0 008.424 4.27 4.605 4.605 0 01-.1-.935 4.085 4.085 0 014.085-4.085c1.176 0 2.238.495 2.984 1.288a8.036 8.036 0 002.594-.99 4.076 4.076 0 01-1.795 2.258 8.143 8.143 0 002.348-.635 8.763 8.763 0 01-2.046 2.116z" />
								</svg>
							</a>
						</div>
					</div>

					{/* Right columns: Product, Company, Help, Compare */}
					<div className="flex flex-wrap md:w-2/3 justify-between">
						{/* PRODUCT */}
						<div className="mb-6 md:mb-0">
							<h3 className="font-semibold mb-2 text-sm uppercase">
								Product
							</h3>
							<ul className="space-y-1 text-sm">
								<li>
									<a href="#" className="hover:underline">
										Pricing
									</a>
								</li>
								<li>
									<a href="#" className="hover:underline">
										Features
									</a>
								</li>
								<li>
									<a href="#" className="hover:underline">
										Chrome Extension
									</a>
								</li>
							</ul>
						</div>

						{/* COMPANY */}
						<div className="mb-6 md:mb-0">
							<h3 className="font-semibold mb-2 text-sm uppercase">
								Company
							</h3>
							<ul className="space-y-1 text-sm">
								<li>
									<a href="#" className="hover:underline">
										Reviews
									</a>
								</li>
								<li>
									<a href="#" className="hover:underline">
										Privacy Policy
									</a>
								</li>
							</ul>
						</div>

						{/* HELP */}
						<div className="mb-6 md:mb-0">
							<h3 className="font-semibold mb-2 text-sm uppercase">
								Help
							</h3>
							<ul className="space-y-1 text-sm">
								<li>
									<a href="#" className="hover:underline">
										Contact Us
									</a>
								</li>
								<li>
									<a href="#" className="hover:underline">
										FAQs
									</a>
								</li>
							</ul>
						</div>

						{/* COMPARE */}
						<div className="mb-6 md:mb-0">
							<h3 className="font-semibold mb-2 text-sm uppercase">
								Compare
							</h3>
							<ul className="space-y-1 text-sm">
								<li>
									<a href="#" className="hover:underline">
										Courseology alternative
									</a>
								</li>
								<li>
									<a href="#" className="hover:underline">
										Promath alternative
									</a>
								</li>
								<li>
									<a href="#" className="hover:underline">
										Graphomat alternative
									</a>
								</li>
								<li>
									<a href="#" className="hover:underline">
										Photosolve alternative
									</a>
								</li>
								<li>
									<a href="#" className="hover:underline">
										Collegebot alternative
									</a>
								</li>
								<li>
									<a href="#" className="hover:underline">
										Transcripter alternative
									</a>
								</li>
								<li>
									<a href="#" className="hover:underline">
										Smartsolve alternative
									</a>
								</li>
								<li>
									<a href="#" className="hover:underline">
										AlMath alternative
									</a>
								</li>
								<li>
									<a href="#" className="hover:underline">
										AnswerAI alternative
									</a>
								</li>
								<li>
									<a href="#" className="hover:underline">
										Screesolver alternative
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>

				{/* Bottom section: Copyright */}
				<div className="mt-8 border-t pt-4 text-sm text-gray-500 text-center md:text-left">
					© Etudify 2025. All rights reserved.
				</div>
			</div>
		</footer>
	);
};

export default Footer;
