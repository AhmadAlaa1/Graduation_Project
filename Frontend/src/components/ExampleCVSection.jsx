import { useState } from "react";
import "../assets/css/style.css";
import "../assets/css/all.css";
import "../assets/css/CustomBootstrap.css";
import "../assets/css/homepage.css";

const cvData = [
  { img: "/images/marketing.png", title: "Marketing — Professional CV", desc: "Clean and minimal layout suitable for marketing and content roles.", pdf: "/cv example/Black and Grey Minimalist Professional CV Resume.pdf" },
  { img: "/images/software engineer.png", title: "Software Engineer CV", desc: "List-based structure with skills and projects — ideal for developers.", pdf: "/cv example/White and Black Simple Lined Engineer Resume.pdf" },
  { img: "/images/graphic designer.png", title: "Creative / Designer CV", desc: "Modern creative layout perfect for designers and portfolio roles.", pdf: "/cv example/White Minimalist Graphic Designer Professional Cv Resume.pdf" },
  { img: "/images/MBA.png", title: "Business / Management CV", desc: "Professional layout suitable for leadership and business roles.", pdf: "/cv example/White Simple Professional Business Consultant Resume CV.pdf" },
  { img: "/images/data analysis.png", title: "Data Analyst CV", desc: "Analytics-focused layout with charts & metrics sections.", pdf: "/cv example/Black and White Simple Data Analyst Resume.pdf" },
  { img: "/images/HR.png", title: "HR / Recruiter CV", desc: "Simple and clean layout suitable for HR specialists.", pdf: "/cv example/White Simple Corporate CV Resume.pdf" },
];

const slides = [];
for (let i = 0; i < cvData.length; i += 3) {
  slides.push(cvData.slice(i, i + 3));
}

export default function ExampleCVSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [previewPdf, setPreviewPdf] = useState(null);

  const prev = () => setCurrentSlide((s) => (s - 1 + slides.length) % slides.length);
  const next = () => setCurrentSlide((s) => (s + 1) % slides.length);

  return (
    <section className="example-cv-section py-6" id="example-cv">
      <div className="container">
        <h2 className="section-title text-center">Example CVs</h2>
        <p className="section-subtitle text-center">Ready-to-use templates · Organized by popular fields</p>

        <div className="cv-carousel">
          <div className="cv-container">
            {slides[currentSlide].map((cv, i) => (
              <div key={i} className="cv-grid">
                <div className="cv-card d-flex flex-column">
                  <div className="cv-thumb">
                    <img src={cv.img} alt="CV Sample" />
                  </div>
                  <h5>{cv.title}</h5>
                  <p>{cv.desc}</p>
                  <div className="btn-box d-flex justify-content-around mt-auto">
                    <button className="btn btn-preview" onClick={() => setPreviewPdf(cv.pdf)}>Preview</button>
                    <a href={cv.pdf} download className="btn btn-download">Download</a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="carousel-controls">
            <button onClick={prev} className="carousel-btn"><i class="fa-solid fa-angle-left"></i></button>
            <button onClick={next} className="carousel-btn"><i class="fa-solid fa-angle-right"></i></button>
          </div>
        </div>
      </div>

      {/* PDF Preview Modal */}
      {previewPdf && (
        <div className="modal-backdrop-custom" onClick={() => setPreviewPdf(null)}>
          <div className="modal-box modal-xl" onClick={(e) => e.stopPropagation()}>
            <div className="modal-box-header">
              <h5>Preview CV</h5>
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
