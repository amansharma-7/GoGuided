// import { Link } from "react-router";

// function Hero() {
//   return (
//     <section
//       className="relative w-full h-[70vh] bg-cover bg-center"
//       style={{ backgroundImage: "url('images/hero.jpg')" }}
//     >
//       <div className="absolute inset-0 bg-black/70">
//         <div className="flex flex-col items-center justify-center w-full h-full px-32  pt-20 text-green-100">
//           <h1 className="text-5xl font-semibold mb-6">
//             Effortless Travel Planning at Your Fingertips
//           </h1>
//           <p className="text-xl font-medium mb-5 tracking-tight text-center">
//             GoGuided helps you customize, explore, and experience travel like
//             never before! <br /> Let us help you plan your next adventure.
//           </p>
//           <Link
//             to="/tours"
//             className="text-2xl font-semibold px-3 py-2 mx-auto bg-green-900 hover:bg-green-950 text-white rounded-xl text-center align-middle"
//           >
//             Plan Your Trip
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Hero;

import useSafeNavigate from "../../utils/useSafeNavigate";

function Hero({
  backgroundImage = "https://images.unsplash.com/photo-1606820854416-439b3305ff39?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
}) {
  const navigate = useSafeNavigate();

  return (
    <section
      className="relative w-full h-[70vh] md:h-[80vh] lg:h-[90vh] bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
        <div className="flex flex-col items-center justify-center w-4/5 md:w-3/5 lg:w-2/5 text-gray-200 text-center space-y-4 md:space-y-6 lg:space-y-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4 lg:mb-6 animate-fadeIn text-white">
            Discover Unforgettable Tours with Us
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl font-medium tracking-tight animate-fadeIn delay-200 text-gray-200">
            Explore top-rated tours, curated for every kind of traveler. Find
            your next destination and make lasting memories.
          </p>
          <button
            onClick={() => navigate("/tours")}
            aria-label="Explore Tours"
            className="px-6 py-3 md:px-8 md:py-4 bg-green-700 hover:bg-green-600 text-white text-lg md:text-xl font-semibold rounded-xl shadow-lg transition duration-300 ease-in-out transform hover:scale-105 animate-fadeIn delay-400"
          >
            Explore Tours
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
