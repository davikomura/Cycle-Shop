import { ProductCard } from "../components/Common/ProductCard";
import { useI18n } from "../i18n/I18n";
import { useCatalog } from "../lib/useCatalog";
import { Link } from "@tanstack/react-router";
import { useFavorites } from "../context/useFavorites";

export const Favorites = () => {
  const { t } = useI18n(["common", "catalog", "products"]);
  const { favoriteIds, clearFavorites } = useFavorites();
  const { data: catalog } = useCatalog();
  const favorites = catalog.filter((bike) => favoriteIds.includes(bike.id));

  if (favorites.length === 0) {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-4xl flex-col items-center justify-center px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          {t("catalog:noFavoritesYet")}
        </h1>
        <p className="mt-3 max-w-xl text-gray-600">
          {t("catalog:saveBikesHereToCompareThemLater")}
        </p>
        <Link
          to="/"
          className="mt-6 rounded-full bg-gray-800 px-5 py-3 text-white transition-colors hover:bg-brand-red"
        >
          {t("catalog:discoverBikes")}
        </Link>
      </section>
    );
  }

  return (
    <section className="shop-container catalog-page">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-red">
            {t("catalog:savedList")}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            {t("catalog:favorites.title")}
          </h1>
          <p className="mt-2 text-gray-600">
            {t("catalog:favorites.count", { count: favorites.length })}
          </p>
        </div>
        <button
          type="button"
          onClick={clearFavorites}
          className="rounded-full border border-gray-300 px-4 py-2 text-sm text-gray-700 transition-colors hover:border-red-300 hover:text-red-600"
        >
          {t("catalog:clearFavorites")}
        </button>
      </div>

      <div className="catalog-grid">
        {favorites.map((bike) => (
            <ProductCard key={bike.id} bike={bike} removable />
        ))}
      </div>
    </section>
  );
};
