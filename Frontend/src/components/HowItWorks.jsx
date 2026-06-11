import { useTranslation } from "react-i18next";

const HowItWorks = () => {
  const { t } = useTranslation();

  return (
    <section className="how" id="how">
      <div className="how-img">
        <div className="how-blob">
          <svg viewBox="0 0 200 280" fill="none" width="180">
            <circle cx="100" cy="70" r="55" stroke="#1a9e8f" strokeWidth="3" />
            <rect x="30" y="145" width="140" height="120" rx="20" stroke="#1a9e8f" strokeWidth="3" />
          </svg>
        </div>
        <div className="how-dc1"></div>
        <div className="how-dc2"></div>
      </div>
      <div>
        <div className="section-tag">{t('how_it_works.section_tag')}</div>
        <h2 className="section-heading">{t('how_it_works.heading')}</h2>
        <p className="section-desc">
          {t('how_it_works.desc')}
        </p>
        <div className="steps-list">
          <div className="step-item">
            <div className="step-badge">{t('how_it_works.steps.step1.num')}</div>
            <div>
              <h3>{t('how_it_works.steps.step1.title')}</h3>
              <p>{t('how_it_works.steps.step1.desc')}</p>
            </div>
          </div>
          <div className="step-item">
            <div className="step-badge">{t('how_it_works.steps.step2.num')}</div>
            <div>
              <h3>{t('how_it_works.steps.step2.title')}</h3>
              <p>{t('how_it_works.steps.step2.desc')}</p>
            </div>
          </div>
          <div className="step-item">
            <div className="step-badge">{t('how_it_works.steps.step3.num')}</div>
            <div>
              <h3>{t('how_it_works.steps.step3.title')}</h3>
              <p>{t('how_it_works.steps.step3.desc')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;