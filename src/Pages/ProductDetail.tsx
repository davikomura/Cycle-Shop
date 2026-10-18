import { getCategoryRoute, getProductSlug } from "../lib/catalog";
import { categoryNameKey } from "../i18n/catalogKeys";
import { useI18n } from "../i18n/I18n";
import { useCatalog } from "../lib/useCatalog";
import { Link, useParams } from "@tanstack/react-router";
import { useCart } from "../context/useCart";
import { useFavorites } from "../context/useFavorites";
import { ShippingCalculator } from "../components/Common/ShippingCalculator";

export const ProductDetail = () => {
  const { t, formatPrice, locale } = useI18n(["common", "catalog", "products"]);
  const { productSlug = "" } = useParams({ from: "/product/$productSlug" });
  const { data: catalog } = useCatalog();
  const bike = catalog.find((product) => getProductSlug(product.nome) === productSlug);
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

  const saved = isFavorite(bike.id);
  const categoryRoute = getCategoryRoute(bike.tipo);

  return (
    <section className="product-page">
      <div className="shop-container">
        <nav className="product-breadcrumb" aria-label={t("catalog:product")}>
          <Link to="/">DK Cycle</Link><span aria-hidden="true">/</span>
          <Link to={categoryRoute}>{t(categoryNameKey(bike.tipo))}</Link>
          <span aria-hidden="true">/</span><span aria-current="page">{bike.nome}</span>
        </nav>
        <div className="product-layout">
          <div className="product-media">
            <img src={bike.imagem} alt={bike.nome} fetchPriority="high" />
          </div>
          <div className="product-summary">
            <Link className="product-category" to={categoryRoute}>{t(categoryNameKey(bike.tipo))}</Link>
            <h1>{bike.nome}</h1>
            <div className="product-rating">
              {bike.avaliacao ? <div className="product-review-summary" aria-label={t("catalog:rating5AverageRating", { rating: bike.avaliacao })}>
                <strong>{new Intl.NumberFormat(locale, { minimumFractionDigits: 1 }).format(bike.avaliacao)}</strong>
                <span className="product-stars" aria-hidden="true">
                  <span>&#9733;&#9733;&#9733;&#9733;&#9733;</span>
                  <span className="product-stars-fill" style={{ width: `${bike.avaliacao / 5 * 100}%` }}>&#9733;&#9733;&#9733;&#9733;&#9733;</span>
                </span>
                <span className="product-review-count">{t("catalog:reviews.count", { count: bike.totalAvaliacoes })}</span>
              </div> : <span>{t("common:newArrival")}</span>}
              <span className="product-sales">{t("catalog:sales.count", { count: bike.totalVendas })}</span>
            </div>
            <p className="product-description">{t(`products:items.${bike.id}.description`)}</p>
            <div className="product-pricing">
              <strong>{formatPrice(bike.preco)}</strong>
              <span>{t("catalog:vatIncluded")}</span>
            </div>
            <button type="button" onClick={() => addItem(bike)} className="product-buy">
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M3 3h2l3 13h11l3-10H6" /><circle cx="9" cy="21" r="1" /><circle cx="19" cy="21" r="1" /></svg>
              {t("common:actions.addToCart")}
            </button>
            <button type="button" onClick={() => toggleFavorite(bike.id)} aria-pressed={saved} className="product-favorite">
              <svg width="19" height="19" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" /></svg>
              {t(saved ? "common:savedToFavorites" : "common:saveToFavorites")}
            </button>
            <ShippingCalculator key={bike.id} />
            <dl className="product-services">
              <div><dt>{t("catalog:warranty")}</dt><dd>{t("catalog:2YearsOnFrame")}</dd></div>
              <div><dt>{t("common:support")}</dt><dd>{t("catalog:setupGuidanceIncluded")}</dd></div>
            </dl>
            <Link to={categoryRoute} className="product-related">{t("catalog:moreLikeThis")} <span aria-hidden="true">&rarr;</span></Link>
          </div>
        </div>
      </div>
    </section>
  );
};
