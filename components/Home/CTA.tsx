
const CTA = () => {
  return (
    <div className="flex flex-col mt-10 items-center justify-center bg-blue-400 text-black rounded-2xl p-6 shadow-lg max-w-lg mx-auto">
      {/* Icon */}
      <div className="bg-blue-500 p-3 rounded-full mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-10 h-10 text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 14.5v4m0-14l8 4m-8-4L4 6m16 0l-8 4m-8-4v6a8 8 0 0016 0V6"
          />
        </svg>
      </div>

      {/* Heading */}
      <h2 className="text-2xl font-bold text-center">Try Etudify for $0.99</h2>

      {/* Button */}
      <button className="mt-4 bg-white cursor-pointer text-black font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-300 transition">
        Commencer
      </button>

      {/* Details */}
      <p className="text-sm text-gray-800 mt-2">
        Satisfaction garantie • Annulation à tout moment • Support client 24/7
      </p>
    </div>
  );
};

export default CTA;
