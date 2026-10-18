import { ProductCard } from "../components/Common/ProductCard";
import { categoryNameKey } from "../i18n/catalogKeys";
import { useI18n } from "../i18n/I18n";
import { useCatalog } from "../lib/useCatalog";
import { Link, useSearch } from "@tanstack/react-router";

export const SearchResults = () => {
  const { t } = useI18n(["common", "catalog", "products"]);
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

  return (
    <section className="shop-container catalog-page">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-red">
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
            className="mt-6 inline-flex rounded-full bg-gray-800 px-5 py-3 text-white transition-colors hover:bg-brand-red"
          >
            {t("common:backToHomepage")}
          </Link>
        </div>
      ) : (
        <div className="catalog-grid">
          {results.map((bike) => (
            <ProductCard key={bike.id} bike={bike} />
          ))}
        </div>
      )}
    </section>
  );
};
