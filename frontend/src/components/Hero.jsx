import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";

const images = [
  "https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/fa2015a749786364.jpg?q=60",
  "https://rukminim1.flixcart.com/fk-p-flap/3240/540/image/114991b32811cbb7.jpg?q=60",
  "https://rukminim1.flixcart.com/fk-p-flap/3240/540/image/1f9c9ad24c2bc37b.jpg?q=60",
  "https://rukminim1.flixcart.com/fk-p-flap/3240/540/image/5b309e98775e22e4.jpg?q=60",
];

const Hero = () => {
  return (
    <section>
      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 3000, // Delay between slides in milliseconds (e.g., 3 seconds)
          disableOnInteraction: false, // Keep autoplay running even after user interaction
        }}
        slidesPerView={1}
        loop={true}
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
    </section>
  );
};

export default Hero;
