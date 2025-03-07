import { Link } from "react-router";

function Hero() {
  return (
    <section
      className="relative w-full h-[80vh] bg-cover bg-center"
      style={{ backgroundImage: "url('images/hero.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/50">
        <div className="flex flex-col justify-center w-full h-full px-16 items-center my-auto text-center text-gray-200 py-8 rounded-lg">
          <h1 className="text-5xl mb-4">
            Effortless Travel Planning at Your Fingertips
          </h1>
          <p className="text-xl mb-4 tracking-tight">
            From crafting the perfect budget to planning every adventure-packed
            day, we've got you covered. <br /> GoGuided helps you customize,
            explore, and experience travel like never before!
          </p>
          <Link
            to="/tours"
            className="text-2xl px-3 py-2 bg-green-500 rounded-xl text-center align-middle"
          >
            Plan Your Trip
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
