import { getProductSlug } from "../lib/catalog";
import { ProductCard } from "../components/Common/ProductCard";
import { Link } from "@tanstack/react-router";
import { useCatalog } from "../lib/useCatalog";
import { useI18n } from "../i18n/I18n";
const categories = [
  {
    name: "catalog:categories.mountain.name",
    detail: "home:categories.mountain",
    image: "mountain_bike.png",
    to: "/Mountain-Bike",
  },
  {
    name: "catalog:categories.road.name",
    detail: "home:categories.road",
    image: "road_bike.png",
    to: "/Road-Bike",
  },
  {
    name: "catalog:categories.electric.name",
    detail: "home:categories.electric",
    image: "e-bike.png",
    to: "/E-Bike",
  },
  {
    name: "catalog:categories.trekking.name",
    detail: "home:categories.trekking",
    image: "Trekking.png",
    to: "/Trekking",
  },
  {
    name: "catalog:categories.kids.name",
    detail: "home:categories.kids",
    image: "kids_bike.png",
    to: "/Kids",
  },
] as const;
export const MainPage = () => {
  const { t, formatPrice } = useI18n(["common", "catalog", "home"]);
  const { data: catalog } = useCatalog();
  const [heroBike] = catalog.filter((b) => b.tipo === "Mountain Bike");
  return (
    <main className="storefront">
      <section className="ride-hero">
        <div className="shop-container hero-layout">
          <div className="hero-copy">
            <p className="eyebrow">
              <span />
              {t("home:hero.eyebrow")}
            </p>
            <h1>
              {t("home:hero.title")}
              <br />
              <em>{t("home:hero.highlight")}</em>
            </h1>
            <p className="hero-description">
              {t("home:hero.description")}
            </p>
            <div className="hero-buttons">
              <Link className="button-brand" to="/search" search={{ q: "" }}>
                {t("home:hero.primaryAction")} <span>↗</span>
              </Link>
              <Link className="hero-secondary" to="/Mountain-Bike">
                {t("home:hero.secondaryAction")} →
              </Link>
            </div>
            <p className="hero-footnote">{t("home:hero.footnote")}</p>
          </div>
          <div className="hero-product">
            <span className="hero-outline" aria-hidden="true">
              RIDE
            </span>
            <div className="hero-orbit" />
            {heroBike && (
              <>
                <Link
                  to="/product/$productSlug"
                  params={{ productSlug: getProductSlug(heroBike.nome) }}
                  className="hero-bike-link"
                >
                  <img
                    src={heroBike.imagem}
                    alt={heroBike.nome}
                    fetchPriority="high"
                  />
                </Link>
                <Link
                  className="hero-product-tag"
                  to="/product/$productSlug"
                  params={{ productSlug: getProductSlug(heroBike.nome) }}
                >
                  <span>
                    <small>{t("home:hero.productBadge")}</small>
                    <strong>{heroBike.nome}</strong>
                  </span>
                  <span>{formatPrice(heroBike.preco)} ↗</span>
                </Link>
              </>
            )}
            <span className="hero-coordinate">DK / EVERYDAY EXPLORERS</span>
          </div>
        </div>
      </section>
      <div className="benefit-strip shop-container">
        {[
          [
            "↗",
            "home:benefits.selection.title",
            "home:benefits.selection.description",
          ],
          [
            "◇",
            "home:benefits.favorites.title",
            "home:benefits.favorites.description",
          ],
          [
            "◎",
            "home:benefits.languages.title",
            "home:benefits.languages.description",
          ],
        ].map(([icon, title, body]) => (
          <div key={title}>
            <span aria-hidden="true">{icon}</span>
            <p>
              <strong>{t(title)}</strong>
              <small>{t(body)}</small>
            </p>
          </div>
        ))}
      </div>
      <section className="shop-container category-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{t("home:categories.eyebrow")}</p>
            <h2>{t("home:categories.title")}</h2>
          </div>
          <Link to="/search" search={{ q: "" }}>
            {t("home:categories.viewAll")} ↗
          </Link>
        </div>
        <div className="category-grid">
          {categories.map((cat, index) => (
            <Link key={cat.to} to={cat.to} className="category-tile">
              <img
                src={"/img/Categorias/" + cat.image}
                alt={t(cat.name)}
                loading="lazy"
              />
              <div>
                <small>
                  0{index + 1} / {t(cat.detail)}
                </small>
                <h3>
                  {t(cat.name)} <span>↗</span>
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="featured-section">
        <div className="shop-container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">{t("home:featured.eyebrow")}</p>
              <h2>{t("home:featured.title")}</h2>
            </div>
            <Link to="/search" search={{ q: "" }}>
              {t("home:featured.action")} ↗
            </Link>
          </div>
          <div className="catalog-grid">
            {catalog.slice(0, 4).map((bike) => (
              <ProductCard key={bike.id} bike={bike} showDescription={false} />
            ))}
          </div>
        </div>
      </section>
      <section className="shop-container">
        <div className="adventure-banner">
          <div>
            <p className="eyebrow">{t("home:banner.eyebrow")}</p>
            <h2>
              {t("home:banner.title")}
              <br />
              {t("home:banner.highlight")}
            </h2>
            <Link className="button-brand" to="/Trekking">
              {t("home:banner.action")} ↗
            </Link>
          </div>
          <img
            src="/img/Categorias/Trekking.png"
            alt={t("catalog:categories.trekking.name")}
            loading="lazy"
          />
        </div>
      </section>
    </main>
  );
};
