// components/FloatingControls.jsx
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function FloatingControls() {
  const { i18n } = useTranslation();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // يظهر الزرار التاني لما تنزل 150 بكسل
      if (window.scrollY > 150) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = () => {
    const nextLang = i18n.language === "ar" ? "en" : "ar";
    i18n.changeLanguage(nextLang);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="floating-controls-wrapper">
      {/* زر تبديل اللغة - هيفضل فوق دايماً */}
      <button
        onClick={toggleLanguage}
        className="btn-floating btn-floating-lang"
        aria-label="Toggle Language"
      >
        {i18n.language === "ar" ? "En" : "Ar"}
      </button>

      {/* زر الصعود - يظهر بالأسفل تماماً ويدفع زر اللغة لأعلى */}
      <button
        onClick={scrollToTop}
        className={`btn-floating btn-floating-top ${showScrollTop ? "visible" : ""}`}
        aria-label="Scroll to top"
      >
        <i className="fa-solid fa-arrow-up"></i>
      </button>
    </div>
  );
}