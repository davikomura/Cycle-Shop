import dona from '../assets/bike.png';
import { useCart } from '../context/useCart.jsx';
import { formatPrice, getFeaturedProducts } from '../lib/catalog.js';
import ImageCarousel from '../components/Content/ImageCarousel';

export const MainPage = () => {
  const featuredBikes = getFeaturedProducts();
  const { addItem } = useCart();

  return (
    <>
      <section className="overflow-hidden bg-gray-dark pt-10 sm:pt-16 md:pt-0 2xl:pt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <span className="rounded-full border border-white/20 px-4 py-2 text-sm uppercase tracking-[0.3em] text-[#FFAA9A]">
                Fresh drop
              </span>
              <h1 className="mt-6 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                Ride farther with our new Tarmac collection
              </h1>
              <p className="mt-4 max-w-lg text-xl leading-relaxed text-gray-200 md:mt-8">
                Limited units, faster frames and hand-picked accessories for your
                next long ride.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button className="rounded bg-white px-6 py-2 text-base text-gray-dark">
                  Explore now
                </button>
                <button className="rounded border border-white/30 px-6 py-2 text-base text-white">
                  Compare models
                </button>
              </div>
            </div>
            <div className="relative flex justify-center">
              <img
                className="relative w-full max-w-sm md:max-w-full xl:mx-auto xl:max-w-lg 2xl:origin-bottom 2xl:scale-110"
                src={dona}
                alt="Road bike hero"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white font-[sans-serif]">
        <div className="mx-auto p-4 sm:max-w-full lg:max-w-7xl">
          <div className="mb-12 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-4xl font-extrabold text-gray-800">Highlights</h2>
              <p className="mt-2 text-gray-600">
                Popular bikes with the strongest demand and best review signals.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {featuredBikes.map((bike) => (
              <article
                key={bike.id}
                className="relative rounded-2xl bg-white p-5 shadow-sm transition-all hover:-translate-y-2 hover:shadow-lg"
              >
                <div className="mx-auto mb-4 h-[210px] w-11/12 overflow-hidden">
                  <img
                    src={bike.imagem}
                    alt={bike.nome}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-center text-lg font-extrabold text-gray-800">
                    {bike.nome}
                  </h3>
                  <p className="mt-2 text-center text-sm text-gray-500">
                    {bike.totalVendas} sold
                  </p>
                  <h4 className="mt-4 text-center text-lg font-bold text-gray-800">
                    {formatPrice(bike.preco)}
                  </h4>
                  <button
                    type="button"
                    onClick={() => addItem(bike)}
                    className="mt-4 w-full rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#FF6347]"
                  >
                    Add to cart
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ImageCarousel />
    </>
  );
};
