import { useI18n } from "../i18n/I18n";
import type { FormEvent } from "react";
import { useState } from "react";
import { Navigate, useNavigate } from "@tanstack/react-router";
import { useAuth } from "../context/useAuth";
import { useCart } from "../context/useCart";

export const Checkout = () => {
  const { t, formatPrice } = useI18n(["common", "checkout"]);
  const { isAuthenticated, user } = useAuth();
  const { items, totalPrice, placeOrder } = useCart();
  const [error, setError] = useState("");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const navigate = useNavigate();

  if (!isAuthenticated || !user) {
    return <Navigate to="/Login" replace search={{ redirect: "/checkout" }} />;
  }

  if (items.length === 0 && !isPlacingOrder) {
    return <Navigate to="/Cart" replace />;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    const formData = new FormData(event.currentTarget);
    const fullName = String(formData.get("fullName") || "").trim();
    const address = String(formData.get("address") || "").trim();
    const city = String(formData.get("city") || "").trim();
    const cardNumber = String(formData.get("cardNumber") || "").trim();

    if (!fullName || !address || !city || !cardNumber) {
      setError("checkout:pleaseCompleteShippingAndPaymentDetailsBefore");
      return;
    }

    setIsPlacingOrder(true);
    const order = placeOrder({
      customer: fullName,
      email: user.email,
      address,
      city,
      cardLast4: cardNumber.slice(-4),
    });

    void navigate({
      to: "/checkout/success",
      search: { order: order.id },
      replace: true,
    });
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-red">
          {t("checkout:checkout")}
        </p>
        <h1 className="mt-2 text-3xl font-bold text-gray-900">
          {t("checkout:completeYourOrder")}
        </h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
        <form className="soft-panel rounded-[28px] p-6" onSubmit={handleSubmit}>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-800">
                {t("checkout:fullName")}
              </label>
              <input
                name="fullName"
                defaultValue={user?.name}
                className="w-full rounded-full border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 outline-hidden focus:border-brand-red"
              />
            </div>
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-800">
                {t("common:email")}
              </label>
              <input
                value={user.email}
                readOnly
                className="w-full rounded-full border border-gray-300 bg-gray-100 px-4 py-3 text-sm text-gray-600"
              />
            </div>
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-800">
                {t("checkout:address")}
              </label>
              <input
                name="address"
                className="w-full rounded-full border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 outline-hidden focus:border-brand-red"
                placeholder={t("checkout:streetAndNumber")}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-800">
                {t("checkout:city")}
              </label>
              <input
                name="city"
                className="w-full rounded-full border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 outline-hidden focus:border-brand-red"
                placeholder={t("checkout:yourCity")}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-800">
                {t("checkout:cardNumber")}
              </label>
              <input
                name="cardNumber"
                className="w-full rounded-full border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 outline-hidden focus:border-brand-red"
                placeholder="4242 4242 4242 4242"
              />
            </div>
          </div>

          {error && (
            <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              {t(error)}
            </p>
          )}

          <button
            type="submit"
            disabled={isPlacingOrder}
            className="mt-8 rounded-full bg-linear-to-r from-brand-red to-brand-red-dark px-6 py-3 font-medium text-white shadow-lg shadow-brand-red/20 transition-all hover:-translate-y-0.5 hover:shadow-brand-red/30"
          >
            {t("checkout:placeOrder")}
          </button>
        </form>

        <aside className="soft-panel h-fit rounded-[28px] p-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {t("checkout:orderSummary")}
          </h2>
          <div className="mt-6 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4"
              >
                <div>
                  <p className="font-medium text-gray-900">{item.nome}</p>
                  <p className="text-sm text-gray-500">
                    {t("checkout:qty")} {item.quantity}
                  </p>
                </div>
                <span className="font-semibold text-gray-900">
                  {formatPrice(item.preco * item.quantity)}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-4 text-base font-semibold text-gray-900">
            <span>{t("checkout:total")}</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
        </aside>
      </div>
    </section>
  );
};
