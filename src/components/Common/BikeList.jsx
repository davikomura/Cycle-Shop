import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import { useCart } from '../../context/useCart.jsx';
import {
  formatPrice,
  getCompleteBikeCatalog,
} from '../../lib/catalog.js';

const SORT_OPTIONS = [
  'Best Sellers',
  'Top Rated',
  'Price: Low to High',
  'Price: High to Low',
];

const BikeList = ({ tipo }) => {
  const { addItem } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('Best Sellers');

  const bikes = useMemo(
    () => getCompleteBikeCatalog().filter((bike) => bike.tipo === tipo),
    [tipo],
  );

  useEffect(() => {
    setSelectedSort('Best Sellers');
  }, [tipo]);

  const sortedBikes = useMemo(() => {
    const currentBikes = [...bikes];

    switch (selectedSort) {
      case 'Top Rated':
        return currentBikes.sort(
          (a, b) => (b.avaliacao ?? 0) - (a.avaliacao ?? 0),
        );
      case 'Price: Low to High':
        return currentBikes.sort((a, b) => a.preco - b.preco);
      case 'Price: High to Low':
        return currentBikes.sort((a, b) => b.preco - a.preco);
      case 'Best Sellers':
      default:
        return currentBikes.sort((a, b) => b.totalVendas - a.totalVendas);
    }
  }, [bikes, selectedSort]);

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold">{tipo}</h1>
          <p className="mt-2 text-gray-600">
            {sortedBikes.length} models ready to browse.
          </p>
        </div>

        <div className="relative inline-block text-left">
          <button
            type="button"
            onClick={() => setIsOpen((currentValue) => !currentValue)}
            className="inline-flex items-center rounded-lg bg-gray-800 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#FF6347]"
          >
            Sort: {selectedSort}
            <svg
              className="ml-2.5 h-2.5 w-2.5"
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
            <div className="absolute right-0 z-10 mt-2 w-52 rounded-lg bg-white shadow">
              <ul className="py-2 text-sm text-gray-700">
                {SORT_OPTIONS.map((option) => (
                  <li key={option}>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedSort(option);
                        setIsOpen(false);
                      }}
                      className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                    >
                      {option}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {sortedBikes.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-10 text-center">
          <h2 className="text-xl font-semibold text-gray-800">
            This category is being prepared
          </h2>
          <p className="mt-3 text-gray-600">
            We are curating products for this section and will publish them soon.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sortedBikes.map((bike) => (
            <article
              key={bike.id}
              className="w-full max-w-sm rounded-lg border border-gray-200 bg-white shadow"
            >
              <img
                className="h-64 w-full rounded-t-lg object-contain p-8"
                src={bike.imagem}
                alt={bike.nome}
              />
              <div className="px-5 pb-5">
                <h2 className="text-xl font-semibold tracking-tight text-gray-900">
                  {bike.nome}
                </h2>
                <p className="mt-2 min-h-[72px] text-sm leading-6 text-gray-600">
                  {bike.descricao}
                </p>

                <div className="mb-5 mt-4 flex flex-wrap items-center gap-3">
                  <span className="rounded bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800">
                    {bike.avaliacao ? `${bike.avaliacao}/5` : 'New'}
                  </span>
                  <span className="text-xs text-gray-500">
                    {bike.totalVendas} sold
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-3xl font-bold text-gray-900">
                    {formatPrice(bike.preco)}
                  </span>
                  <button
                    type="button"
                    onClick={() => addItem(bike)}
                    className="rounded-lg bg-gray-800 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#FF6347]"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default BikeList;

BikeList.propTypes = {
  tipo: PropTypes.string.isRequired,
};
