import { useState } from "react";
import "../assets/css/style.css";
import "../assets/css/all.css";
import "../assets/css/CustomBootstrap.css";
import "../assets/css/homepage.css";

const faqs = [
  { q: "How does the AI analyze my CV?", a: "Our AI scans your CV for skills, experience, and achievements, then provides personalized suggestions for improvement." },
  { q: "Is my data secure?", a: "Yes! We use advanced encryption and secure cloud storage to ensure your data is completely safe." },
  { q: "Can I try the platform for free?", a: "Absolutely! We offer a free trial so you can explore the features before subscribing." },
  { q: "How accurate is the AI interview analysis?", a: "Our AI uses advanced machine learning models trained on thousands of interview cases to provide highly accurate insights." },
  { q: "Can I share my results with employers?", a: "Yes! You can export your CV and interview analysis reports to share with potential employers easily." },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="faq-section py-6" id="faq-section">
      <div className="container">
        <h2 className="section-title text-center ">Common Questions</h2>
        <p className="section-subtitle text-center mb-5">Find answers to the most frequently asked questions about our AI platform.</p>

        <div className="accordion" id="faqAccordion">
          {faqs.map((faq, i) => (
            <div key={i} className="accordion-item mb-3">
              <h2 className="accordion-header">
                <button
                  className={`accordion-button special-bg ${openIndex === i ? "opened" : "collapsed"}`}
                  type="button"
                  onClick={() => toggle(i)}
                >
                  {faq.q}
                </button>
              </h2>
              <div className={`accordion-collapse collapse ${openIndex === i ? "show" : ""}`}>
                <div className="accordion-body">{faq.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
