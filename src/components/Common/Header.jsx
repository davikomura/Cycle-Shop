import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo_dk_cycle_shop.png';
import { useAuth } from '../../context/useAuth.jsx';
import { useCart } from '../../context/useCart.jsx';
import { useFavorites } from '../../context/useFavorites.jsx';

const navigationItems = [
  { to: '/E-Bike', label: 'E-Bike' },
  { to: '/Mountain-Bike', label: 'Mountain Bike' },
  { to: '/Road-Bike', label: 'Road Bike' },
  { to: '/Trekking', label: 'Trekking' },
  { to: '/Kids', label: 'Kids' },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { itemCount } = useCart();
  const { favoritesCount } = useFavorites();
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <header className="sticky top-0 z-50 min-h-[80px] border-b border-white/10 bg-[#17191fcc]/90 px-6 py-4 font-[sans-serif] tracking-wide backdrop-blur-xl sm:px-10">
      <div className="flex w-full flex-wrap items-center gap-4 lg:gap-y-2">
        <Link to="/" aria-label="Go to homepage">
          <img src={logo} alt="DK Cycle Shop" className="w-10 lg:w-36" />
        </Link>

        <button
          type="button"
          className="ml-auto rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white lg:hidden"
          onClick={() => setMenuOpen(true)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          Menu
        </button>

        <div className={`${menuOpen ? 'block' : 'hidden'} lg:ml-12 lg:block lg:flex-1`}>
          <button
            type="button"
            className="fixed inset-0 bg-black/60 lg:hidden"
            onClick={closeMenu}
            aria-label="Close navigation overlay"
          />
          <div className="absolute left-0 top-0 z-10 h-screen w-[min(320px,82vw)] bg-[#17191f] p-6 shadow-md lg:static lg:h-auto lg:w-auto lg:bg-transparent lg:p-0 lg:shadow-none">
            <div className="mb-6 flex items-center justify-between lg:hidden">
              <img src={logo} alt="DK Cycle Shop" className="w-12" />
              <button
                type="button"
                className="rounded-full bg-white px-3 py-2 text-sm text-gray-dark"
                onClick={closeMenu}
              >
                Close
              </button>
            </div>

            <nav id="mobile-menu">
              <ul className="space-y-3 lg:flex lg:items-center lg:gap-x-3 lg:space-y-0">
                <li className="px-3 text-[15px] font-semibold uppercase tracking-[0.25em] text-[#ff9e83]">
                  Special Offers
                </li>
                {navigationItems.map((item) => (
                  <li
                    key={item.to}
                    className="border-b border-white/10 px-3 py-3 lg:border-b-0 lg:py-0"
                  >
                    <NavLink
                      to={item.to}
                      onClick={closeMenu}
                      className={({ isActive }) =>
                        `block text-[15px] font-semibold transition-colors ${
                          isActive ? 'text-[#FF6347]' : 'text-white hover:text-[#FF6347]'
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="ml-auto hidden items-center gap-6 lg:flex">
          <form
            onSubmit={handleSearchSubmit}
            className="flex max-w-64 items-center overflow-hidden rounded-full border-2 border-white/15 bg-white/5 px-6 py-3 focus-within:border-[#ff9e83]"
          >
            <input
              type="text"
              placeholder="Search bikes..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="w-full bg-transparent pr-2 text-sm text-white outline-none placeholder:text-gray-300"
            />
            <button type="submit" aria-label="Search bikes">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 192.904 192.904"
                width="16"
                className="fill-gray-300"
                aria-hidden="true"
              >
                <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z" />
              </svg>
            </button>
          </form>

          <div className="flex items-center space-x-6">
            <Link to="/favorites" className="relative" aria-label="Go to favorites">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                className="inline fill-white"
                viewBox="0 0 64 64"
                aria-hidden="true"
              >
                <path d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z" />
              </svg>
              <span className="absolute -right-2 -top-2 rounded-full bg-gradient-to-r from-[#e95f3c] to-[#ff8b61] px-1.5 text-xs text-white shadow-lg shadow-orange-500/30">
                {favoritesCount}
              </span>
            </Link>

            <Link to="/Cart" className="relative" aria-label="Go to cart">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                className="inline fill-white"
                viewBox="0 0 512 512"
                aria-hidden="true"
              >
                <path d="M164.96 300.004h.024c.02 0 .04-.004.059-.004H437a15.003 15.003 0 0 0 14.422-10.879l60-210a15.003 15.003 0 0 0-2.445-13.152A15.006 15.006 0 0 0 497 60H130.367l-10.722-48.254A15.003 15.003 0 0 0 105 0H15C6.715 0 0 6.715 0 15s6.715 15 15 15h77.969c1.898 8.55 51.312 230.918 54.156 243.71C131.184 280.64 120 296.536 120 315c0 24.812 20.188 45 45 45h272c8.285 0 15-6.715 15-15s-6.715-15-15-15H165c-8.27 0-15-6.73-15-15 0-8.258 6.707-14.977 14.96-14.996zM477.114 90l-51.43 180H177.032l-40-180zM150 405c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm167 15c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm0 0" />
              </svg>
              <span className="absolute -right-2 -top-2 rounded-full bg-gradient-to-r from-[#e95f3c] to-[#ff8b61] px-1.5 text-xs text-white shadow-lg shadow-orange-500/30">
                {itemCount}
              </span>
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-xs uppercase tracking-[0.18em] text-white/50">
                    Account
                  </p>
                  <p className="text-sm font-semibold text-white">{user.name}</p>
                </div>
                <button
                  type="button"
                  onClick={logout}
                  className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white transition-colors hover:bg-white/10"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                to="/Login"
                className="rounded-full border border-[#ff9d84]/30 bg-gradient-to-r from-[#e95f3c] to-[#ff8b61] px-5 py-2 text-sm text-white shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-0.5 hover:shadow-orange-500/30"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
