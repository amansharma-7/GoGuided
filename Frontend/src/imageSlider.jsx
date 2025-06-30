import { useState, useEffect } from "react";

const images = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
];

const ImageSlider = () => {
  const [rotationY, setRotationY] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotationY((prev) => prev + 90);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-gray-900 overflow-hidden">
      <div
        className="w-[300px] h-[200px] relative"
        style={{
          perspective: "1000px",
        }}
      >
        <div
          className="w-full h-full absolute flex items-center justify-center"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateY(${rotationY}deg)`,
            transition: "transform 1s ease-in-out",
          }}
        >
          {images.map((src, index) => {
            const angle = index * 90;
            return (
              <div
                key={index}
                className="absolute w-[300px] h-[200px] opacity-90"
                style={{
                  transform: `rotateY(${angle}deg) translateZ(500px)`,
                }}
              >
                <img
                  src={src}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover rounded-xl shadow-2xl"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
