import { categoryNameKey } from "../i18n/catalogKeys";
import { useI18n } from "../i18n/I18n";
import { Link, useParams } from "@tanstack/react-router";
import { getCategoryBySlug } from "../lib/catalog";

export const CategoryLanding = () => {
  const { t } = useI18n(["common", "catalog"]);
  const { categorySlug = "" } = useParams({ from: "/category/$categorySlug" });
  const category = getCategoryBySlug(categorySlug);

  return (
    <section className="mx-auto flex min-h-[60vh] max-w-5xl flex-col justify-center px-4 py-16">
      <span className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-red">
        {t("catalog:category")}
      </span>
      <h1 className="mt-4 text-4xl font-bold text-gray-900">
        {t(categoryNameKey(category.title), { defaultValue: category.title })}
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-gray-600">
        {t(`catalog:categories.${categorySlug}.description`, {
          defaultValue: t("catalog:categories.fallback.description"),
        })}
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          to="/"
          className="rounded-lg bg-gray-800 px-5 py-3 text-white transition-colors hover:bg-brand-red"
        >
          {t("common:backToHomepage")}
        </Link>
        <Link
          to="/FAQ"
          className="rounded-lg border border-gray-300 px-5 py-3 text-gray-700 transition-colors hover:border-gray-500"
        >
          {t("catalog:askAQuestion")}
        </Link>
      </div>
    </section>
  );
};
