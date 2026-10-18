import { Preferences } from "../Common/Preferences";
import { useI18n } from "../../i18n/I18n";
import type { FormEvent } from "react";
import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import logo from "../../assets/dk-cycle-horizontal.png";
import { useAuth } from "../../context/useAuth";
import { inspectPassword } from "../../lib/password";

export const Signup = () => {
  const { t } = useI18n(["common", "auth"]);
  const [showPassword, setShowPassword] = useState(false);
  const [provider, setProvider] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const passwordInfo = inspectPassword(password);
  const mismatch = confirmation.length > 0 && confirmation !== password;
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();

    if (!name || !email || !password) {
      setError("auth:pleaseCompleteEveryFieldToCreateYour");
      return;
    }

    if (!passwordInfo.valid) {
      setError("auth:passwordRulesError");
      document.getElementById("password")?.focus();
      return;
    }
    if (confirmation !== password) {
      setError("auth:passwordMismatch");
      document.getElementById("confirm-password")?.focus();
      return;
    }

    signup({ name, email });

    void navigate({ to: "/", replace: true });
  };

  return (
    <main className="login-page signup-page">
      <header className="login-header">
        <Link to="/" className="login-back"><span aria-hidden="true">&larr;</span>{t("common:backToHomepage")}</Link>
        <Preferences />
      </header>
      <div className="login-content">
        <div className="login-form-wrap">
          <Link to="/" className="login-logo" aria-label={t("common:goToHomepage")}>
            <img src={logo} alt="DK Cycle" />
          </Link>
          <h1>{t("auth:createAccount")}</h1>
          <p className="login-intro">{t("auth:createAnAccountToSaveBikesTrack")}</p>
          <div className="signup-social">
            <button type="button" className="signup-google" onClick={() => setProvider("Google")}>
              <img src="/img/brands/google.png" alt="" width="20" height="20" />
              {t("auth:continueWithGoogle")}
            </button>
            <button type="button" className="signup-apple" onClick={() => setProvider("Apple")}>
              <img src="/img/brands/apple.svg" alt="" width="24" height="24" />
              {t("auth:continueWithApple")}
            </button>
          </div>
          {provider && <p className="signup-provider-note" role="status">{t("auth:providerUnavailable", { provider })}</p>}
          <div className="signup-divider"><span>{t("auth:orWithEmail")}</span></div>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-field">
              <label htmlFor="name">{t("auth:name")}</label>
              <input id="name" name="name" type="text" autoComplete="name" required placeholder={t("auth:enterName")} />
            </div>
            <div className="login-field">
              <label htmlFor="email">{t("common:email")}</label>
              <input id="email" name="email" type="email" autoComplete="email" required placeholder={t("auth:enterEmail")} />
            </div>
            <div className="login-field">
              <label htmlFor="password">{t("auth:password")}</label>
              <div className="login-password">
                <input id="password" name="password" type={showPassword ? "text" : "password"} autoComplete="new-password" required placeholder={t("auth:enterPassword")}
                  value={password} onChange={(event) => { setPassword(event.target.value); setError(""); }} aria-describedby="password-strength password-rules" aria-invalid={password.length > 0 && !passwordInfo.valid} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={t(showPassword ? "auth:hidePassword" : "auth:showPassword")} aria-pressed={showPassword}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" />{showPassword && <path d="m3 3 18 18" />}</svg>
                </button>
              </div>
              <div className="password-feedback">
                <p id="password-strength" aria-live="polite">{t("auth:passwordStrength")} <strong>{t(["auth:strengthEmpty", "auth:strengthWeak", "auth:strengthMedium", "auth:strengthStrong"][passwordInfo.strength])}</strong></p>
                <div className="password-meter" data-strength={passwordInfo.strength} aria-hidden="true">
                  {[1, 2, 3].map((level) => <span key={level} className={passwordInfo.strength >= level ? "is-filled" : ""} />)}
                </div>
                <ul id="password-rules">
                  {([
                    [passwordInfo.requirements.length, "auth:passwordMinLength"],
                    [passwordInfo.requirements.number, "auth:passwordNumber"],
                    [passwordInfo.requirements.special, "auth:passwordSpecial"],
                  ] as const).map(([met, key]) => <li key={key} className={met ? "is-met" : ""}><span aria-hidden="true">{met ? "\u2713" : "\u2022"}</span>{t(key)}</li>)}
                </ul>
              </div>
            </div>
            <div className="login-field">
              <label htmlFor="confirm-password">{t("auth:confirmPassword")}</label>
              <div className="login-password">
                <input id="confirm-password" name="confirmPassword" type={showConfirmation ? "text" : "password"} autoComplete="new-password" required placeholder={t("auth:repeatPassword")}
                  value={confirmation} onChange={(event) => { setConfirmation(event.target.value); setError(""); }} aria-invalid={mismatch} aria-describedby="password-match" />
                <button type="button" onClick={() => setShowConfirmation(!showConfirmation)} aria-label={t(showConfirmation ? "auth:hidePassword" : "auth:showPassword")} aria-pressed={showConfirmation}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" />{showConfirmation && <path d="m3 3 18 18" />}</svg>
                </button>
              </div>
              <p id="password-match" className={`password-match ${mismatch ? "is-mismatch" : ""}`} aria-live="polite">{confirmation && t(mismatch ? "auth:passwordMismatch" : "auth:passwordMatch")}</p>
            </div>
            <label className="signup-terms">
              <input id="accept-terms" name="accept-terms" type="checkbox" required />
              <span>{t("auth:iAcceptThe")} <Link to="/Terms-and-Conditions">{t("common:termsAndConditions")}</Link></span>
            </label>
            {error && <p className="login-error" role="alert">{t(error)}</p>}
            <button type="submit" className="login-submit">{t("auth:createAccount")}<span aria-hidden="true">&rarr;</span></button>
          </form>
          <div className="login-register">
            <p>{t("auth:alreadyHaveAnAccount")}</p>
            <Link to="/Login">{t("auth:loginHere")}</Link>
          </div>
        </div>
      </div>
      <footer className="login-footer">
        <span>DK Cycle</span>
        <Link to="/PrivacyPolicy">{t("common:privacyPolicy")}</Link>
        <Link to="/FAQ">{t("common:helpTips")}</Link>
      </footer>
    </main>
  );
};
