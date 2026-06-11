import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const { t } = useTranslation();

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  const faqKeys = ["q1", "q2", "q3", "q4", "q5"];

  return (
    <section className="faq-section py-6" id="faq-section">
      <div className="container">
        <h2 className="section-title text-center ">{t('faq.section_title')}</h2>
        <p className="section-subtitle text-center mb-5">{t('faq.section_subtitle')}</p>

        <div className="accordion" id="faqAccordion">
          {faqKeys.map((key, i) => (
            <div key={key} className="accordion-item mb-3">
              <h2 className="accordion-header">
                <button
                  className={`accordion-button special-bg ${openIndex === i ? "opened" : "collapsed"}`}
                  type="button"
                  onClick={() => toggle(i)}
                >
                  {t(`faq.items.${key}.q`)}
                </button>
              </h2>
              <div className={`accordion-collapse collapse ${openIndex === i ? "show" : ""}`}>
                <div className="accordion-body">{t(`faq.items.${key}.a`)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}