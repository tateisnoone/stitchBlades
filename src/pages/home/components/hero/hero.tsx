import animebg from "@/assets/images/heroanime.webp";
import forestbg from "@/assets/images/heroforest.webp";
import medievalbg from "@/assets/images/heromedieval.webp";
import punkbg from "@/assets/images/heropunk.webp";
import herosteampunk from "@/assets/images/herosteampunk.webp";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const HeroCarousel = () => {
  const { t } = useTranslation();
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
          <h1 className="text-[40px]"> {t("home-page.HeroTitle")}</h1>
          <p className="hidden sm:block">{t("home-page.HeroText")}</p>
          <p className="hidden sm:block">{t("home-page.HeroText2")}</p>
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
