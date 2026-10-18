import logo from "../../assets/dk-cycle-horizontal.png";
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "../../context/useAuth";
import { useCart } from "../../context/useCart";
import { useFavorites } from "../../context/useFavorites";
import { useI18n } from "../../i18n/I18n";
import { Preferences } from "./Preferences";
const navigation = [
  { to: "/Mountain-Bike", label: "catalog:categories.mountain.name" },
  { to: "/Road-Bike", label: "catalog:categories.road.name" },
  { to: "/E-Bike", label: "catalog:categories.electric.name" },
  { to: "/Trekking", label: "catalog:categories.trekking.name" },
  { to: "/Kids", label: "catalog:categories.kids.name" },
] as const;
export default function Header() {
  const { t } = useI18n(["common", "catalog"]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { itemCount } = useCart();
  const { favoritesCount } = useFavorites();
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  function submit(event: FormEvent) {
    event.preventDefault();
    setMenuOpen(false);
    void navigate({ to: "/search", search: { q: search.trim() } });
  }
  return (
    <header className="shop-header">
      <div className="utility-bar">
        <span>{t("common:yourNextAdventureStartsHere")}</span>
        <Preferences />
      </div>
      <div className="header-main shop-container">
        <Link to="/" className="wordmark" aria-label={t("common:goToHomepage")}>
          <img src={logo} alt="DK Cycle" className="brand-logo" width={2146} height={733} />
        </Link>
        <form className="shop-search" onSubmit={submit}>
          <input
            aria-label={t("common:search.placeholder")}
            placeholder={t("common:search.placeholder")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button aria-label={t("common:search.submit")} type="submit">
            <svg
              aria-hidden="true"
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <circle cx="10.5" cy="10.5" r="6.5" />
              <path d="m16 16 5 5" />
            </svg>
          </button>
        </form>
        <div className="header-actions">
          <Link to="/favorites" aria-label={t("common:goToFavorites")}>
            <span aria-hidden="true">♡</span>
            <b>{favoritesCount}</b>
          </Link>
          <Link to="/Cart" aria-label={t("common:goToCart")}>
            <span aria-hidden="true">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <path d="M2 3h3l3 12h11l3-9H6M8 15l-1 3h13" />
                <circle cx="9" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
              </svg>
            </span>
            <span>{t("common:cart")}</span>
            <b>{itemCount}</b>
          </Link>
          {isAuthenticated ? (
            <button onClick={logout}>{t("common:signOut")}</button>
          ) : (
            <Link className="account-link" to="/Login">
              {t("common:signIn")}
            </Link>
          )}
          <button
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="shop-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {t(menuOpen ? "common:close" : "common:menu")}
          </button>
        </div>
      </div>
      <nav
        id="shop-navigation"
        className={`shop-nav ${menuOpen ? "is-open" : ""}`}
        aria-label={t("common:shopNavigation")}
      >
        <div className="shop-container">
          <Link
            to="/search"
            search={{ q: "" }}
            onClick={() => setMenuOpen(false)}
          >
            {t("common:allBikes")}
          </Link>
          {navigation.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setMenuOpen(false)}
              activeProps={{ className: "active" }}
            >
              {t(item.label)}
            </Link>
          ))}
          <Link to="/About" onClick={() => setMenuOpen(false)}>
            {t("common:ourStory")}
          </Link>
          <span className="nav-note">{t("common:madeForTheRide")}</span>
        </div>
      </nav>
    </header>
  );
}
