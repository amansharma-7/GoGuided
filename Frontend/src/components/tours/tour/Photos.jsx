import { useState } from "react";
import { FaArrowLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
export default function ImageGallery() {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Image list
  const images = [
    "/images/gallery1.jpg",
    "/images/gallery2.jpeg",
    "/images/gallery3.jpeg",
    "/images/gallery4.jpg",
  ];

  // Open gallery
  const openGallery = () => setIsGalleryOpen(true);
  const closeGallery = () => setIsGalleryOpen(false);

  // Open full-screen image viewer
  const openImageViewer = (index) => {
    setCurrentIndex(index);
    setSelectedImage(images[index]);
  };

  // Close full-screen viewer
  const closeImageViewer = () => setSelectedImage(null);

  return (
    <>
      {/* Image Grid */}
      <div className="h-[500px] grid grid-rows-2 grid-cols-[0.60fr_0.40fr] gap-2 rounded-lg overflow-hidden">
        {/* First Large Image */}
        <div className="row-span-2 cursor-pointer overflow-hidden rounded-lg">
          <img
            src={images[0]}
            alt="Gallery Image 1"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Second Image */}
        <div className="cursor-pointer overflow-hidden rounded-lg">
          <img
            src={images[1]}
            alt="Gallery Image 2"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Bottom Two Images */}
        <div className="grid grid-cols-2 gap-2">
          {/* Third Image */}
          <div className="cursor-pointer overflow-hidden rounded-lg">
            <img
              src={images[2]}
              alt="Gallery Image 3"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Fourth Image with Button */}
          <div className="relative cursor-pointer overflow-hidden rounded-lg">
            <img
              src={images[3]}
              alt="Gallery Image 4"
              className="w-full h-full object-cover"
            />

            {/* See All Photos Button */}
            <button
              onClick={openGallery}
              className="absolute z-10 right-3 bottom-2 bg-green-50 py-1 px-2 rounded-lg cursor-pointer transition duration-300 hover:bg-green-200 hover:scale-105"
            >
              See all Photos
            </button>
          </div>
        </div>
      </div>

      {/* Gallery Modal */}

      {isGalleryOpen && (
        <div className="fixed  inset-0 bg-black/80 flex justify-center items-center z-50 animate-fadeIn">
          <div className="relative bg-white p-5 rounded-lg max-w-4xl  w-full shadow-lg">
            {/* Image Grid */}
            <div className="grid grid-cols-2 gap-3">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  className="w-full h-70 object-cover rounded-lg cursor-pointer transition-transform duration-300 "
                  onClick={() => openImageViewer(index)}
                />
              ))}
            </div>

            {/* Close Button */}
            <button
              onClick={closeGallery}
              className="absolute -top-5 -right-5 bg-gray-800 text-white p-2 rounded-full cursor-pointer transition duration-300 hover:bg-gray-700"
            >
              <RxCross2 size={25} />
            </button>
          </div>
        </div>
      )}

      {/* Full-Screen Image Viewer */}
      {selectedImage && (
        <div className="fixed  inset-0 bg-transparent flex justify-center items-center z-50 animate-fadeIn">
          {/* Close Button */}
          <button
            onClick={closeImageViewer}
            className="absolute top-9 right-74 bg-gray-800 text-white p-2 rounded-full cursor-pointer transition duration-300 hover:bg-gray-700"
          >
            <RxCross2 size={30} />
          </button>

          {/* Full-Screen Image */}
          <img
            src={selectedImage}
            className="w-[58.5%] h-[84%] object-cover rounded-lg shadow-lg transition-transform duration-500 ease-in-out"
          />
        </div>
      )}
    </>
  );
}
