import React, { useState, useEffect, useRef } from "react";

const carouselItems = [
  {
    id: 1,
    name: "Headphones",
    image:
      "https://i.pinimg.com/736x/ce/a2/d4/cea2d4993e8cb414b8235972fd4b0115.jpg",
  },
  {
    id: 2,
    name: "Celibration",
    image:
      "https://www.ethnicplus.in/cdn/shop/files/2_e396bfa9-adef-490a-9444-1095114de031.jpg?v=1771173950&width=1770",
  },
  {
    id: 3,
    name: "Kurta",
    image:
      "https://www.ethnicplus.in/cdn/shop/files/4_2f2042d1-33c3-4f2c-8397-472e103fefb0.jpg?v=1768755972&width=1770",
  },
  {
    id: 4,
    name: "Saree",
    image:
      "https://www.ethnicplus.in/cdn/shop/files/5_0b7f45e4-22aa-435b-80e7-bd7d0e5d991f.jpg?v=1768755964&width=1770",
  },
];

const MainCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
    }, 2000); // 3 seconds per slide
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full overflow-hidden relative h-[400px] lg:h-[600px]">
      <div
        ref={slideRef}
        className="flex transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {carouselItems.map((item) => (
          <div
            key={item.id}
            className="w-full flex-shrink-0 relative h-[400px] lg:h-[600px]"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-5 left-5 text-white bg-black bg-opacity-50 px-3 py-1 rounded">
              {item.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainCarousel;
