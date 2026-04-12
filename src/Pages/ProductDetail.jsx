import { Link, useParams } from 'react-router-dom';
import { useCart } from '../context/useCart.jsx';
import { useFavorites } from '../context/useFavorites.jsx';
import { formatPrice, getProductById } from '../lib/catalog.js';

export const ProductDetail = () => {
  const { productId = '' } = useParams();
  const bike = getProductById(productId);
  const { addItem } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!bike) {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-5xl flex-col justify-center px-4 py-16">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#d46847]">
          Product
        </p>
        <h1 className="mt-2 text-3xl font-bold text-gray-900">Product not found</h1>
        <p className="mt-3 max-w-2xl text-gray-600">
          This bike is no longer available or the link is incorrect.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-full bg-gray-800 px-5 py-3 text-white transition-colors hover:bg-[#FF6347]"
        >
          Back to homepage
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="soft-panel rounded-[32px] p-8">
          <img
            src={bike.imagem}
            alt={bike.nome}
            className="mx-auto h-[420px] w-full object-contain"
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#d46847]">
            {bike.tipo}
          </p>
          <h1 className="mt-3 text-4xl font-bold text-gray-900">{bike.nome}</h1>
          <p className="mt-4 text-lg leading-8 text-gray-600">{bike.descricao}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-full bg-[#edf4ff] px-3 py-1 text-sm font-semibold text-[#3560a3]">
              {bike.avaliacao ? `${bike.avaliacao}/5 average rating` : 'New arrival'}
            </span>
            <span className="rounded-full bg-[#f8ede2] px-3 py-1 text-sm font-semibold text-[#d46847]">
              {bike.totalVendas} sold
            </span>
          </div>

          <div className="mt-8 flex items-end gap-4">
            <span className="text-4xl font-bold text-gray-900">
              {formatPrice(bike.preco)}
            </span>
            <span className="pb-1 text-sm text-gray-500">VAT included</span>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => addItem(bike)}
              className="rounded-full bg-gradient-to-r from-[#e95f3c] to-[#ff8b61] px-6 py-3 font-medium text-white shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-0.5 hover:shadow-orange-500/30"
            >
              Add to cart
            </button>
            <button
              type="button"
              onClick={() => toggleFavorite(bike.id)}
              className="rounded-full border border-gray-300 px-6 py-3 text-gray-700 transition-colors hover:border-[#d46847] hover:text-[#d46847]"
            >
              {isFavorite(bike.id) ? 'Saved to favorites' : 'Save to favorites'}
            </button>
            <Link
              to={`/search?q=${encodeURIComponent(bike.tipo)}`}
              className="rounded-full border border-gray-300 px-6 py-3 text-gray-700 transition-colors hover:border-gray-500"
            >
              More like this
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="soft-panel rounded-2xl px-4 py-4">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#d46847]">
                Delivery
              </p>
              <p className="mt-2 text-sm text-gray-600">Ships in 24 hours</p>
            </div>
            <div className="soft-panel rounded-2xl px-4 py-4">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#d46847]">
                Warranty
              </p>
              <p className="mt-2 text-sm text-gray-600">2 years on frame</p>
            </div>
            <div className="soft-panel rounded-2xl px-4 py-4">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#d46847]">
                Support
              </p>
              <p className="mt-2 text-sm text-gray-600">Setup guidance included</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
