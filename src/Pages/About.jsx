import logo from '../assets/logo_dk_cycle_shop.png';

export const About = () => {
  return (
    <div className="2xl:container 2xl:mx-auto px-4 py-9 md:px-6 md:py-12 lg:px-20 lg:py-16">
      <div className="flex flex-col justify-between gap-8 lg:flex-row">
        <div className="flex w-full flex-col justify-center lg:w-3/5">
          <h1 className="pb-4 text-3xl font-bold leading-tight text-gray-800 lg:text-4xl">
            About Us
          </h1>
          <p className="text-base leading-relaxed text-gray-600">
            DK Cycle Shop is a specialized bicycle store offering a wide range of
            products and services for cyclists of all levels. From high-performance
            bikes for professional athletes to urban and recreational models for
            those seeking leisure or sustainable transportation, the shop stands out
            for product quality and personalized service.
          </p>
          <p className="mt-4 text-base leading-relaxed text-gray-600">
            The catalog also includes accessories such as helmets, gloves,
            replacement parts and cycling apparel. A dedicated workshop helps riders
            keep every bike in excellent condition with maintenance and repair
            support.
          </p>
        </div>
        <div className="flex w-full items-center justify-center lg:w-2/5">
          <img className="h-auto w-full rounded-2xl bg-black object-cover" src={logo} alt="DK Cycle Shop logo" />
        </div>
      </div>

      <div className="flex flex-col justify-between gap-8 pt-12 lg:flex-row">
        <div className="flex w-full flex-col justify-center lg:w-5/12">
          <h2 className="pb-4 text-3xl font-bold leading-9 text-gray-800 lg:text-4xl">
            Our Story
          </h2>
          <p className="text-base leading-6 text-gray-600">
            DK Cycle Shop started with a simple ambition: build a place where riders
            could discover reliable bikes, learn more about cycling and feel guided
            instead of overwhelmed. The store combines careful product curation with
            friendly support so beginners and experienced cyclists can shop with
            confidence.
          </p>
        </div>

        <div className="flex w-full flex-col items-center justify-center lg:w-7/12 lg:items-start lg:justify-start lg:pt-8">
          <img
            className="rounded-md object-cover object-left"
            src="/img/davit1.png"
            alt="Founder portrait"
          />
          <p className="mt-4 text-left text-xl font-medium leading-5 text-gray-800 lg:text-center">
            Davi Komura
          </p>
        </div>
      </div>
    </div>
  );
};
