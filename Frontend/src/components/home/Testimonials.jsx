import Reviews from "../common/Reviews";

function Testimonials() {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-32 py-10 space-y-6">
      <h3 className="text-center text-2xl sm:text-3xl font-bold text-green-800">
        What our clients say
      </h3>
      <Reviews />
    </div>
  );
}

export default Testimonials;
