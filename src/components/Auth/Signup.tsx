import { Preferences } from "../Common/Preferences";
import { useI18n } from "../../i18n/I18n";
import type { FormEvent } from "react";
import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import logo from "../../assets/logo_dk_cycle_shop.png";
import { useAuth } from "../../context/useAuth";

export const Signup = () => {
  const { t } = useI18n(["common", "auth"]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "").trim();

    if (!name || !email || !password) {
      setError("auth:pleaseCompleteEveryFieldToCreateYour");
      return;
    }

    signup({ name, email });
    setSubmitted(true);
    void navigate({ to: "/", replace: true });
  };

  return (
    <div className="flex items-center bg-gray-dark p-4 font-[sans-serif] md:min-h-screen">
      <div className="text-white absolute right-4 top-4">
        <Preferences />
      </div>
      <div className="mx-auto w-full max-w-4xl max-md:max-w-xl">
        <Link to="/" className="mb-6 flex justify-center">
          <img className="h-auto w-28 sm:w-36" src={logo} alt="DK Cycle Shop" />
        </Link>
        <div className="grid w-full gap-16 overflow-hidden rounded-md bg-white p-6 shadow-md sm:p-8 md:grid-cols-2">
          <div className="space-y-6 max-md:order-1">
            <div className="mb-8 md:mb-16">
              <h2 className="text-2xl font-bold text-gray-800">
                {t("auth:instantAccess")}
              </h2>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                {t("auth:createAnAccountToSaveBikesTrack")}
              </p>
            </div>

            <div className="space-y-6">
              <button
                type="button"
                className="flex w-full items-center justify-center rounded-md bg-blue-600 px-5 py-2.5 text-base font-semibold tracking-wider text-white hover:bg-blue-700"
              >
                {t("auth:continueWithFacebook")}
              </button>
              <button
                type="button"
                className="flex w-full items-center justify-center rounded-md bg-gray-100 px-5 py-2.5 text-base font-semibold tracking-wider text-gray-800 hover:bg-gray-200"
              >
                {t("auth:continueWithGoogle")}
              </button>
              <button
                type="button"
                className="flex w-full items-center justify-center rounded-md bg-black px-5 py-2.5 text-base font-semibold tracking-wider text-white hover:bg-[#333]"
              >
                {t("auth:continueWithApple")}
              </button>
            </div>
          </div>

          <form className="w-full" onSubmit={handleSubmit}>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800">
                {t("auth:register")}
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm text-gray-800"
                >
                  {t("auth:name")}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 outline-blue-500"
                  placeholder={t("auth:enterName")}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm text-gray-800"
                >
                  {t("common:email")}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 outline-blue-500"
                  placeholder={t("auth:enterEmail")}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm text-gray-800"
                >
                  {t("auth:password")}
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 outline-blue-500"
                  placeholder={t("auth:enterPassword")}
                />
              </div>
              <label className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded-md border-gray-300 text-blue-600 focus:ring-blue-500"
                  required
                />
                <span className="ml-3 block text-sm text-gray-800">
                  {t("auth:iAcceptThe")}{" "}
                  <Link
                    to="/Terms-and-Conditions"
                    className="font-semibold text-[#FF6347] hover:underline"
                  >
                    {t("common:termsAndConditions")}
                  </Link>
                </span>
              </label>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                className="w-full rounded-md bg-[#FF6347] px-4 py-2.5 text-sm font-semibold tracking-wider text-white hover:bg-[#FF7F50]"
              >
                {t("auth:createAccount")}
              </button>
            </div>

            {error && (
              <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                {t(error)}
              </p>
            )}

            {submitted && (
              <p className="mt-4 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
                {t("auth:accountCreatedSuccessfully")}
              </p>
            )}

            <p className="mt-6 text-center text-sm text-gray-800">
              {t("auth:alreadyHaveAnAccount")}{" "}
              <Link
                to="/Login"
                className="font-semibold text-[#FF6347] hover:underline"
              >
                {t("auth:loginHere")}
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
