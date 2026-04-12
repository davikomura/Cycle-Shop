import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import data from '/data.json';
import { getCategoryRoute } from '../../lib/catalog.js';

const ImageCarousel = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const carouselRef = useRef(null);

  const categorias = data.Categorias.map((categoria) => ({
    name: categoria.tipo,
    image: `/${categoria.imagem}`,
  }));

  const prevSlide = () => {
    const newIndex =
      currentImageIndex === 0 ? categorias.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(newIndex);
    const carousel = carouselRef.current;
    const imageWidth = carousel.scrollWidth / categorias.length;
    carousel.scrollLeft = newIndex * imageWidth;
  };

  const nextSlide = () => {
    const newIndex =
      currentImageIndex === categorias.length - 1 ? 0 : currentImageIndex + 1;
    setCurrentImageIndex(newIndex);
    const carousel = carouselRef.current;
    const imageWidth = carousel.scrollWidth / categorias.length;
    carousel.scrollLeft = newIndex * imageWidth;
  };

  const handleMouseDown = (event) => {
    setIsDragging(true);
    setStartX(event.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (event) => {
    if (!isDragging) {
      return;
    }

    event.preventDefault();
    const x = event.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="relative m-auto flex flex-col bg-gray-dark">
      <div
        className="no-select flex overflow-x-scroll pb-20 pt-20"
        ref={carouselRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        style={{ cursor: 'default', overflowX: 'hidden' }}
      >
        <div className="ml-10 flex flex-nowrap md:ml-20 lg:ml-40">
          {categorias.map((categoria, index) => (
            <div className="relative inline-block px-3" key={categoria.name}>
              <div
                className={`h-64 w-64 max-w-xs overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 ease-in-out hover:shadow-xl ${
                  index === currentImageIndex ? 'border-4 border-blue-500' : ''
                }`}
              >
                <img
                  src={categoria.image}
                  alt={categoria.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-3xl font-bold">
                  <div className="text-white">{categoria.name}</div>
                </div>
                <div className="absolute bottom-5 left-0 right-0 flex justify-center">
                  <Link
                    to={getCategoryRoute(categoria.name)}
                    className="rounded-lg bg-white px-8 py-2 font-bold text-black transition-colors hover:bg-[#FF6347]"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="group absolute left-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
        onClick={prevSlide}
      >
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white">
          <svg
            className="h-4 w-4 text-white"
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
        className="group absolute right-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
        onClick={nextSlide}
      >
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 group-hover:bg-[#FF6347] group-focus:ring-4 group-focus:ring-white">
          <svg
            className="h-4 w-4 text-gray-dark"
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
