import { useI18n } from "../i18n/I18n";
export const TermsConditions = () => {
  const { t } = useI18n(["common", "legal"]);
  return (
    <div className="bg-gray-100 flex justify-center items-center">
      <div className="bg-white w-full h-full p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
          {t("common:termsAndConditions")}
        </h1>
        <p className="text-gray-700 mb-4">
          {t("legal:terms.intro")}
        </p>
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
          {t("legal:terms.acceptance.title")}
        </h2>
        <p className="text-gray-600 mb-3 sm:mb-4">
          {t("legal:terms.acceptance.body")}
        </p>
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
          {t("legal:terms.changes.title")}
        </h2>
        <p className="text-gray-600 mb-3 sm:mb-4">
          {t("legal:terms.changes.body")}
        </p>
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
          {t("legal:terms.usage.title")}
        </h2>
        <p className="text-gray-600 mb-3 sm:mb-4">
          {t("legal:terms.usage.body")}
        </p>
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
          {t("legal:terms.contact.title")}
        </h2>
        <p className="text-gray-600">
          {t("legal:terms.contact.body")}
        </p>
      </div>
    </div>
  );
};
