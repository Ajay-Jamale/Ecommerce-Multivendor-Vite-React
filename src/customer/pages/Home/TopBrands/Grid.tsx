import React, { useEffect, useRef } from "react";
import { useAppSelector } from "../../../../Redux Toolkit/Store";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type SwiperClass from "swiper";
import "swiper/css";

const TopBrand: React.FC = () => {
  const { homePage } = useAppSelector((store) => store);
  const swiperRef = useRef<SwiperClass | null>(null);

  const items = homePage.homePageData?.grid || [];

  useEffect(() => {
    const interval = setInterval(() => {
      if (!swiperRef.current || items.length === 0) return;
      const swiper = swiperRef.current;
      if (swiper.activeIndex === items.length - 1) {
        swiper.slideTo(0, 0);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [items]);

  return (
    <div className="w-full bg-white px-0 py-10">
      <Swiper
        onSwiper={(swiper: SwiperClass) => (swiperRef.current = swiper)}
        spaceBetween={25}
        slidesPerView={1.2}
        loop={false}
        autoplay={{
          delay: 1,
          disableOnInteraction: false,
        }}
        speed={1500}
        modules={[Autoplay]}
        breakpoints={{
          480: { slidesPerView: 1.8 },
          640: { slidesPerView: 2.4 },
          768: { slidesPerView: 2.8 },
          1024: { slidesPerView: 3.2 },
          1280: { slidesPerView: 3.6 },
        }}
        className="w-full"
      >
        {items.map((item: any, i: number) => (
          <SwiperSlide key={i}>
            <div
              className="bg-white overflow-hidden shadow-lg 
              hover:shadow-xl transition-all duration-500 cursor-pointer 
              border border-gray-200"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-[360px] lg:h-[550px] object-cover 
                hover:scale-105 transition-transform duration-500"
              />
             
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TopBrand;
