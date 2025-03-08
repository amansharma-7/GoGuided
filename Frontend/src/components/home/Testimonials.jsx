import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import StarRatings from "react-star-ratings";

function Testimonials() {
  return (
    <div className=" w-full px-32 ">
      <h3 className="text-center py-6 font-bold text-5xl ">
        What our client say
      </h3>
      <Swiper
        slidesPerView={4}
        spaceBetween={25}
        loop={true}
        freeMode={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[FreeMode, Pagination, Autoplay]}
      >
        <SwiperSlide>
          <div className="flex flex-col gap-3  p-3 text-[14px]  rounded-lg shadow-lg justify-center items-center">
            {/* User Info */}
            <div className="flex flex-col items-center gap-4">
              <img
                src={`https://api.dicebear.com/5.x/initials/svg?seed=Aman%20Sharma`}
                alt="User"
                className=" h-16 w-16 rounded-full object-cover"
              />
              <h1 className="font-bold text-xl">Aman Sharma</h1>
            </div>

            {/* Rating Section */}
            <div className=" flex flex-col gap-2 items-center ">
              <div className="flex justify-center ">
                <StarRatings
                  rating={5}
                  starRatedColor="#FFD700"
                  numberOfStars={5}
                  starDimension="18px"
                  starSpacing="2px"
                />
              </div>

              {/* Review Text */}
              <p className="font-medium px-2 py-1">
                lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col gap-3  p-3 text-[14px]  rounded-lg shadow-lg justify-center items-center">
            {/* User Info */}
            <div className="flex flex-col items-center gap-4">
              <img
                src={`https://api.dicebear.com/5.x/initials/svg?seed=Aman%20Sharma`}
                alt="User"
                className=" h-16 w-16 rounded-full object-cover"
              />
              <h1 className="font-bold text-xl">Aman Sharma</h1>
            </div>

            {/* Rating Section */}
            <div className=" flex flex-col gap-2 items-center ">
              <div className="flex justify-center ">
                <StarRatings
                  rating={5}
                  starRatedColor="#FFD700"
                  numberOfStars={5}
                  starDimension="18px"
                  starSpacing="2px"
                />
              </div>

              {/* Review Text */}
              <p className="font-medium px-2 py-1">
                lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col gap-3  p-3 text-[14px]  rounded-lg shadow-lg justify-center items-center">
            {/* User Info */}
            <div className="flex flex-col items-center gap-4">
              <img
                src={`https://api.dicebear.com/5.x/initials/svg?seed=Aman%20Sharma`}
                alt="User"
                className=" h-16 w-16 rounded-full object-cover"
              />
              <h1 className="font-bold text-xl">Aman Sharma</h1>
            </div>

            {/* Rating Section */}
            <div className=" flex flex-col gap-2 items-center ">
              <div className="flex justify-center ">
                <StarRatings
                  rating={5}
                  starRatedColor="#FFD700"
                  numberOfStars={5}
                  starDimension="18px"
                  starSpacing="2px"
                />
              </div>

              {/* Review Text */}
              <p className="font-medium px-2 py-1">
                lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col gap-3  p-3 text-[14px]  rounded-lg shadow-lg justify-center items-center">
            {/* User Info */}
            <div className="flex flex-col items-center gap-4">
              <img
                src={`https://api.dicebear.com/5.x/initials/svg?seed=Aman%20Sharma`}
                alt="User"
                className=" h-16 w-16 rounded-full object-cover"
              />
              <h1 className="font-bold text-xl">Aman Sharma</h1>
            </div>

            {/* Rating Section */}
            <div className=" flex flex-col gap-2 items-center ">
              <div className="flex justify-center ">
                <StarRatings
                  rating={5}
                  starRatedColor="#FFD700"
                  numberOfStars={5}
                  starDimension="18px"
                  starSpacing="2px"
                />
              </div>

              {/* Review Text */}
              <p className="font-medium px-2 py-1">
                lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Testimonials;
