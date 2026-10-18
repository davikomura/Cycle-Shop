import { ProductCard } from "./ProductCard";
import { categoryNameKey } from "../../i18n/catalogKeys";
import { useI18n } from "../../i18n/I18n";
import { useCatalog } from "../../lib/useCatalog";
import { useEffect, useMemo, useState } from "react";

const SORT_OPTIONS = [
  "catalog:bestSellers",
  "catalog:topRated",
  "catalog:priceLowToHigh",
  "catalog:priceHighToLow",
];

const BikeList = ({ tipo }: { tipo: string }) => {
  const { t, formatPrice } = useI18n(["common", "catalog", "products"]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("catalog:bestSellers");
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");

  const { data: catalog } = useCatalog();
  const bikes = useMemo(
    () => catalog.filter((bike) => bike.tipo === tipo),
    [catalog, tipo],
  );

  useEffect(() => {
    setSelectedSort("catalog:bestSellers");
    setSearchTerm("");
    setPriceFilter("all");
    setRatingFilter("all");
  }, [tipo]);

  const filteredBikes = (() => {
    return bikes.filter((bike) => {
      const matchesSearch =
        bike.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t(`products:items.${bike.id}.description`)
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesPrice =
        priceFilter === "all" ||
        (priceFilter === "under-500" && bike.preco < 500) ||
        (priceFilter === "500-1000" &&
          bike.preco >= 500 &&
          bike.preco <= 1000) ||
        (priceFilter === "over-1000" && bike.preco > 1000);

      const matchesRating =
        ratingFilter === "all" ||
        (ratingFilter === "4-up" && (bike.avaliacao ?? 0) >= 4) ||
        (ratingFilter === "new" && bike.avaliacao === null);

      return matchesSearch && matchesPrice && matchesRating;
    });
  })();

  const sortedBikes = useMemo(() => {
    const currentBikes = [...filteredBikes];

    switch (selectedSort) {
      case "catalog:topRated":
        return currentBikes.sort(
          (a, b) => (b.avaliacao ?? 0) - (a.avaliacao ?? 0),
        );
      case "catalog:priceLowToHigh":
        return currentBikes.sort((a, b) => a.preco - b.preco);
      case "catalog:priceHighToLow":
        return currentBikes.sort((a, b) => b.preco - a.preco);
      case "catalog:bestSellers":
      default:
        return currentBikes.sort((a, b) => b.totalVendas - a.totalVendas);
    }
  }, [filteredBikes, selectedSort]);

  return (
    <div className="shop-container catalog-page">
      <div className="mb-8 flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-red">
              {t("catalog:curatedCatalog")}
            </p>
            <h1 className="mt-2 text-3xl font-semibold">
              {t(categoryNameKey(tipo))}
            </h1>
            <p className="mt-2 text-gray-600">
              {t("catalog:models.count", { count: sortedBikes.length })}
            </p>
          </div>

          <div className="relative inline-block text-left">
            <button
              type="button"
              onClick={() => setIsOpen((currentValue) => !currentValue)}
              className="inline-flex items-center rounded-full bg-gray-800 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-red"
            >
              {t("catalog:sort")} {t(selectedSort)}
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
              <div className="absolute right-0 z-10 mt-2 w-52 rounded-2xl border border-white/70 bg-white/90 shadow-xl backdrop-blur-md">
                <ul className="py-2 text-sm text-gray-700">
                  {SORT_OPTIONS.map((option) => (
                    <li key={t(option)}>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedSort(option);
                          setIsOpen(false);
                        }}
                        className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                      >
                        {t(option)}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="soft-panel grid gap-3 rounded-[28px] p-4 md:grid-cols-[1.5fr_1fr_1fr]">
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder={t("catalog:searchWithinCategory", {
              category: t(categoryNameKey(tipo)).toLowerCase(),
            })}
            className="rounded-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-hidden focus:border-brand-red"
          />
          <select
            value={priceFilter}
            onChange={(event) => setPriceFilter(event.target.value)}
            className="rounded-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-hidden focus:border-brand-red"
          >
            <option value="all">{t("catalog:allPrices")}</option>
            <option value="under-500">
              {t("catalog:underPrice", { price: formatPrice(500) })}
            </option>
            <option value="500-1000">
              {t("catalog:minToMax", {
                min: formatPrice(500),
                max: formatPrice(1000),
              })}
            </option>
            <option value="over-1000">
              {t("catalog:overPrice", { price: formatPrice(1000) })}
            </option>
          </select>
          <select
            value={ratingFilter}
            onChange={(event) => setRatingFilter(event.target.value)}
            className="rounded-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-hidden focus:border-brand-red"
          >
            <option value="all">{t("catalog:allRatings")}</option>
            <option value="4-up">{t("catalog:4StarsAndUp")}</option>
            <option value="new">{t("catalog:newArrivals")}</option>
          </select>
        </div>
      </div>

      {sortedBikes.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-10 text-center">
          <h2 className="text-xl font-semibold text-gray-800">
            {t("catalog:thisCategoryIsBeingPrepared")}
          </h2>
          <p className="mt-3 text-gray-600">
            {t("catalog:weAreCuratingProductsForThisSection")}
          </p>
        </div>
      ) : (
        <div className="catalog-grid">
          {sortedBikes.map((bike) => (
            <ProductCard key={bike.id} bike={bike} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BikeList;
