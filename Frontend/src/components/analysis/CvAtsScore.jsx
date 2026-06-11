import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

export default function CvAtsScore({ ats }) {
  const barRef = useRef(null);
  const { t } = useTranslation();

  const getColor = (val) => {
    if (val >= 75) return "var(--g1)";
    if (val >= 50) return "#f7b267";
    return "#e05c5c";
  };

  useEffect(() => {
    if (!barRef.current || !ats?.percent) return;
    let progress = 0;
    const target = ats.percent;
    const interval = setInterval(() => {
      if (progress >= target) return clearInterval(interval);
      progress++;
      barRef.current.style.width = progress + "%";
      barRef.current.textContent = progress + "%";
      barRef.current.style.backgroundColor = getColor(progress);
    }, 15);
    return () => clearInterval(interval);
  }, [ats]);

  const label = ats?.percent >= 75 
    ? t('ats_panel.score_desc_high') 
    : ats?.percent >= 50 
      ? t('ats_panel.score_desc_good') 
      : t('ats_panel.score_desc_low');

  return (
    <div className="an-card mb-4">
      <div className="an-ats-header">
        <h5 className="an-card-title mb-0">{t('ats_panel.score_label')}</h5>
        <span className="an-ats-badge" style={{ background: getColor(ats?.percent) }}>
          {label}
        </span>
      </div>
      <div className="an-progress-track mt-3">
        <div ref={barRef} className="an-progress-fill" style={{ width: "0%" }}>0%</div>
      </div>
    </div>
  );
}