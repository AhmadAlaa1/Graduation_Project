import { useState, useRef } from "react";
import "../assets/css/style.css";
import "../assets/css/all.css";
import "../assets/css/CustomBootstrap.css";
import "../assets/css/homepage.css";

const howSteps = [
  { key: "cvAnalysis", icon: "fas fa-upload", title: "Upload CV", text: "Easily upload your CV to get started with AI analysis.", modal: true },
  { key: "cvAnalysis", icon: "fas fa-search", title: "AI Analysis", text: "Get detailed insights and improvement suggestions." },
  { key: "aiInterview", icon: "fas fa-comments", title: "Practice Interviews", text: "Simulate interviews with real-time AI feedback." },
  { key: "progressTracking", icon: "fas fa-chart-line", title: "Track Progress", text: "Monitor your improvements and achievements over time." },
];

const testimonials = [
  { img: "/images/emma.webp", name: "Sarah M.", text: '"This platform completely transformed my interview skills!"' },
  { img: "/images/john.jpg", name: "John D.", text: '"AI feedback helped me land my dream job faster."' },
  { img: "/images/sarah.jpg", name: "Emma L.", text: '"Intuitive, fast, and extremely helpful for preparation."' },
];

const plans = [
  { icon: "fas fa-gem", title: "Free Plan", text: "Access basic CV analysis and limited interview simulations." },
  { icon: "fas fa-star", title: "Pro Plan", text: "Unlimited CV analysis, interviews, and personalized feedback." },
  { icon: "fas fa-crown", title: "Premium Plan", text: "Advanced AI insights, coaching, and priority support." },
];

function openFeature(key) {
  localStorage.setItem("currentFeature", key);
  window.location.href = "/feature";
}

export default function NavPillsSection() {
  const [activeTab, setActiveTab] = useState("how");
  const [showModal, setShowModal] = useState(false);
  const [cvFile, setCvFile] = useState(null);

  const handleSaveCV = () => {
    if (!cvFile) { alert("Please select a CV first"); return; }
    console.log("Selected CV:", cvFile.name);
    setShowModal(false);
  };

  return (
    <section className="nav-pills-section py-6" id="nav-pills-section">
      <div className="container">
        <h2 className="section-title text-center mb-4">Explore More</h2>

        {/* Tabs */}
        <ul className="nav nav-pills justify-content-center mb-4">
          {[["how", "How It Works"], ["testimonials", "Testimonials"], ["plans", "Plans"]].map(([key, label]) => (
            <li key={key} className="nav-item">
              <button
                className={`nav-link ${activeTab === key ? "active" : ""}`}
                onClick={() => setActiveTab(key)}
              >{label}</button>
            </li>
          ))}
        </ul>

        {/* HOW IT WORKS */}
        {activeTab === "how" && (
          <div className="row g-4 justify-content-center">
            {howSteps.map((step, i) => (
              <div key={i} className="col-12 col-sm-6 col-lg-3">
                <div
                  className="feature-card p-4 text-center"
                  style={{ cursor: "pointer" }}
                  onClick={() => step.modal ? setShowModal(true) : openFeature(step.key)}
                >
                  <div className="icon-box"><i className={step.icon}></i></div>
                  <h3 className="feature-card-title">{step.title}</h3>
                  <p className="feature-text">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TESTIMONIALS */}
        {activeTab === "testimonials" && (
          <div className="row g-4 justify-content-center">
            {testimonials.map((t, i) => (
              <div key={i} className="col-12 col-md-6 col-lg-4">
                <div className="feature-card p-4 text-center">
                  <img src={t.img} alt={t.name} className="testimonial-img mb-3" style={{ width: "100%", height: "200px", objectFit: "cover" }} />
                  <h3 className="feature-title">{t.name}</h3>
                  <p className="feature-text">{t.text}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PLANS */}
        {activeTab === "plans" && (
          <div className="row g-4 justify-content-center">
            {plans.map((p, i) => (
              <div key={i} className="col-12 col-sm-6 col-lg-3">
                <div className="feature-card p-4 text-center">
                  <div className="icon-box"><i className={p.icon}></i></div>
                  <h3 className="feature-title">{p.title}</h3>
                  <p className="feature-text">{p.text}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CV Upload Modal */}
      {showModal && (
        <div className="modal-backdrop-custom" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-box-header">
              <h5>Upload Your CV</h5>
              <button onClick={() => setShowModal(false)}>&times;</button>
            </div>
            <div className="modal-box-body">
              <input type="file" accept=".pdf,.doc,.docx" className="form-control" onChange={(e) => setCvFile(e.target.files[0])} />
            </div>
            <div className="modal-box-footer">
              <button className="btn-save-cv" onClick={handleSaveCV}>Save CV</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
