import { categoryNameKey } from "../../i18n/catalogKeys";
import { useI18n } from "../../i18n/I18n";
import { useCatalog } from "../../lib/useCatalog";
import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useCart } from "../../context/useCart";
import { useFavorites } from "../../context/useFavorites";

const SORT_OPTIONS = [
  "catalog:bestSellers",
  "catalog:topRated",
  "catalog:priceLowToHigh",
  "catalog:priceHighToLow",
];

const BikeList = ({ tipo }: { tipo: string }) => {
  const { t, formatPrice } = useI18n(["common", "catalog", "products"]);
  const { addItem } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
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
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#d46847]">
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
              className="inline-flex items-center rounded-full bg-gray-800 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#FF6347]"
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
            className="rounded-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-hidden focus:border-[#d46847]"
          />
          <select
            value={priceFilter}
            onChange={(event) => setPriceFilter(event.target.value)}
            className="rounded-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-hidden focus:border-[#d46847]"
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
            className="rounded-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-hidden focus:border-[#d46847]"
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
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sortedBikes.map((bike) => (
            <article
              key={bike.id}
              className="group relative w-full max-w-sm overflow-hidden rounded-[28px] border border-white/70 bg-white/80 shadow-[0_16px_40px_rgba(18,19,23,0.08)] backdrop-blur-xs transition-all hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(18,19,23,0.12)]"
            >
              <button
                type="button"
                onClick={() => toggleFavorite(bike.id)}
                className={`absolute right-5 top-5 z-10 rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition-colors ${
                  isFavorite(bike.id)
                    ? "bg-[#ffe2da] text-[#d64b24]"
                    : "bg-white/80 text-gray-600 hover:text-[#d64b24]"
                }`}
              >
                {t(isFavorite(bike.id) ? "catalog:saved" : "catalog:save")}
              </button>
              <img
                className="h-64 w-full rounded-t-lg bg-[linear-gradient(180deg,#fff8f1_0%,#ffffff_100%)] object-contain p-8 transition-transform duration-500 group-hover:scale-105"
                src={bike.imagem}
                alt={bike.nome}
              />
              <div className="px-5 pb-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#d46847]">
                  {t(categoryNameKey(bike.tipo))}
                </p>
                <Link
                  to="/product/$productId"
                  params={{ productId: String(bike.id) }}
                >
                  <h2 className="text-xl font-semibold tracking-tight text-gray-900">
                    {bike.nome}
                  </h2>
                </Link>
                <p className="mt-2 min-h-[72px] text-sm leading-6 text-gray-600">
                  {t(`products:items.${bike.id}.description`)}
                </p>

                <div className="mb-5 mt-4 flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-[#edf4ff] px-2.5 py-0.5 text-xs font-semibold text-[#3560a3]">
                    {bike.avaliacao ? `${bike.avaliacao}/5` : t("catalog:new")}
                  </span>
                  <span className="rounded-full bg-[#f8ede2] px-2.5 py-0.5 text-xs font-semibold text-[#d46847]">
                    {t("catalog:sales.count", { count: bike.totalVendas })}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-3xl font-bold text-gray-900">
                    {formatPrice(bike.preco)}
                  </span>
                  <div className="flex gap-2">
                    <Link
                      to="/product/$productId"
                      params={{ productId: String(bike.id) }}
                      className="rounded-full border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:border-[#d46847] hover:text-[#d46847]"
                    >
                      {t("common:details")}
                    </Link>
                    <button
                      type="button"
                      onClick={() => addItem(bike)}
                      className="rounded-full bg-gray-800 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#FF6347]"
                    >
                      {t("catalog:add")}
                    </button>
                  </div>
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
