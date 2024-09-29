import React from 'react'
import logo from "../assets/logo_dk_cycle_shop.png";
import davi1 from '../../public/img/davit1.png'

export const About = () => {
  return (
    <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
        <div className="flex flex-col lg:flex-row justify-between gap-8">
            <div className="w-full lg:w-3/5 flex flex-col justify-center">
                <h1 className="text-3xl lg:text-4xl font-bold leading-tight text-gray-800 pb-4">About Us</h1>
                <p className="text-base leading-relaxed text-gray-600">
                DK Cycle Shop is a specialized bicycle store offering a wide range of products and services for cyclists of all levels. From high-performance bikes for professional athletes to urban and recreational models for those seeking leisure or sustainable transportation, DK Cycle Shop stands out for the quality of its products and personalized service.

                The shop also provides a complete line of accessories, such as helmets, gloves, replacement parts, and appropriate cycling apparel. Additionally, it features a specialized workshop for maintenance and repairs, ensuring that bicycles are always in top working condition.

                With a team passionate about cycling and highly qualified, DK Cycle Shop prioritizes customer satisfaction, offering technical advice and tips to enhance cycling performance. Whether for beginners or experienced riders, DK Cycle Shop is the perfect destination for those seeking reliability, safety, and innovation in the world of bikes.
                </p>
            </div>
            <div className="w-full lg:w-2/5 flex items-center justify-center">
                <img className="w-full h-auto object-cover bg-black rounded-2xl" src={logo} alt="Logo" />
            </div>
        </div>


        <div className="flex flex-col lg:flex-row justify-between gap-8 pt-12">
            <div className="w-full lg:w-5/12 flex flex-col justify-center">
                <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">Our Story</h1>
                <p className="font-normal text-base leading-6 text-gray-600">
                    At DK Cycle Shop, our journey began with a passion for cycling and a dream to create a place where fellow enthusiasts could find high-quality bikes and build a community around this shared love. Founded by Davi Komura, the shop was born out of a desire to offer more than just bicycles—we wanted to provide an experience that inspires people to embrace the joy of cycling, whether for sport, commuting, or recreation.
                </p>
            </div>

            <div className="w-full lg:w-7/12 lg:pt-8 flex flex-col justify-center lg:justify-start items-center lg:items-start">
                <img
                    className="object-cover lg:object-left rounded-md"
                    src={davi1}
                    alt="Davi Img"
                />
                <p className="font-medium text-xl leading-5 text-gray-800 mt-4 lg:text-center text-left">Davi Komura</p>
            </div>
        </div>
    </div>
  )
}
