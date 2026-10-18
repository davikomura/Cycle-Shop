import { getProductSlug } from "../../lib/catalog";
import { Link } from "@tanstack/react-router";
import { useCart } from "../../context/useCart";
import { useFavorites } from "../../context/useFavorites";
import { useI18n } from "../../i18n/I18n";
import { categoryNameKey } from "../../i18n/catalogKeys";
import type { Product } from "../../types";

export function ProductCard({ bike, removable = false, showDescription = true }: { bike: Product; removable?: boolean; showDescription?: boolean }) {
  const { t, formatPrice } = useI18n(showDescription ? ["common", "catalog", "products"] : ["common", "catalog"]);
  const { addItem } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const saved = isFavorite(bike.id);
  return (
    <article className="catalog-card">
      <div className="catalog-card-media">
        <Link to="/product/$productSlug" params={{ productSlug: getProductSlug(bike.nome) }}>
          <img src={bike.imagem} alt={bike.nome} loading="lazy" />
        </Link>
        <button type="button" className={`catalog-card-save ${saved ? "is-saved" : ""}`}
          aria-label={t(saved ? "common:savedToFavorites" : "common:saveToFavorites")}
          aria-pressed={saved} onClick={() => toggleFavorite(bike.id)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />
          </svg>
        </button>
      </div>
      <div className="catalog-card-body">
        <p className="catalog-card-category">{t(categoryNameKey(bike.tipo))}</p>
        <Link to="/product/$productSlug" params={{ productSlug: getProductSlug(bike.nome) }} className="catalog-card-title">
          <h2>{bike.nome}</h2>
        </Link>
        {showDescription && <p className="catalog-card-description">{t(`products:items.${bike.id}.description`)}</p>}
        <div className="catalog-card-meta">
          <span>{bike.avaliacao ? `${bike.avaliacao.toFixed(1)} / 5` : t("catalog:new")}</span>
          <span>{t("catalog:sales.count", { count: bike.totalVendas })}</span>
        </div>
        <div className="catalog-card-purchase">
          <strong className="catalog-card-price">{formatPrice(bike.preco)}</strong>
          <div className="catalog-card-links">
            <Link to="/product/$productSlug" params={{ productSlug: getProductSlug(bike.nome) }}>{t("common:details")}</Link>
            {removable && <button type="button" onClick={() => toggleFavorite(bike.id)}>{t("common:remove")}</button>}
          </div>
          <button type="button" className="catalog-card-add" onClick={() => addItem(bike)}>{t("common:actions.addToCart")}</button>
        </div>
      </div>
    </article>
  );
}
