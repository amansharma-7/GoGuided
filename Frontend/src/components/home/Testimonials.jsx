import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import StarRatings from "react-star-ratings";

function Testimonials() {
  return (
    <div className="space-y-6 w-full px-32 py-6">
      <h3 className="text-center font-bold text-5xl ">What our client say</h3>
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
        <SwiperSlide className="m-2">
          <div className="flex flex-col justify-center items-center  p-3 rounded-lg shadow-md shadow-black/30">
            {/* User Info */}
            <div className="flex flex-col items-center gap-1">
              <img
                src={`https://api.dicebear.com/5.x/initials/svg?seed=Aman%20Sharma`}
                alt="User"
                className="h-13 w-13 rounded-full object-cover object-center"
              />
              <h1 className="font-semibold text-xl">Aman Sharma</h1>
            </div>

            {/* Rating Section */}
            <div className="flex flex-col gap-1 justify-center items-center px-4 py-2">
              <StarRatings
                rating={4.5}
                starRatedColor="#FFD700"
                numberOfStars={5}
                starDimension="18px"
                starSpacing="2px"
                className=""
              />

              {/* Review Text */}
              <p className="font-medium tracking-tight">
                lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="m-2">
          <div className="flex flex-col justify-center items-center  p-3 rounded-lg shadow-md shadow-black/30">
            {/* User Info */}
            <div className="flex flex-col items-center gap-1">
              <img
                src={`https://api.dicebear.com/5.x/initials/svg?seed=Aman%20Sharma`}
                alt="User"
                className="h-13 w-13 rounded-full object-cover object-center"
              />
              <h1 className="font-semibold text-xl">Aman Sharma</h1>
            </div>

            {/* Rating Section */}
            <div className="flex flex-col gap-1 justify-center items-center px-4 py-2">
              <StarRatings
                rating={4.5}
                starRatedColor="#FFD700"
                numberOfStars={5}
                starDimension="18px"
                starSpacing="2px"
                className=""
              />

              {/* Review Text */}
              <p className="font-medium tracking-tight">
                lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="m-2">
          <div className="flex flex-col justify-center items-center  p-3 rounded-lg shadow-md shadow-black/30">
            {/* User Info */}
            <div className="flex flex-col items-center gap-1">
              <img
                src={`https://api.dicebear.com/5.x/initials/svg?seed=Aman%20Sharma`}
                alt="User"
                className="h-13 w-13 rounded-full object-cover object-center"
              />
              <h1 className="font-semibold text-xl">Aman Sharma</h1>
            </div>

            {/* Rating Section */}
            <div className="flex flex-col gap-1 justify-center items-center px-4 py-2">
              <StarRatings
                rating={4.5}
                starRatedColor="#FFD700"
                numberOfStars={5}
                starDimension="18px"
                starSpacing="2px"
                className=""
              />

              {/* Review Text */}
              <p className="font-medium tracking-tight">
                lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="m-2">
          <div className="flex flex-col justify-center items-center  p-3 rounded-lg shadow-md shadow-black/30">
            {/* User Info */}
            <div className="flex flex-col items-center gap-1">
              <img
                src={`https://api.dicebear.com/5.x/initials/svg?seed=Aman%20Sharma`}
                alt="User"
                className="h-13 w-13 rounded-full object-cover object-center"
              />
              <h1 className="font-semibold text-xl">Aman Sharma</h1>
            </div>

            {/* Rating Section */}
            <div className="flex flex-col gap-1 justify-center items-center px-4 py-2">
              <StarRatings
                rating={4.5}
                starRatedColor="#FFD700"
                numberOfStars={5}
                starDimension="18px"
                starSpacing="2px"
                className=""
              />

              {/* Review Text */}
              <p className="font-medium tracking-tight">
                lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="m-2">
          <div className="flex flex-col justify-center items-center  p-3 rounded-lg shadow-md shadow-black/30">
            {/* User Info */}
            <div className="flex flex-col items-center gap-1">
              <img
                src={`https://api.dicebear.com/5.x/initials/svg?seed=Aman%20Sharma`}
                alt="User"
                className="h-13 w-13 rounded-full object-cover object-center"
              />
              <h1 className="font-semibold text-xl">Aman Sharma</h1>
            </div>

            {/* Rating Section */}
            <div className="flex flex-col gap-1 justify-center items-center px-4 py-2">
              <StarRatings
                rating={4.5}
                starRatedColor="#FFD700"
                numberOfStars={5}
                starDimension="18px"
                starSpacing="2px"
                className=""
              />

              {/* Review Text */}
              <p className="font-medium tracking-tight">
                lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="m-2">
          <div className="flex flex-col justify-center items-center  p-3 rounded-lg shadow-md shadow-black/30">
            {/* User Info */}
            <div className="flex flex-col items-center gap-1">
              <img
                src={`https://api.dicebear.com/5.x/initials/svg?seed=Aman%20Sharma`}
                alt="User"
                className="h-13 w-13 rounded-full object-cover object-center"
              />
              <h1 className="font-semibold text-xl">Aman Sharma</h1>
            </div>

            {/* Rating Section */}
            <div className="flex flex-col gap-1 justify-center items-center px-4 py-2">
              <StarRatings
                rating={4.5}
                starRatedColor="#FFD700"
                numberOfStars={5}
                starDimension="18px"
                starSpacing="2px"
                className=""
              />

              {/* Review Text */}
              <p className="font-medium tracking-tight">
                lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="m-2">
          <div className="flex flex-col justify-center items-center  p-3 rounded-lg shadow-md shadow-black/30">
            {/* User Info */}
            <div className="flex flex-col items-center gap-1">
              <img
                src={`https://api.dicebear.com/5.x/initials/svg?seed=Aman%20Sharma`}
                alt="User"
                className="h-13 w-13 rounded-full object-cover object-center"
              />
              <h1 className="font-semibold text-xl">Aman Sharma</h1>
            </div>

            {/* Rating Section */}
            <div className="flex flex-col gap-1 justify-center items-center px-4 py-2">
              <StarRatings
                rating={4.5}
                starRatedColor="#FFD700"
                numberOfStars={5}
                starDimension="18px"
                starSpacing="2px"
                className=""
              />

              {/* Review Text */}
              <p className="font-medium tracking-tight">
                lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="m-2">
          <div className="flex flex-col justify-center items-center  p-3 rounded-lg shadow-md shadow-black/30">
            {/* User Info */}
            <div className="flex flex-col items-center gap-1">
              <img
                src={`https://api.dicebear.com/5.x/initials/svg?seed=Aman%20Sharma`}
                alt="User"
                className="h-13 w-13 rounded-full object-cover object-center"
              />
              <h1 className="font-semibold text-xl">Aman Sharma</h1>
            </div>

            {/* Rating Section */}
            <div className="flex flex-col gap-1 justify-center items-center px-4 py-2">
              <StarRatings
                rating={4.5}
                starRatedColor="#FFD700"
                numberOfStars={5}
                starDimension="18px"
                starSpacing="2px"
                className=""
              />

              {/* Review Text */}
              <p className="font-medium tracking-tight">
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
