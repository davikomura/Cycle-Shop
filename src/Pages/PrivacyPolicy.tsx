import { useI18n } from "../i18n/I18n";
export const PrivacyPolicy = () => {
  const { t } = useI18n(["common", "legal"]);
  return (
    <div className="bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">{t("common:privacyPolicy")}</h1>

        <p className="mb-4">{t("legal:privacy.intro")}</p>

        <h2 className="text-2xl font-bold mb-2">
          {t("legal:privacy.collection.title")}
        </h2>

        <p className="mb-4">{t("legal:privacy.collection.intro")}</p>

        <ul className="list-disc list-inside mb-4">
          <li>{t("legal:privacy.collection.contact")}</li>
          <li>{t("legal:privacy.collection.demographics")}</li>
          <li>{t("legal:privacy.collection.surveys")}</li>
        </ul>

        <h2 className="text-2xl font-bold mb-2">
          {t("legal:privacy.usage.title")}
        </h2>

        <p className="mb-4">
          {t("legal:privacy.usage.intro")}
        </p>

        <ul className="list-disc list-inside mb-4">
          <li>{t("legal:privacy.usage.records")}</li>
          <li>{t("legal:privacy.usage.improvements")}</li>
          <li>{t("legal:privacy.usage.marketing")}</li>
          <li>{t("legal:privacy.usage.research")}</li>
        </ul>

        <h2 className="text-2xl font-bold mb-2">{t("legal:privacy.security.title")}</h2>

        <p className="mb-4">{t("legal:privacy.security.body")}</p>

        <h2 className="text-2xl font-bold mb-2">{t("legal:privacy.cookies.title")}</h2>

        <p className="mb-4">{t("legal:privacy.cookies.description")}</p>

        <p className="mb-4">{t("legal:privacy.cookies.scope")}</p>

        <h2 className="text-2xl font-bold mb-2">
          {t("legal:privacy.links.title")}
        </h2>

        <p className="mb-4">{t("legal:privacy.links.body")}</p>

        <h2 className="text-2xl font-bold mb-2">
          {t("legal:privacy.control.title")}
        </h2>

        <p className="mb-4">{t("legal:privacy.control.intro")}</p>

        <ul className="list-disc list-inside mb-4">
          <li>{t("legal:privacy.control.withdrawal")}</li>
          <li>{t("legal:privacy.control.sharing")}</li>
          <li>{t("legal:privacy.control.access")}</li>
          <li>{t("legal:privacy.control.correction")}</li>
        </ul>

        <p className="mb-4">{t("legal:privacy.updates")}</p>
      </div>
    </div>
  );
};
