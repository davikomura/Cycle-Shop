import React, { useState } from 'react';
import dona from "../../assets/bike.png";
import bikesData from "/data.json"; // Importe os dados das bicicletas
import ImageCarousel from '../Content/ImageCarousel';

export const MainPage = () => {
  // Pegue as 4 primeiras bicicletas
  const featuredBikes = bikesData.bikes.slice(0, 4);

  return (
    <>
      {/* <ImageCarousel /> */}

      <section className="pt-10 overflow-hidden bg-gray-dark dark:bg-gray-800 md:pt-0 sm:pt-16 2xl:pt-16">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid items-center grid-cols-1 gap-8 md:grid-cols-2">
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <h2 className="text-3xl font-bold leading-tight text-white dark:text-white sm:text-4xl lg:text-5xl">
                New Tarmac
              </h2>
              <p className="max-w-lg mt-3 text-xl leading-relaxed text-white dark:text-gray-300 md:mt-8">
                Unidades Limitadas
              </p>
              <button className="bg-white py-2 px-6 rounded mt-3 text-base">
                Comprar
              </button>
            </div>
            <div className="relative flex justify-center">
              <img className="relative w-full max-w-sm md:max-w-full xl:max-w-lg xl:mx-auto 2xl:origin-bottom 2xl:scale-110" src={dona} alt="" />
            </div>
          </div>
        </div>
      </section>

      <div className="font-[sans-serif] bg-white">
        <div className="p-4 mx-auto lg:max-w-7xl sm:max-w-full">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-12">Highlights</h2>
      
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-xl:gap-4 gap-6">
            {featuredBikes.map((bike, index) => (
              <div key={index} className="bg-white rounded-2xl p-5 cursor-pointer hover:-translate-y-2 transition-all relative">
                <div className="w-11/12 h-[210px] overflow-hidden mx-auto aspect-w-16 aspect-h-8 md:mb-2 mb-4">
                  <img src={bike.imagem} alt={bike.nome} className="h-full w-full object-contain" />
                </div>
                <div>
                  <h3 className="text-lg text-center font-extrabold text-gray-800">{bike.nome}</h3>
                  <h4 className="text-lg text-center text-gray-800 font-bold mt-4">{bike.preco} €</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ImageCarousel />
    </>
  );
};
