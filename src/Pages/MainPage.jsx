import dona from '../assets/bike.png';
import { Link } from 'react-router-dom';
import { useCart } from '../context/useCart.jsx';
import { useFavorites } from '../context/useFavorites.jsx';
import { formatPrice, getFeaturedProducts } from '../lib/catalog.js';
import ImageCarousel from '../components/Content/ImageCarousel';

export const MainPage = () => {
  const featuredBikes = getFeaturedProducts();
  const { addItem } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <>
      <section className="ambient-grid overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(255,132,92,0.35),_transparent_28%),linear-gradient(135deg,#191c23_0%,#111318_60%,#19140f_100%)] pt-10 sm:pt-16 md:pt-0 2xl:pt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div className="hero-fade flex flex-col items-center py-12 text-center md:items-start md:text-left">
              <div className="w-full max-w-2xl rounded-[32px] border border-white/70 bg-[rgba(255,250,244,0.82)] px-8 py-10 text-[#1c1d22] shadow-[0_24px_70px_rgba(18,19,23,0.12)] backdrop-blur-xl">
                <span className="inline-flex rounded-full border border-[#f0c7b4] bg-white/70 px-4 py-2 text-sm uppercase tracking-[0.3em] text-[#d46847]">
                  Fresh drop
                </span>
                <h1 className="mt-6 text-3xl font-bold leading-tight text-[#181a20] sm:text-4xl lg:text-5xl">
                  Ride farther with our new Tarmac collection
                </h1>
                <p className="mt-4 max-w-lg text-xl leading-relaxed text-[#5c6472] md:mt-8">
                  Limited units, faster frames and hand-picked accessories for your
                  next long ride.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to="/Road-Bike"
                    className="rounded-full bg-[#1b1e24] px-6 py-3 text-base text-white shadow-lg shadow-black/20 transition-transform hover:-translate-y-0.5 hover:bg-[#e95f3c]"
                  >
                    Explore now
                  </Link>
                  <Link
                    to="/Mountain-Bike"
                    className="rounded-full border border-[#d7dce2] bg-white/70 px-6 py-3 text-base text-[#1c1d22] transition-colors hover:border-[#d46847] hover:text-[#d46847]"
                  >
                    Compare models
                  </Link>
                </div>
                <div className="mt-8 grid w-full max-w-xl grid-cols-3 gap-3 text-left">
                  <div className="rounded-2xl border border-[#ead8ce] bg-white/72 px-4 py-4 text-[#1b1e24]">
                    <p className="text-2xl font-bold">24h</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[#737b88]">
                      dispatch
                    </p>
                  </div>
                  <div className="rounded-2xl border border-[#ead8ce] bg-white/72 px-4 py-4 text-[#1b1e24]">
                    <p className="text-2xl font-bold">5.0</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[#737b88]">
                      ride feel
                    </p>
                  </div>
                  <div className="rounded-2xl border border-[#ead8ce] bg-white/72 px-4 py-4 text-[#1b1e24]">
                    <p className="text-2xl font-bold">12</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[#737b88]">
                      featured builds
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="hero-fade relative flex justify-center py-10">
              <div className="absolute inset-0 m-auto h-72 w-72 rounded-full bg-[#ff875d]/25 blur-3xl" />
              <img
                className="relative w-full max-w-sm drop-shadow-[0_30px_60px_rgba(0,0,0,0.45)] md:max-w-full xl:mx-auto xl:max-w-lg 2xl:origin-bottom 2xl:scale-110"
                src={dona}
                alt="Road bike hero"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="font-[sans-serif]">
        <div className="mx-auto p-4 sm:max-w-full lg:max-w-7xl">
          <div className="mb-12 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#d46847]">
                Editor&apos;s picks
              </p>
              <h2 className="mt-2 text-4xl font-extrabold text-gray-800">Highlights</h2>
              <p className="mt-2 max-w-2xl text-gray-600">
                Popular bikes with the strongest demand and best review signals.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {featuredBikes.map((bike, index) => (
              <article
                key={bike.id}
                className="rise-in relative overflow-hidden rounded-[28px] border border-white/60 bg-white/80 p-5 shadow-[0_16px_40px_rgba(18,19,23,0.08)] backdrop-blur-sm transition-all hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(18,19,23,0.12)]"
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <button
                  type="button"
                  onClick={() => toggleFavorite(bike.id)}
                  className={`absolute left-4 top-4 z-10 rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition-colors ${
                    isFavorite(bike.id)
                      ? 'bg-[#ffe2da] text-[#d64b24]'
                      : 'bg-white/80 text-gray-600 hover:text-[#d64b24]'
                  }`}
                >
                  {isFavorite(bike.id) ? 'Saved' : 'Save'}
                </button>
                <div className="absolute right-4 top-4 rounded-full bg-[#f8ede2] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#d46847]">
                  Top pick
                </div>
                <div className="mx-auto mb-4 h-[210px] w-11/12 overflow-hidden">
                  <img
                    src={bike.imagem}
                    alt={bike.nome}
                    className="h-full w-full object-contain transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div>
                  <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-[#d46847]">
                    {bike.tipo}
                  </p>
                  <h3 className="text-center text-lg font-extrabold text-gray-800">
                    {bike.nome}
                  </h3>
                  <p className="mt-2 text-center text-sm text-gray-500">
                    {bike.totalVendas} sold
                  </p>
                  <h4 className="mt-4 text-center text-lg font-bold text-gray-800">
                    {formatPrice(bike.preco)}
                  </h4>
                  <div className="mt-4 flex gap-2">
                    <Link
                      to={`/product/${bike.id}`}
                      className="flex-1 rounded-full border border-gray-300 px-4 py-2.5 text-center text-sm font-medium text-gray-700 transition-colors hover:border-[#d46847] hover:text-[#d46847]"
                    >
                      Details
                    </Link>
                    <button
                      type="button"
                      onClick={() => addItem(bike)}
                      className="flex-1 rounded-full bg-gray-800 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-[#FF6347]"
                    >
                      Add to cart
                    </button>
                  </div>
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
