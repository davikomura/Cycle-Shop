import { categoryNameKey } from "../i18n/catalogKeys";
import { useI18n } from "../i18n/I18n";
import { useCatalog } from "../lib/useCatalog";
import { Link, useSearch } from "@tanstack/react-router";
import { useCart } from "../context/useCart";

export const SearchResults = () => {
  const { t, formatPrice } = useI18n(["common", "catalog", "products"]);
  const query = useSearch({
    from: "/search",
    select: (search) => search.q ?? "",
  });
  const { data: catalog } = useCatalog();
  const results = catalog.filter((bike) =>
    [
      bike.nome,
      bike.descricao,
      bike.tipo,
      t(`products:items.${bike.id}.description`),
      t(categoryNameKey(bike.tipo)),
    ]
      .join(" ")
      .toLowerCase()
      .includes(query.trim().toLowerCase()),
  );
  const { addItem } = useCart();

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#d46847]">
          {t("catalog:search")}
        </p>
        <h1 className="mt-2 text-3xl font-bold text-gray-900">
          {query
            ? t("catalog:resultsForQuery", { query })
            : t("catalog:browseAllBikes")}
        </h1>
        <p className="mt-3 text-gray-600">
          {t("catalog:results.count", { count: results.length })}
        </p>
      </div>

      {results.length === 0 ? (
        <div className="soft-panel rounded-[28px] p-10 text-center">
          <h2 className="text-xl font-semibold text-gray-900">
            {t("catalog:noMatchesYet")}
          </h2>
          <p className="mt-3 text-gray-600">
            {t("catalog:tryABroaderTermLikeMountainCity")}
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex rounded-full bg-gray-800 px-5 py-3 text-white transition-colors hover:bg-[#FF6347]"
          >
            {t("common:backToHomepage")}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((bike) => (
            <article
              key={bike.id}
              className="group overflow-hidden rounded-[28px] border border-white/70 bg-white/80 shadow-[0_16px_40px_rgba(18,19,23,0.08)] backdrop-blur-xs transition-all hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(18,19,23,0.12)]"
            >
              <Link
                to="/product/$productId"
                params={{ productId: String(bike.id) }}
                className="block"
              >
                <img
                  src={bike.imagem}
                  alt={bike.nome}
                  className="h-64 w-full bg-[linear-gradient(180deg,#fff8f1_0%,#ffffff_100%)] object-contain p-8 transition-transform duration-500 group-hover:scale-105"
                />
              </Link>
              <div className="px-5 pb-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#d46847]">
                  {t(categoryNameKey(bike.tipo))}
                </p>
                <Link
                  to="/product/$productId"
                  params={{ productId: String(bike.id) }}
                >
                  <h2 className="mt-2 text-xl font-semibold text-gray-900">
                    {bike.nome}
                  </h2>
                </Link>
                <p className="mt-2 min-h-[72px] text-sm leading-6 text-gray-600">
                  {t(`products:items.${bike.id}.description`)}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">
                    {formatPrice(bike.preco)}
                  </span>
                  <button
                    type="button"
                    onClick={() => addItem(bike)}
                    className="rounded-full bg-gray-800 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#FF6347]"
                  >
                    {t("common:actions.addToCart")}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};
