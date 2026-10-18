import { Preferences } from "../Common/Preferences";
import { useI18n } from "../../i18n/I18n";
import type { FormEvent } from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import logo from "../../assets/dk-cycle-horizontal.png";
import { useAuth } from "../../context/useAuth";

export const Login = () => {
  const { t } = useI18n(["common", "auth"]);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "").trim();

    if (!email || !password) {
      setError("auth:pleaseFillInBothEmailAndPassword");
      return;
    }

    login({ email });

    const redirectTo =
      new URLSearchParams(location.searchStr).get("redirect") === "/checkout"
        ? "/checkout"
        : "/";
    void navigate({ to: redirectTo, replace: true });
  };

  return (
    <main className="login-page">
      <header className="login-header">
        <Link to="/" className="login-back"><span aria-hidden="true">&larr;</span>{t("common:backToHomepage")}</Link>
        <Preferences />
      </header>
      <div className="login-content">
        <div className="login-form-wrap">
          <Link to="/" className="login-logo" aria-label={t("common:goToHomepage")}>
            <img src={logo} alt="DK Cycle" />
          </Link>
          <h1>{t("auth:signInToYourAccount")}</h1>
          <p className="login-intro">{t("auth:loginIntro")}</p>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-field">
              <label htmlFor="email">{t("auth:yourEmail")}</label>
              <input type="email" name="email" id="email" autoComplete="email" placeholder={t("auth:enterEmail")} required />
            </div>
            <div className="login-field">
              <label htmlFor="password">{t("auth:password")}</label>
              <div className="login-password">
                <input type={showPassword ? "text" : "password"} name="password" id="password" autoComplete="current-password" placeholder={t("auth:enterPassword")} required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={t(showPassword ? "auth:hidePassword" : "auth:showPassword")} aria-pressed={showPassword}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" />{showPassword && <path d="m3 3 18 18" />}</svg>
                </button>
              </div>
            </div>
            {error && <p className="login-error" role="alert">{t(error)}</p>}
            <button type="submit" className="login-submit">{t("common:signIn")}<span aria-hidden="true">&rarr;</span></button>
          </form>
          <div className="login-register">
            <p>{t("auth:donTHaveAnAccountYet")}</p>
            <Link to="/Signup">{t("auth:createAccount")}</Link>
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
