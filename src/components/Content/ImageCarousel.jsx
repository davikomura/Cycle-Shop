import React, { useState, useRef } from 'react';

const images = [
  'https://assets.specialized.com/i/specialized/NavigationalTiles_Bikes_1200x1200_02?$scom-navigation-tile$&fmt=auto',
  'https://www.bike-components.de/assets/a/c4390dd0b99e79b1b5df3db693fd79be.avif',
  'https://oggibikes.com.br/wp-content/uploads/2024/02/010_oggi_digital_banner_home_site_janeiro.jpg',
  'https://www.bike-components.de/assets/a/d90551726fba50537f5d83661bf9c95b.avif',
  'https://www.bike-components.de/assets/a/85bc8195a0f83a7aa729e612e8d71c95.avif',
  'https://example.com/image6.jpg',
  'https://example.com/image7.jpg',
  'https://example.com/image8.jpg',
];

const imagesDictionary = {
  'E-Bike': 'https://assets.specialized.com/i/specialized/NavigationalTiles_Bikes_1200x1200_02?$scom-navigation-tile$&fmt=auto',
  'Mountain Bike': 'https://www.bike-components.de/assets/a/c4390dd0b99e79b1b5df3db693fd79be.avif',
  'Road Bike': 'https://oggibikes.com.br/wp-content/uploads/2024/02/010_oggi_digital_banner_home_site_janeiro.jpg',
  'Trekking': 'https://www.bike-components.de/assets/a/d90551726fba50537f5d83661bf9c95b.avif',
  'Kids': 'https://www.bike-components.de/assets/a/85bc8195a0f83a7aa729e612e8d71c95.avif',
  'Pneus': 'https://example.com/image6.jpg',
  'Vestuarios': 'https://example.com/image7.jpg',
  'Acessorios': 'https://example.com/image8.jpg',
};

const ImageCarousel = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const carouselRef = useRef(null);

  const prevSlide = () => {
    const newIndex = currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(newIndex);
    const carousel = carouselRef.current;
    const imageWidth = carousel.scrollWidth / images.length;
    carousel.scrollLeft = newIndex * imageWidth;
  };

  const nextSlide = () => {
    const newIndex = currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1;
    setCurrentImageIndex(newIndex);
    const carousel = carouselRef.current;
    const imageWidth = carousel.scrollWidth / images.length;
    carousel.scrollLeft = newIndex * imageWidth;
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2; // scroll-fast
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="relative flex flex-col bg-gray-dark m-auto p-auto">
      <div
        className="flex overflow-x-scroll pb-20 pt-20 hide-scroll-bar no-select"
        ref={carouselRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        style={{ cursor: 'default', overflowX: 'hidden' }}
      >
        <div className="flex flex-nowrap lg:ml-40 md:ml-20 ml-10 ">
          {images.map((image, index) => (
            <div className="inline-block px-3" key={index}>
              <div
                className={`w-64 h-64 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out ${
                  index === currentImageIndex ? 'border-4 border-blue-500' : ''
                }`}
              >
                <img src={image} alt={`Image ${index}`} className="w-full h-full object-cover" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        type="button"
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={prevSlide}
        data-carousel-prev
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={nextSlide}
        data-carousel-next
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-[#FF6347] dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            className="w-4 h-4 text-gray-dark dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
};

export default ImageCarousel;
