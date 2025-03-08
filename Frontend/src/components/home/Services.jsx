function Services() {
  return (
    <div>
      <div className="py-4 px-32">
        <h1 className="text-[#4D663C] text-[70px] font-bold ">Our Services</h1>
        <div className="flex items-center justify-center gap-6">
          <img
            src="/images/our_services.jpg"
            alt="Our Services"
            width={300}
            height={400}
          />
          <div className="flex flex-col justify-center items-center gap-6 -mt-21 ">
            <div>
              <h2 className="text-[#4D663C] text-[30px] font-bold -ml-10  ">
                Guided Tours & Local Experience
              </h2>
              <p className="ml-10">
                Discover hidden gems with our expert local guides who bring
                history, culture, and adventure to life
              </p>
            </div>
            <div className="relative ml-[400px]">
              <h2 className="text-[#4D663C] text-[30px] font-bold">
                24/7 Customer Support
              </h2>
              <p className="ml-10">
                System provides AI chatbots, live chat to assist customers
                anytime, ensuring quick and efficient support.
              </p>
            </div>
            <div>
              <h2 className="text-[#4D663C] text-[30px] font-bold">
                Best Price Guarantee
              </h2>
              <p className="ml-10">
                We offer competitive pricing with no hidden fees, ensuring you
                get the best value for your travel experiences.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
