function Hero({ heroData }) {
  return (
    <section
      className="relative w-full h-[70vh] bg-cover bg-center"
      style={{ backgroundImage: `url(${heroData.backgroundImage})` }}
    >
      <div className="absolute inset-0 flex justify-center items-center h-full w-full bg-black/50 text-4xl font-semibold text-white">
        {heroData.title}
      </div>
    </section>
  );
}

export default Hero;
