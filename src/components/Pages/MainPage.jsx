import React, { useState } from 'react';
import ImageCarousel from '../Content/ImageCarousel';
import dona from "../../assets/bike.png"
import MountainMasterPro from "../../assets/MountainMasterPro.jpg"

export const MainPage = () => {

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


    
      <div class="font-[sans-serif] bg-white">
        <div class="p-4 mx-auto lg:max-w-7xl sm:max-w-full">
          <h2 class="text-4xl font-extrabold text-gray-800 mb-12">Destaques</h2>
      
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-xl:gap-4 gap-6">
            <div class="bg-white rounded-2xl p-5 cursor-pointer hover:-translate-y-2 transition-all relative">
              <div class="w-11/12 h-[210px] overflow-hidden mx-auto aspect-w-16 aspect-h-8 md:mb-2 mb-4">
                <img src="#" alt="Product 1"
                  class="h-full w-full object-contain" />
              </div>
              <div>
                <h3 class="text-lg font-extrabold text-gray-800">EcoRider 3000</h3>
                <h4 class="text-lg text-gray-800 font-bold mt-4">€750</h4>
              </div>
            </div>
      
            <div class="bg-white rounded-2xl p-5 cursor-pointer hover:-translate-y-2 transition-all relative">
              <div class="w-11/12 h-[210px] overflow-hidden mx-auto aspect-w-16 aspect-h-8 md:mb-2 mb-4">
                <img src="#" alt="Product 2"
                  class="h-full w-full object-contain" />
              </div>
              <div>
                <h3 class="text-lg font-extrabold text-gray-800">UrbanCycler</h3>
                <h4 class="text-lg text-gray-800 font-bold mt-4">€550</h4>
              </div>
            </div>
      
            <div class="bg-white rounded-2xl p-5 cursor-pointer hover:-translate-y-2 transition-all relative">
              <div class="w-11/12 h-[210px] overflow-hidden mx-auto aspect-w-16 aspect-h-8 md:mb-2 mb-4">
                <img src={MountainMasterPro} alt="MountainMaster Pro"
                  class="h-full w-full object-contain" />
              </div>
              <div>
                <h3 class="text-lg font-extrabold text-gray-800">MountainMaster Pro</h3>
                <h4 class="text-lg text-gray-800 font-bold mt-4">€1200</h4>
              </div>
            </div>
      
            <div class="bg-white rounded-2xl p-5 cursor-pointer hover:-translate-y-2 transition-all relative">
              <div class="w-11/12 h-[210px] overflow-hidden mx-auto aspect-w-16 aspect-h-8 md:mb-2 mb-4">
                <img src="#" alt="Product 3"
                  class="h-full w-full object-contain" />
              </div>
              <div>
                <h3 class="text-lg font-extrabold text-gray-800">SpeedyTourer X</h3>
                <h4 class="text-lg text-gray-800 font-bold mt-4">€950</h4>
              </div>
            </div>
      
            {/* <div class="bg-white rounded-2xl p-5 cursor-pointer hover:-translate-y-2 transition-all relative">
              <div
                class="bg-gray-100 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer absolute top-4 right-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="18px" class="fill-gray-800 inline-block" viewBox="0 0 64 64">
                  <path
                    d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                    data-original="#000000"></path>
                </svg>
              </div>
              <div class="w-11/12 h-[210px] overflow-hidden mx-auto aspect-w-16 aspect-h-8 md:mb-2 mb-4">
                <img src="https://readymadeui.com/images/product13.webp" alt="Product 3"
                  class="h-full w-full object-contain" />
              </div>
              <div>
                <h3 class="text-lg font-extrabold text-gray-800">Zenith Glow</h3>
                <h4 class="text-lg text-gray-800 font-bold mt-4">$15</h4>
              </div>
            </div> */}
      
            {/* <div class="bg-white rounded-2xl p-5 cursor-pointer hover:-translate-y-2 transition-all relative">
              <div
                class="bg-gray-100 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer absolute top-4 right-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="18px" class="fill-gray-800 inline-block" viewBox="0 0 64 64">
                  <path
                    d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                    data-original="#000000"></path>
                </svg>
              </div>
              <div class="w-11/12 h-[210px] overflow-hidden mx-auto aspect-w-16 aspect-h-8 md:mb-2 mb-4">
                <img src="https://readymadeui.com/images/product14.webp" alt="Product 3"
                  class="h-full w-full object-contain" />
              </div>
              <div>
                <h3 class="text-lg font-extrabold text-gray-800">Echo Elegance</h3>
                <h4 class="text-lg text-gray-800 font-bold mt-4">$14</h4>
              </div>
            </div> */}
      
            {/* <div class="bg-white rounded-2xl p-5 cursor-pointer hover:-translate-y-2 transition-all relative">
              <div
                class="bg-gray-100 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer absolute top-4 right-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="18px" class="fill-gray-800 inline-block" viewBox="0 0 64 64">
                  <path
                    d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                    data-original="#000000"></path>
                </svg>
              </div>
              <div class="w-11/12 h-[210px] overflow-hidden mx-auto aspect-w-16 aspect-h-8 md:mb-2 mb-4">
                <img src="https://readymadeui.com/images/product15.webp" alt="Product 3"
                  class="h-full w-full object-contain" />
              </div>
              <div>
                <h3 class="text-lg font-extrabold text-gray-800">Pumps</h3>
                <h4 class="text-lg text-gray-800 font-bold mt-4">$14</h4>
              </div>
            </div> */}
      
            {/* <div class="bg-white rounded-2xl p-5 cursor-pointer hover:-translate-y-2 transition-all relative">
              <div
                class="bg-gray-100 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer absolute top-4 right-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="18px" class="fill-gray-800 inline-block" viewBox="0 0 64 64">
                  <path
                    d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                    data-original="#000000"></path>
                </svg>
              </div>
              <div class="w-11/12 h-[210px] overflow-hidden mx-auto aspect-w-16 aspect-h-8 md:mb-2 mb-4">
                <img src="https://readymadeui.com/images/product10.webp" alt="Product 3"
                  class="h-full w-full object-contain" />
              </div>
              <div>
                <h3 class="text-lg font-extrabold text-gray-800">Blaze Burst</h3>
                <h4 class="text-lg text-gray-800 font-bold mt-4">$14</h4>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>

  );
};
