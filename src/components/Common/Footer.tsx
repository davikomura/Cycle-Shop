import { useI18n } from "../../i18n/I18n";
import type { LinkProps } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import logo from "../../assets/logo_dk_cycle_shop.png";

type FooterLink = { label: string; to: LinkProps["to"] };

const serviceLinks: FooterLink[] = [
  { label: "common:shippingInformation", to: "/FAQ" },
  { label: "common:withdrawalForm", to: "/Terms-and-Conditions" },
  { label: "common:warrantyClaim", to: "/FAQ" },
];

const helpLinks: FooterLink[] = [
  { label: "common:support", to: "/FAQ" },
  { label: "common:faq", to: "/FAQ" },
  { label: "common:bikeAssemblyVideos", to: "/About" },
];

const companyLinks: FooterLink[] = [
  { label: "common:about", to: "/About" },
  { label: "common:privacyPolicy", to: "/PrivacyPolicy" },
  { label: "common:termsConditions", to: "/Terms-and-Conditions" },
];

const Footer = () => {
  const { t } = useI18n(["common"]);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderLinkGroup = (title: string, links: FooterLink[]) => (
    <div>
      <h2 className="mb-4 text-lg font-bold text-white">{t(title)}</h2>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              to={link.to}
              onClick={scrollToTop}
              className="text-base text-gray-400 transition-all hover:text-white"
            >
              {t(link.label)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer className="bg-gray-dark px-8 py-12 font-[sans-serif] lg:px-16">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {renderLinkGroup("common:service", serviceLinks)}
        {renderLinkGroup("common:helpTips", helpLinks)}
        {renderLinkGroup("common:company", companyLinks)}

        <div className="flex items-center lg:justify-center">
          <Link to="/" onClick={scrollToTop}>
            <img src={logo} alt="DK Cycle Shop" className="w-60" />
          </Link>
        </div>
      </div>

      <hr className="my-8 border-gray-700" />

      <div className="sm:flex sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-gray-400 sm:order-1">
          © 2026{" "}
          <a
            href="https://github.com/davikomura"
            target="_blank"
            rel="noreferrer"
            className="mx-1 hover:underline"
          >
            DK Cycle Shop
          </a>
          {t("common:allRightsReserved")}
        </p>

        <div className="flex space-x-5 max-sm:mt-4">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noreferrer"
            className="text-gray-400 transition-all hover:text-white"
            aria-label={t("common:facebook")}
          >
            <svg
              className="h-5 w-5 fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.772-1.63 1.558V12h2.77l-.443 2.89h-2.327V22C18.343 21.128 22 16.991 22 12"
              />
            </svg>
          </a>
          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noreferrer"
            className="text-gray-400 transition-all hover:text-white"
            aria-label={t("common:youtube")}
          >
            <svg
              className="h-5 w-5 fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 2C6.486 2 2 6.486 2 12c0 5.513 4.486 10 10 10s10-4.487 10-10c0-5.514-4.486-10-10-10zm0 1.542c4.951 0 8.458 3.392 8.458 8.458 0 4.949-3.391 8.458-8.458 8.458-4.948 0-8.458-3.391-8.458-8.458 0-4.949 3.392-8.458 8.458-8.458zM9.743 16.747V7.128l6.027 4.31-6.027 4.309z" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="text-gray-400 transition-all hover:text-white"
            aria-label={t("common:linkedin")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-5 w-5 fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M21 5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5zm-2.5 8.2v5.3h-2.79v-4.93a1.4 1.4 0 0 0-1.4-1.4c-.77 0-1.39.63-1.39 1.4v4.93h-2.79v-8.37h2.79v1.11c.48-.78 1.47-1.3 2.32-1.3 1.8 0 3.26 1.46 3.26 3.26zM6.88 8.56a1.686 1.686 0 0 0 0-3.37 1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68zm1.39 1.57v8.37H5.5v-8.37h2.77z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
