import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const Services = () => {
  const { t } = useTranslation();

  return (
    <section className="services-band" id="services">
      <div className="services-grid">
        <div className="service-header">
          <div className="tag">{t('services.section_tag')}</div>
          <h2>{t('services.heading')}</h2>
        </div>

        {/* Card 1: Voice Interview */}
        <Link to="/interview" className="service-card">
          <div className="svc-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="23" />
            </svg>
          </div>
          <h3>{t('services.voice_interview.title')}</h3>
          <p>{t('services.voice_interview.desc')}</p>
        </Link>

        {/* Card 2: CV Analysis */}
        <Link to="/analysis-cv" className="service-card">
          <div className="svc-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
          </div>
          <h3>{t('services.cv_analysis.title')}</h3>
          <p>{t('services.cv_analysis.desc')}</p>
        </Link>

        {/* Card 3: CV Builder */}
        <Link to="/cv-builder" className="service-card">
          <div className="svc-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </div>
          <h3>{t('services.cv_builder.title')}</h3>
          <p>{t('services.cv_builder.desc')}</p>
        </Link>

        {/* Card 4: My Interview Reports */}
        <Link to="/my-interviews" className="service-card">
          <div className="svc-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          </div>
          <h3>{t('services.my_reports.title')}</h3>
          <p>{t('services.my_reports.desc')}</p>
        </Link>

      </div>
    </section>
  );
};

export default Services;