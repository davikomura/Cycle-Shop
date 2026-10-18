import { useI18n } from "../i18n/I18n";
import { Link, useSearch } from "@tanstack/react-router";
import { useCart } from "../context/useCart";

export const CheckoutSuccess = () => {
  const { t, formatPrice } = useI18n(["common", "checkout"]);
  const orderId = useSearch({
    from: "/checkout/success",
    select: (search) => search.order,
  });
  const { lastOrder } = useCart();

  return (
    <section className="mx-auto flex min-h-[60vh] max-w-4xl flex-col justify-center px-4 py-16">
      <div className="soft-panel rounded-[32px] p-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#d46847]">
          {t("checkout:orderConfirmed")}
        </p>
        <h1 className="mt-2 text-4xl font-bold text-gray-900">
          {t("checkout:thanksYourOrderIsOnTheWay")}
        </h1>
        <p className="mt-4 text-gray-600">
          {t("checkout:reference")}
          <span className="font-semibold text-gray-900">{orderId}</span>
        </p>
        {lastOrder && (
          <p className="mt-3 text-gray-600">
            {t("checkout:totalCharged")}
            <span className="font-semibold text-gray-900">
              {formatPrice(lastOrder.totalPrice)}
            </span>
          </p>
        )}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="rounded-full bg-gray-800 px-5 py-3 text-white transition-colors hover:bg-[#FF6347]"
          >
            {t("common:backToHomepage")}
          </Link>
          <Link
            to="/favorites"
            className="rounded-full border border-gray-300 px-5 py-3 text-gray-700 transition-colors hover:border-[#d46847] hover:text-[#d46847]"
          >
            {t("checkout:viewFavorites")}
          </Link>
        </div>
      </div>
    </section>
  );
};
