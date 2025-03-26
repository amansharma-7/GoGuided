// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, FreeMode, Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/free-mode";
// import "swiper/css/pagination";
// import StarRatings from "react-star-ratings";

// function Testimonials() {
//   const testimonials = [
//     {
//       id: 1,
//       name: "Aman Sharma",
//       rating: 4.5,
//       review:
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     },
//     {
//       id: 2,
//       name: "Priya Singh",
//       rating: 5,
//       review:
//         "Amazing experience! Highly recommend their services. The team was very professional.",
//     },
//     {
//       id: 3,
//       name: "Rohit Verma",
//       rating: 4,
//       review:
//         "Good service, but there's room for improvement. Overall, a great experience.",
//     },
//     {
//       id: 4,
//       name: "Neha Gupta",
//       rating: 4.8,
//       review:
//         "Excellent customer support and great results. Will definitely come back.",
//     },
//     {
//       id: 5,
//       name: "Vikram Mehta",
//       rating: 4.2,
//       review:
//         "Fast and reliable. The process was smooth, and the team was very helpful.",
//     },
//   ];
//   return (
//     <div className="space-y-6 w-full px-32 py-6">
//       <h3 className="text-center font-bold text-5xl">What our clients say</h3>
//       <Swiper
//         slidesPerView={4}
//         spaceBetween={25}
//         loop={true}
//         freeMode={true}
//         autoplay={{
//           delay: 2500,
//           disableOnInteraction: false,
//         }}
//         modules={[FreeMode, Pagination, Autoplay]}
//       >
//         {testimonials.map((testimonial) => (
//           <SwiperSlide key={testimonial.id} className="m-2">
//             <div className="flex flex-col justify-center items-center p-3 rounded-lg shadow-md shadow-black/30">
//               {/* User Info */}
//               <div className="flex flex-col items-center gap-1">
//                 <img
//                   src={`https://api.dicebear.com/5.x/initials/svg?seed=${testimonial.name}`}
//                   alt="User"
//                   className="h-13 w-13 rounded-full object-cover object-center"
//                 />
//                 <h1 className="font-semibold text-xl">{testimonial.name}</h1>
//               </div>

//               {/* Rating Section */}
//               <div className="flex flex-col gap-1 justify-center items-center px-4 py-2 h-[150px]">
//                 <StarRatings
//                   rating={testimonial.rating}
//                   starRatedColor="#FFD700"
//                   numberOfStars={5}
//                   starDimension="18px"
//                   starSpacing="2px"
//                 />

//                 {/* Review Text */}
//                 <p className="font-medium tracking-tight text-center overflow-x-hidden">
//                   {testimonial.review.length > 80
//                     ? `${testimonial.review.slice(0, 100)}...`
//                     : testimonial.review}
//                 </p>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// }

// export default Testimonials;

import Reviews from "../common/Reviews";

function Testimonials() {
  return (
    <div className="space-y-6 w-full px-32 py-6">
      <h3 className="text-center text-3xl font-bold text-green-800">
        What our clients say
      </h3>
      <Reviews />
    </div>
  );
}

export default Testimonials;
