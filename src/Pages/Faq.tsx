import { useI18n } from "../i18n/I18n";
import { useState } from "react";
import faqsData from "../../data.json";

export const Faq = () => {
  const { t } = useI18n(["common", "faq"]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex((currentIndex) => (currentIndex === index ? null : index));
  };

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h1 className="mb-2 text-center text-lg font-medium text-indigo-600">
            {t("faq:faqs")}
          </h1>
          <h2 className="text-center text-4xl font-bold leading-[3.25rem] text-gray-900">
            {t("faq:frequentlyAskedQuestions")}
          </h2>
        </div>

        <div>
          {faqsData.faqs.map((faq, index) => (
            <div
              key={faq.id}
              className={`rounded-2xl border-b border-solid border-gray-200 px-6 py-8 transition-all duration-500 ${
                activeIndex === index ? "bg-indigo-50" : "hover:bg-indigo-50"
              }`}
            >
              <button
                type="button"
                className="group inline-flex w-full items-center justify-between text-left leading-8 text-gray-900 transition duration-500 hover:text-indigo-600"
                onClick={() => toggleAccordion(index)}
                aria-expanded={activeIndex === index}
                aria-controls={`faq-panel-${index}`}
              >
                <span className="text-lg font-medium">
                  {t(`faq:items.${faq.id}.question`)}
                </span>
                <svg
                  className={`text-gray-500 transition duration-500 group-hover:text-indigo-600 ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.5 8.25L12.4142 12.3358C11.7475 13.0025 11.4142 13.3358 11 13.3358C10.5858 13.3358 10.2525 13.0025 9.58579 12.3358L5.5 8.25"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div
                id={`faq-panel-${index}`}
                className="overflow-hidden px-0"
                style={{
                  maxHeight: activeIndex === index ? "250px" : "0",
                  transition: "max-height 0.5s ease",
                }}
              >
                <p className="pt-4 text-base leading-6 text-gray-900">
                  {t(`faq:items.${faq.id}.answer`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
