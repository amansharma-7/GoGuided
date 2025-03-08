import { Link } from "react-router";

function Hero() {
  return (
    <section
      className="relative w-full h-[70vh] bg-cover bg-center"
      style={{ backgroundImage: "url('images/hero.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/70">
        <div className="flex flex-col items-center justify-center w-full h-full px-32  pt-20 text-gray-200">
          <h1 className="text-5xl font-semibold mb-6">
            Effortless Travel Planning at Your Fingertips
          </h1>
          <p className="text-xl font-medium mb-5 tracking-tight text-center">
            GoGuided helps you customize, explore, and experience travel like
            never before! <br /> Let us help you plan your next adventure.
          </p>
          <Link
            to="/tours"
            className="text-2xl font-semibold px-3 py-2 mx-auto bg-green-700 rounded-xl text-center align-middle"
          >
            Plan Your Trip
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
