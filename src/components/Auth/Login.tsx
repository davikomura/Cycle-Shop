import { Preferences } from "../Common/Preferences";
import { useI18n } from "../../i18n/I18n";
import type { FormEvent } from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import logo from "../../assets/logo_dk_cycle_shop.png";
import { useAuth } from "../../context/useAuth";

export const Login = () => {
  const { t } = useI18n(["common", "auth"]);
  const [submitted, setSubmitted] = useState(false);
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
    setSubmitted(true);
    const redirectTo =
      new URLSearchParams(location.searchStr).get("redirect") === "/checkout"
        ? "/checkout"
        : "/";
    void navigate({ to: redirectTo, replace: true });
  };

  return (
    <section className="bg-gray-dark">
      <div className="text-white absolute right-4 top-4">
        <Preferences />
      </div>
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-4 py-8">
        <Link to="/" className="mb-6 flex items-center">
          <img className="h-auto w-28 sm:w-36" src={logo} alt="DK Cycle Shop" />
        </Link>
        <div className="w-full rounded-lg bg-white shadow-sm sm:max-w-md lg:max-w-lg xl:max-w-md">
          <div className="space-y-4 p-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              {t("auth:signInToYourAccount")}
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  {t("auth:yourEmail")}
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  {t("auth:password")}
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-3 text-sm text-gray-500">
                  <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 rounded border border-gray-300 bg-gray-50"
                  />
                  {t("auth:rememberMe")}
                </label>
                <button
                  type="button"
                  className="text-sm font-medium text-[#FF6347] hover:underline"
                >
                  {t("auth:forgotPassword")}
                </button>
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-[#FF6347] px-5 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-[#FF7F50]"
              >
                {t("common:signIn")}
              </button>
              {error && (
                <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                  {t(error)}
                </p>
              )}
              {submitted && (
                <p className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
                  {t("auth:signedInSuccessfully")}
                </p>
              )}
              <p className="text-sm font-light text-gray-500">
                {t("auth:donTHaveAnAccountYet")}{" "}
                <Link
                  to="/Signup"
                  className="font-medium text-[#FF6347] hover:underline"
                >
                  {t("auth:signUp")}
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
