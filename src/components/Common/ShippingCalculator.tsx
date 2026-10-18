import { useState, type FormEvent } from "react";
import { useI18n } from "../../i18n/I18n";
import { estimateShipping, type ShippingEstimate } from "../../lib/shipping";

export function ShippingCalculator() {
  const { t, formatPrice } = useI18n(["catalog"]);
  const [postalCode, setPostalCode] = useState("");
  const [estimate, setEstimate] = useState<ShippingEstimate | null>(null);
  const [invalid, setInvalid] = useState(false);

  function calculate(event: FormEvent) {
    event.preventDefault();
    const result = estimateShipping(postalCode);
    setInvalid(!result);
    setEstimate(result);
  }

  return (
    <section className="product-shipping" aria-labelledby="shipping-heading">
      <h2 id="shipping-heading">
        <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M3 5h11v12H3zM14 9h4l3 4v4h-7" /><circle cx="7" cy="18" r="2" fill="white" /><circle cx="18" cy="18" r="2" fill="white" /></svg>
        {t("catalog:shipping.title")}
      </h2>
      <form onSubmit={calculate} noValidate>
        <label htmlFor="shipping-postal-code">{t("catalog:shipping.postalCode")}</label>
        <div className="shipping-input-row">
          <input id="shipping-postal-code" name="postalCode" inputMode="numeric" autoComplete="postal-code" placeholder="00000-000" maxLength={9}
            value={postalCode} aria-invalid={invalid} aria-describedby={invalid ? "shipping-error shipping-note" : "shipping-note"}
            onChange={(event) => {
              const digits = event.target.value.replace(/\D/g, "").slice(0, 8);
              setPostalCode(digits.replace(/^(\d{5})(\d)/, "$1-$2"));
              setEstimate(null);
              setInvalid(false);
            }} />
          <button type="submit">{t("catalog:shipping.calculate")}</button>
        </div>
        {invalid && <p id="shipping-error" className="shipping-error" role="alert">{t("catalog:shipping.invalid")}</p>}
      </form>
      <p id="shipping-note" className="shipping-note">{t("catalog:shipping.demo")}</p>
      <div aria-live="polite" aria-atomic="true">
        {estimate && <div className="shipping-result">
          <div><strong>{t("catalog:shipping.standard")}</strong><p>{t("catalog:shipping.days", { min: estimate.minDays, max: estimate.maxDays })}</p></div>
          <strong>{formatPrice(estimate.price)}</strong>
        </div>}
      </div>
    </section>
  );
}
