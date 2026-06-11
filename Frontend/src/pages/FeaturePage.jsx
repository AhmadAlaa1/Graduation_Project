import { useEffect } from "react";
import Navbar from "../components/Navbar";
import featuresData from "../data/featuresData";
import { useTranslation } from "react-i18next";

export default function FeaturePage() {
  const featureKey = localStorage.getItem("currentFeature");
  const { t } = useTranslation();

  const feature = featuresData[featureKey];

  return (
    <>
      <Navbar />
      <main className="features-main">
        <div className="feature-content container special-bg">
          {feature ? (
            <>
              <div className="text-center">
                <h1 className="feature-title display-4">{t(`features_data.${featureKey}.title`, feature.title)}</h1>
                <p className="feature-desc fs-5">{t(`features_data.${featureKey}.description`, feature.description)}</p>
              </div>
              <div className="row justify-content-center align-items-center g-4 mt-3">
                {feature.content}
              </div>
            </>
          ) : (
            <div className="text-center">
              <h1 className="feature-title display-4">{t('feature_page.not_found_title')}</h1>
              <p className="feature-desc fs-5 mt-3">{t('feature_page.not_found_desc')}</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}