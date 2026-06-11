import { useState } from "react";
import { useTranslation } from "react-i18next";

const cvData = [
  { id: "marketing", img: "/images/marketing.png", pdf: "/cv example/Black and Grey Minimalist Professional CV Resume.pdf" },
  { id: "software_engineer", img: "/images/software engineer.png", pdf: "/cv example/White and Black Simple Lined Engineer Resume.pdf" },
  { id: "graphic_designer", img: "/images/graphic designer.png", pdf: "/cv example/White Minimalist Graphic Designer Professional Cv Resume.pdf" },
  { id: "business", img: "/images/MBA.png", pdf: "/cv example/White Simple Professional Business Consultant Resume CV.pdf" },
  { id: "data_analyst", img: "/images/data analysis.png", pdf: "/cv example/Black and White Simple Data Analyst Resume.pdf" },
  { id: "hr", img: "/images/HR.png", pdf: "/cv example/White Simple Corporate CV Resume.pdf" },
];

const slides = [];
for (let i = 0; i < cvData.length; i += 3) {
  slides.push(cvData.slice(i, i + 3));
}

export default function ExampleCVSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [previewPdf, setPreviewPdf] = useState(null);
  const { t, i18n } = useTranslation();

  const isRtl = i18n.language === 'ar';

  const prev = () => {
    if (isRtl) {
      setCurrentSlide((s) => (s + 1) % slides.length);
    } else {
      setCurrentSlide((s) => (s - 1 + slides.length) % slides.length);
    }
  };

  const next = () => {
    if (isRtl) {
      setCurrentSlide((s) => (s - 1 + slides.length) % slides.length);
    } else {
      setCurrentSlide((s) => (s + 1) % slides.length);
    }
  };

  return (
    <section className="example-cv-section py-6" id="example-cv">
      <div className="container">
        <h2 className="section-title text-center">{t('example_cv.section_title')}</h2>
        <p className="section-subtitle text-center">{t('example_cv.section_subtitle')}</p>

        <div className="cv-carousel">
          <div className="cv-container">
            {slides[currentSlide].map((cv, i) => (
              <div key={i} className="cv-grid">
                <div className="cv-card d-flex flex-column">
                  <div className="cv-thumb">
                    <img src={cv.img} alt="CV Sample" />
                  </div>
                  <h5>{t(`example_cv.cards.${cv.id}.title`)}</h5>
                  <p>{t(`example_cv.cards.${cv.id}.desc`)}</p>
                  <div className="btn-box d-flex justify-content-around mt-auto">
                    <button className="btn btn-preview" onClick={() => setPreviewPdf(cv.pdf)}>{t('example_cv.preview_btn')}</button>
                    <a href={cv.pdf} download className="btn btn-download">{t('example_cv.download_btn')}</a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="carousel-controls">
            <button onClick={prev} className="carousel-btn"><i className={`fa-solid ${isRtl ? 'fa-angle-right' : 'fa-angle-left'}`}></i></button>
            <button onClick={next} className="carousel-btn"><i className={`fa-solid ${isRtl ? 'fa-angle-left' : 'fa-angle-right'}`}></i></button>
          </div>
        </div>
      </div>

      {/* PDF Preview Modal */}
      {previewPdf && (
        <div className="modal-backdrop-custom" onClick={() => setPreviewPdf(null)}>
          <div className="modal-box modal-xl" onClick={(e) => e.stopPropagation()}>
            <div className="modal-box-header">
              <h5>{t('example_cv.preview_modal_title')}</h5>
              <button onClick={() => setPreviewPdf(null)}>&times;</button>
            </div>
            <div className="modal-box-body">
              <iframe src={previewPdf} width="100%" height="600px" title="CV Preview" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}