import { categoryNameKey } from "../i18n/catalogKeys";
import { useI18n } from "../i18n/I18n";
import { useCatalog } from "../lib/useCatalog";
import { Link, useParams } from "@tanstack/react-router";
import { useCart } from "../context/useCart";
import { useFavorites } from "../context/useFavorites";

export const ProductDetail = () => {
  const { t, formatPrice } = useI18n(["common", "catalog", "products"]);
  const { productId = "" } = useParams({ from: "/product/$productId" });
  const { data: catalog } = useCatalog();
  const bike = catalog.find((product) => product.id === Number(productId));
  const { addItem } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!bike) {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-5xl flex-col justify-center px-4 py-16">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-red">
          {t("catalog:product")}
        </p>
        <h1 className="mt-2 text-3xl font-bold text-gray-900">
          {t("catalog:productNotFound")}
        </h1>
        <p className="mt-3 max-w-2xl text-gray-600">
          {t("catalog:thisBikeIsNoLongerAvailableOr")}
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-full bg-gray-800 px-5 py-3 text-white transition-colors hover:bg-brand-red"
        >
          {t("common:backToHomepage")}
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
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-red">
            {t(categoryNameKey(bike.tipo))}
          </p>
          <h1 className="mt-3 text-4xl font-bold text-gray-900">{bike.nome}</h1>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            {t(`products:items.${bike.id}.description`)}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-full bg-[#edf4ff] px-3 py-1 text-sm font-semibold text-brand-blue">
              {bike.avaliacao
                ? t("catalog:rating5AverageRating", { rating: bike.avaliacao })
                : t("common:newArrival")}
            </span>
            <span className="rounded-full bg-brand-soft px-3 py-1 text-sm font-semibold text-brand-red">
              {t("catalog:sales.count", { count: bike.totalVendas })}
            </span>
          </div>

          <div className="mt-8 flex items-end gap-4">
            <span className="text-4xl font-bold text-gray-900">
              {formatPrice(bike.preco)}
            </span>
            <span className="pb-1 text-sm text-gray-500">
              {t("catalog:vatIncluded")}
            </span>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => addItem(bike)}
              className="rounded-full bg-linear-to-r from-brand-red to-brand-red-dark px-6 py-3 font-medium text-white shadow-lg shadow-brand-red/20 transition-all hover:-translate-y-0.5 hover:shadow-brand-red/30"
            >
              {t("common:actions.addToCart")}
            </button>
            <button
              type="button"
              onClick={() => toggleFavorite(bike.id)}
              className="rounded-full border border-gray-300 px-6 py-3 text-gray-700 transition-colors hover:border-brand-red hover:text-brand-red"
            >
              {t(
                isFavorite(bike.id)
                  ? "common:savedToFavorites"
                  : "common:saveToFavorites",
              )}
            </button>
            <Link
              to={`/search?q=${encodeURIComponent(categoryNameKey(bike.tipo))}`}
              className="rounded-full border border-gray-300 px-6 py-3 text-gray-700 transition-colors hover:border-gray-500"
            >
              {t("catalog:moreLikeThis")}
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="soft-panel rounded-2xl px-4 py-4">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-red">
                {t("catalog:delivery")}
              </p>
              <p className="mt-2 text-sm text-gray-600">
                {t("catalog:shipsIn24Hours")}
              </p>
            </div>
            <div className="soft-panel rounded-2xl px-4 py-4">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-red">
                {t("catalog:warranty")}
              </p>
              <p className="mt-2 text-sm text-gray-600">
                {t("catalog:2YearsOnFrame")}
              </p>
            </div>
            <div className="soft-panel rounded-2xl px-4 py-4">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-red">
                {t("common:support")}
              </p>
              <p className="mt-2 text-sm text-gray-600">
                {t("catalog:setupGuidanceIncluded")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
