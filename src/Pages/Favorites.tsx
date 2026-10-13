import { useCatalog } from '../lib/useCatalog';
import { Link } from '@tanstack/react-router';
import { useCart } from '../context/useCart';
import { useFavorites } from '../context/useFavorites';
import { formatPrice } from '../lib/catalog';

export const Favorites = () => {
  const { favoriteIds, toggleFavorite, clearFavorites } = useFavorites();
  const { addItem } = useCart();
  const { data: catalog } = useCatalog();
  const favorites = catalog.filter((bike) =>
    favoriteIds.includes(bike.id),
  );

  if (favorites.length === 0) {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-4xl flex-col items-center justify-center px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900">No favorites yet</h1>
        <p className="mt-3 max-w-xl text-gray-600">
          Save bikes here to compare them later and return quickly.
        </p>
        <Link
          to="/"
          className="mt-6 rounded-full bg-gray-800 px-5 py-3 text-white transition-colors hover:bg-[#FF6347]"
        >
          Discover bikes
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#d46847]">
            Saved list
          </p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">Favorites</h1>
          <p className="mt-2 text-gray-600">
            {favorites.length} saved bike{favorites.length === 1 ? '' : 's'} ready
            to compare.
          </p>
        </div>
        <button
          type="button"
          onClick={clearFavorites}
          className="rounded-full border border-gray-300 px-4 py-2 text-sm text-gray-700 transition-colors hover:border-red-300 hover:text-red-600"
        >
          Clear favorites
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {favorites.map((bike) => (
          <article
            key={bike.id}
            className="group overflow-hidden rounded-[28px] border border-white/70 bg-white/80 shadow-[0_16px_40px_rgba(18,19,23,0.08)] backdrop-blur-xs transition-all hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(18,19,23,0.12)]"
          >
            <Link to="/product/$productId" params={{ productId: String(bike.id) }}>
              <img
                src={bike.imagem}
                alt={bike.nome}
                className="h-64 w-full bg-[linear-gradient(180deg,#fff8f1_0%,#ffffff_100%)] object-contain p-8 transition-transform duration-500 group-hover:scale-105"
              />
            </Link>
            <div className="px-5 pb-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#d46847]">
                {bike.tipo}
              </p>
              <h2 className="mt-2 text-xl font-semibold text-gray-900">{bike.nome}</h2>
              <p className="mt-2 min-h-[72px] text-sm leading-6 text-gray-600">
                {bike.descricao}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">
                  {formatPrice(bike.preco)}
                </span>
                <button
                  type="button"
                  onClick={() => toggleFavorite(bike.id)}
                  className="text-sm font-medium text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
              <button
                type="button"
                onClick={() => addItem(bike)}
                className="mt-4 w-full rounded-full bg-gray-800 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#FF6347]"
              >
                Add to cart
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
