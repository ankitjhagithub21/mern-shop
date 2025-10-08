import React from "react";

const images = [
  "https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/fa2015a749786364.jpg?q=60",
  "https://rukminim1.flixcart.com/fk-p-flap/3240/540/image/114991b32811cbb7.jpg?q=60",
  "https://rukminim1.flixcart.com/fk-p-flap/3240/540/image/1f9c9ad24c2bc37b.jpg?q=60",
  "https://rukminim1.flixcart.com/fk-p-flap/3240/540/image/5b309e98775e22e4.jpg?q=60"
];

const Hero = () => {
  return (
    <section>
      <div className="carousel  w-full">
        {images.map((src, idx) => (
          <div
            key={idx}
            id={`item${idx + 1}`}
            className="carousel-item w-full"
          >
            <img src={src} className="w-full" />
          </div>
        ))}
      </div>
      <div className="flex w-full justify-center gap-2 py-2">
        {images.map((_, idx) => (
          <a
            key={idx}
            href={`#item${idx + 1}`}
            className="btn btn-xs"
          >
            {idx + 1}
          </a>
        ))}
      </div>
    </section>
  );
};

export default Hero;
        
