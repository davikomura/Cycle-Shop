import React, { useState, useRef, useEffect } from 'react';
import data from '/data.json';

const BikeList = ({ tipo }) => {
  const [bikes, setBikes] = useState(data.bikes.filter(bike => bike.tipo === tipo));
  const [isOpen, setIsOpen] = useState(false);
  const dropdownButtonRef = useRef(null);
  const dropdownRef = useRef(null);

  const [salesData, setSalesData] = useState(data.vendas);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const sortBikes = (criteria) => {
    let sortedBikes;
    switch (criteria) {
      case 'Mais Vendidos':
        sortedBikes = [...bikes].sort((a, b) => {
          const salesA = salesData.find(sale => sale.nome === a.nome)?.total_vendas || 0;
          const salesB = salesData.find(sale => sale.nome === b.nome)?.total_vendas || 0;
          return salesB - salesA;
        });
        break;
      case 'Melhor Avaliados':
        sortedBikes = [...bikes].sort((a, b) => b.avaliacao - a.avaliacao);
        break;
      case 'Preço (Menor para Maior)':
        sortedBikes = [...bikes].sort((a, b) => a.preco - b.preco);
        break;
      case 'Preço (Maior para Menor)':
        sortedBikes = [...bikes].sort((a, b) => b.preco - a.preco);
        break;
      default:
        sortedBikes = [...bikes];
    }
    setBikes(sortedBikes);
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen && dropdownButtonRef.current && dropdownRef.current) {
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      if (dropdownRect.right > viewportWidth) {
        dropdownRef.current.style.left = `${viewportWidth - dropdownRect.right}px`;
      } else {
        dropdownRef.current.style.left = '0';
      }

      if (dropdownRect.bottom > viewportHeight) {
        dropdownRef.current.style.top = `${-dropdownRect.height}px`;
      } else {
        dropdownRef.current.style.top = 'auto';
      }
    }
  }, [isOpen]);

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold">{tipo}</h1>
      </div>
      <div className="relative inline-block text-left pb-4">
        <button
          ref={dropdownButtonRef}
          onClick={toggleDropdown}
          type="button"
          className="text-white bg-gray-800 hover:bg-[#FF6347] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Classificar
          <svg
            className="w-2.5 h-2.5 ml-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
        {isOpen && (
          <div
            ref={dropdownRef}
            className="absolute z-10 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700"
          >
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
              <li>
                <button onClick={() => sortBikes('Mais Vendidos')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Mais Vendidos</button>
              </li>
              <li>
                <button onClick={() => sortBikes('Melhor Avaliados')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Melhor Avaliados</button>
              </li>
              <li>
                <button onClick={() => sortBikes('Preço (Menor para Maior)')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Preço (Menor para Maior)</button>
              </li>
              <li>
                <button onClick={() => sortBikes('Preço (Maior para Menor)')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Preço (Maior para Menor)</button>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bikes.map((bike, index) => (
          <div key={index} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <img className="p-8 rounded-t-lg" src={bike.imagem} alt="product image" />
            </a>
            <div className="px-5 pb-5">
              <a href="#">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{bike.nome}</h5>
              </a>
              <div className="flex items-center mt-2.5 mb-5">
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                  </svg>
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">{bike.avaliacao}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-3">
                  {salesData.find(item => item.nome === bike.nome)?.total_vendas || 0} vendido(s)
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">${bike.preco}</span>
                <a href="#" className="text-white bg-gray-800 hover:bg-[#FF6347] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BikeList;
