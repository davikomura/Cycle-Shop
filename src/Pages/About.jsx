import React from 'react'
import logo from "../assets/logo_dk_cycle_shop.png";
import davi1 from '../../public/img/davit1.png'

export const About = () => {
  return (
    <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
        <div className="flex flex-col lg:flex-row justify-between gap-8">
            <div className="w-full lg:w-3/5 flex flex-col justify-center">
                <h1 className="text-3xl lg:text-4xl font-bold leading-tight text-gray-800 pb-4">Sobre Nós</h1>
                <p className="text-base leading-relaxed text-gray-600">
                    É um fato conhecido que um leitor se distrairá com o conteúdo legível de uma página ao olhar para o seu layout. O uso de Lorem Ipsum é conveniente. Desde o princípio, concedemos a Deus e confirmamos por esta nossa carta presente para nós e nossos herdeiros, para sempre, que a Igreja Inglesa será livre e terá seus direitos inteiros e suas liberdades invioladas; e desejamos que seja assim observado; o que é evidente a partir de...
                </p>
            </div>
            <div className="w-full lg:w-2/5 flex items-center justify-center">
                <img className="w-full h-auto object-cover bg-black" src={logo} alt="Logo" />
            </div>
        </div>


        <div className="flex flex-col lg:flex-row justify-between gap-8 pt-12">
            <div className="w-full lg:w-5/12 flex flex-col justify-center">
                <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">Our Story</h1>
                <p className="font-normal text-base leading-6 text-gray-600">
                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum. In the first place, we have granted to God, and by this our present charter confirmed for us and our heirs forever that the English Church shall be free, and shall have her rights entire, and her liberties inviolate; and we will that it be thus observed; which is apparent from...
                </p>
            </div>

            <div className="w-full lg:w-7/12 lg:pt-8 flex flex-col justify-center lg:justify-start items-center lg:items-start">
                <img
                    className="object-cover lg:object-left"
                    src={davi1}
                    alt="Davi Img"
                />
                <p className="font-medium text-xl leading-5 text-gray-800 mt-4 lg:text-center text-left">Davi Komura</p>
            </div>
        </div>
    </div>
  )
}
