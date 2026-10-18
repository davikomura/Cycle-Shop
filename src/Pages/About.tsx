import { useI18n } from "../i18n/I18n";
import logo from "../assets/dk-cycle-stacked.png";

export const About = () => {
  const { t } = useI18n(["common", "about"]);
  return (
    <div className="2xl:container 2xl:mx-auto px-4 py-9 md:px-6 md:py-12 lg:px-20 lg:py-16">
      <div className="flex flex-col justify-between gap-8 lg:flex-row">
        <div className="flex w-full flex-col justify-center lg:w-3/5">
          <h1 className="pb-4 text-3xl font-bold leading-tight text-gray-800 lg:text-4xl">
            {t("about:title")}
          </h1>
          <p className="text-base leading-relaxed text-gray-600">
            {t("about:intro")}
          </p>
          <p className="mt-4 text-base leading-relaxed text-gray-600">
            {t("about:services")}
          </p>
        </div>
        <div className="flex w-full items-center justify-center lg:w-2/5">
          <img
            className="h-auto w-full rounded-2xl bg-white object-contain"
            src={logo}
            alt="DK Cycle Shop logo"
          />
        </div>
      </div>

      <div className="flex flex-col justify-between gap-8 pt-12 lg:flex-row">
        <div className="flex w-full flex-col justify-center lg:w-5/12">
          <h2 className="pb-4 text-3xl font-bold leading-9 text-gray-800 lg:text-4xl">
            {t("common:ourStory")}
          </h2>
          <p className="text-base leading-6 text-gray-600">
            {t("about:story")}
          </p>
        </div>

        <div className="flex w-full flex-col items-center justify-center lg:w-7/12 lg:items-start lg:justify-start lg:pt-8">
          <img
            className="rounded-md object-cover object-left"
            src="/img/davit1.png"
            alt={t("about:founder.imageAlt")}
          />
          <p className="mt-4 text-left text-xl font-medium leading-5 text-gray-800 lg:text-center">
            Davi Komura
          </p>
        </div>
      </div>
    </div>
  );
};
