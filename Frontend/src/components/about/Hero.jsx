function Hero() {
  return (
    <section
      className="relative w-full h-[70vh] bg-cover bg-center"
      style={{
        backgroundImage: "url('images/about-us.jpg')",
      }}
    >
      <div className="absolute inset-0 flex justify-center items-center h-full w-full bg-black/50 text-4xl font-semibold text-white">
        About Us
      </div>
    </section>
  );
}

export default Hero;
