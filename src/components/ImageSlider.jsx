import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function MediaSlider({ urls, w = "full", h = "64" }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? urls.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === urls.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full max-w-lg mx-auto border-2 border-blue-100 shadow-lg p-1 ">
      {/* Detect Image or Video */}
      {urls[currentIndex]?.endsWith(".mp4") ? (
        <video
          src={urls[currentIndex]}
          controls
          muted
          className={`w-${w} h-${h} object-cover rounded-lg shadow-lg`}
        />
      ) : (
        <img
          src={urls[currentIndex]}
          controls
          alt={`Slide ${currentIndex + 1}`}
          className={`w-${w} h-${h} object-cover rounded-lg shadow-lg`}
        />
      )}

      {/* Prev Button */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-transparent text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}
