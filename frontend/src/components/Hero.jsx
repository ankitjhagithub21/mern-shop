import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import React, { useRef, useState } from "react";
// Import Swiper styles
import { ArrowLeft, ArrowRight } from "lucide-react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";

const images = [
  "https://assets.tatacliq.com/medias/sys_master/images/67572967735326.jpg",
  "https://assets.tatacliq.com/medias/sys_master/images/67572967669790.jpg",
  "https://assets.tatacliq.com/medias/sys_master/images/67551227445278.jpg",
];

const Hero = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [init, setInit] = useState(false);
  return (
    <section className="relative">
      <Swiper
        modules={[Autoplay, Navigation]}
        autoplay={{
          delay: 5000, // Delay between slides in milliseconds (e.g., 3 seconds)
          disableOnInteraction: false, // Keep autoplay running even after user interaction
        }}
        slidesPerView={1}
        loop={true}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onInit={() => setInit(true)}
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-auto"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Previous Button */}
      <button
        ref={prevRef}
        className="absolute cursor-pointer left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 shadow-lg backdrop-blur-sm"
      >
        <ArrowLeft size={20} />
      </button>

      {/* Next Button */}
      <button
        ref={nextRef}
        className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 shadow-lg backdrop-blur-sm"
      >
        <ArrowRight size={20} />
      </button>
    </section>
  );
};

export default Hero;
