// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";

import animebg from "@/assets/images/heroanime.jpg";
import forestbg from "@/assets/images/heroforest.jpg";
import medievalbg from "@/assets/images/heromedieval.jpg";
import punkbg from "@/assets/images/heropunk.jpg";
import herosteampunk from "@/assets/images/herosteampunk.jpg";
import { ChevronLeft, ChevronRight } from "lucide-react";

// const Hero = () => {
//   return (
//     <>
//       <div className=" flex items-center justify-center w-3/4">
//         <div
//           id="carouselExampleIndicators"
//           className="carousel slide"
//           data-ride="carousel"
//         >
//           <ol className="carousel-indicators">
//             <li
//               data-target="#carouselExampleIndicators"
//               data-slide-to="0"
//               className="active"
//             ></li>
//             <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
//             <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
//           </ol>
//           <div className="carousel-inner">
//             <div className="carousel-item active">
//               <img className="d-block w-100" src="..." alt="First slide" />
//             </div>
//             <div className="carousel-item">
//               <img className="d-block w-100" src="..." alt="Second slide" />
//             </div>
//             <div className="carousel-item">
//               <img className="d-block w-100" src="..." alt="Third slide" />
//             </div>
//           </div>
//           <a
//             className="carousel-control-prev"
//             href="#carouselExampleIndicators"
//             role="button"
//             data-slide="prev"
//           >
//             <span
//               className="carousel-control-prev-icon"
//               aria-hidden="true"
//             ></span>
//             <span className="sr-only">Previous</span>
//           </a>
//           <a
//             className="carousel-control-next"
//             href="#carouselExampleIndicators"
//             role="button"
//             data-slide="next"
//           >
//             <span
//               className="carousel-control-next-icon"
//               aria-hidden="true"
//             ></span>
//             <span className="sr-only">Next</span>
//           </a>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Hero;

import { useEffect, useState } from "react";

const HeroCarousel = () => {
  // Images for the carousel
  const images = [forestbg, animebg, medievalbg, punkbg, herosteampunk];

  // State to track the current slide
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Function to go to the previous slide
  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length,
    );
  };

  useEffect(() => {
    const intervalId = setInterval(nextSlide, 5000); // 3 seconds interval

    return () => clearInterval(intervalId); // Clear interval on component unmount
  });
  return (
    <div className="relative w-full h-[500px]">
      {/* Background Image */}
      <div
        className="w-full h-full bg-cover bg-center transition-all ease-in-out delay-150 flex items-end justify-center text-center p-5"
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
      >
        {" "}
        <div className=" flex flex-col gap-2 text-white h-40">
          <h1 className="text-[40px]">Your Outfit. Your Story.</h1>
          <p className="hidden sm:block">
            Discover unique outfits, share your style, and get inspired every
            day.
          </p>
          <p className="hidden sm:block">
            A community of fashion rebels, creators, and dreamers.
          </p>
        </div>
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-3xl p-2 bg-black bg-opacity-50 rounded-full"
        >
          <ChevronLeft size={32} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-3xl p-2 bg-black bg-opacity-50 rounded-full"
        >
          <ChevronRight size={32} />
        </button>
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <span
            key={index}
            className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-white" : "bg-gray-400"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
