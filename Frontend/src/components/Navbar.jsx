import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { logout } from "../store/slices/authSlice";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const { token, user } = useSelector((state) => state.auth);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('home');

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  const isClickScrolling = useRef(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      setTimeout(() => {
        const sectionId = location.hash.replace('#', '');
        const element = document.getElementById(sectionId);
        if (element) {
          isClickScrolling.current = true;
          setActiveLink(sectionId === 'faq-section' ? 'faq' : sectionId === 'footer' ? 'footer' : sectionId);

          const offsetTop = element.offsetTop - 100;
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth"
          });

          setTimeout(() => {
            isClickScrolling.current = false;
          }, 800);
        }
      }, 100);
    } else if (location.pathname === '/' && !location.hash) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (location.pathname === '/') {
        if (isClickScrolling.current) return;

        const sections = ['home', 'how', 'features', 'faq-section', 'footer'];
        let currentSection = 'home';

        sections.forEach((section) => {
          const element = document.getElementById(section);
          if (element) {
            const offsetTop = element.offsetTop - 150;
            if (window.scrollY >= offsetTop) {
              currentSection = section;
            }
          }
        });

        if ((window.innerHeight + Math.round(window.scrollY)) >= document.documentElement.scrollHeight - 50) {
          currentSection = 'footer';
        }

        const activeMap = {
          'home': 'home',
          'how': 'how',
          'features': 'services',
          'faq-section': 'faq',
          'footer': 'footer'
        };
        setActiveLink(activeMap[currentSection] || 'home');
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const handleNavLinkClick = (e, sectionId) => {
    e.preventDefault();
    const targetElementId = sectionId === 'faq' ? 'faq-section' : sectionId === 'services' ? 'features' : sectionId;

    if (location.pathname !== '/') {
      navigate(`/#${targetElementId}`);
    } else {
      const element = document.getElementById(targetElementId);
      if (element) {
        isClickScrolling.current = true;
        setActiveLink(sectionId);

        const offsetTop = element.offsetTop - 100;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth"
        });
        window.history.pushState(null, "", `/#${targetElementId}`);

        setTimeout(() => {
          isClickScrolling.current = false;
        }, 800);
      }
    }
  };

  const handleLogout = () => {
    Swal.fire({
      title: t('navbar.logout_confirm_title'),
      text: t('navbar.logout_confirm_text'),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1a9e8f",
      cancelButtonColor: "#d33",
      confirmButtonText: t('navbar.logout_confirm_btn'),
      cancelButtonText: t('navbar.logout_cancel_btn'),
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logout());
        navigate("/login");

        Swal.fire({
          title: t('navbar.logout_success_title'),
          text: t('navbar.logout_success_text'),
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  return (
    <div className="fixed-top w-100" style={{ zIndex: 1030 }}>
      <div className="container">
        <nav
          className={`navbar navbar-expand-lg rounded-pill px-3 py-2 border transition-all duration-300 ${isScrolled ? 'shadow-lg' : 'shadow-sm'}`}
          style={{ transition: 'all 0.3s ease' }}
        >
          <div className="container-fluid p-0">

            <a
              className="navbar-brand d-flex align-items-center fw-bold fs-4 ms-2"
              href="/"
              onClick={(e) => { e.preventDefault(); navigate("/"); }}
            >
              <div className="nav-logo-icon d-flex align-items-center justify-content-center rounded-circle me-2 navbar-brand-icon">
                <i className="fa-solid fa-microphone-lines fs-6"></i>
              </div>
              <span className="logo-brand-name">

                <span style={{ color: "var(--text-color)" }}>
                  Speak
                </span>

                <span className="text-brand">
                  2
                </span>

                <span style={{ color: "var(--text-color)" }}>
                  hire
                </span>
              </span>

            </a>

            <button
              className="navbar-toggler border-0 shadow-none ms-auto"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#mainNavbar"
            >
              <i className="fa-solid fa-bars fs-3 text-brand"></i>
            </button>

            <div className="collapse navbar-collapse mobile-menu-dropdown" id="mainNavbar">

              {token && (
                <>
                  <ul className="navbar-nav mx-auto mb-2 mb-lg-0 fw-medium text-center text-lg-start mt-2 mt-lg-0 px-2 px-lg-0">
                    <li className="nav-item">
                      <a
                        className={`nav-link mobile-nav-link ${activeLink === 'home' ? 'active text-brand' : ''}`}
                        href="/#home"
                        onClick={(e) => handleNavLinkClick(e, 'home')}
                      >
                        {t('navbar.links.home')}
                      </a>
                    </li>

                    <li className="nav-item">
                      <a
                        className={`nav-link mobile-nav-link ${activeLink === 'how' ? 'active text-brand' : ''}`}
                        href="/#how"
                        onClick={(e) => handleNavLinkClick(e, 'how')}
                      >
                        {t('navbar.links.how')}
                      </a>
                    </li>

                    <li className="nav-item">
                      <a
                        className={`nav-link mobile-nav-link ${activeLink === 'services' ? 'active text-brand' : ''}`}
                        href="/#features"
                        onClick={(e) => handleNavLinkClick(e, 'services')}
                      >
                        {t('navbar.links.services')}
                      </a>
                    </li>

                    <li className="nav-item">
                      <a
                        className={`nav-link mobile-nav-link ${activeLink === 'faq' ? 'active text-brand' : ''}`}
                        href="/#faq-section"
                        onClick={(e) => handleNavLinkClick(e, 'faq')}
                      >
                        {t('navbar.links.faq')}
                      </a>
                    </li>

                    <li className="nav-item">
                      <a
                        className="nav-link mobile-nav-link"
                        href="/our-team"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate("/our-team");
                        }}
                      >
                        {t('navbar.links.team')}
                      </a>
                    </li>

                    <li className="nav-item">
                      <a
                        className={`nav-link mobile-nav-link ${activeLink === 'footer' ? 'active text-brand' : ''}`}
                        href="/#footer"
                        onClick={(e) => handleNavLinkClick(e, 'footer')}
                      >
                        {t('navbar.links.contact')}
                      </a>
                    </li>
                  </ul>

                  <div
                    className="d-none d-lg-block vr mx-3 text-secondary opacity-25"
                    style={{ minHeight: "30px" }}
                  ></div>

                  <hr className="d-lg-none text-secondary opacity-25 my-3" />
                </>
              )}

              <div className="nav-btns d-flex flex-column flex-lg-row align-items-center gap-3 mt-2 mt-lg-0 pb-2 pb-lg-0 me-lg-2 px-2 px-lg-0 text-center text-lg-start">

                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="btn btn-link text-decoration-none rounded-circle p-0 d-flex align-items-center text-center justify-content-center"
                  style={{ width: '40px', height: '40px', color: 'var(--text-color)' }}
                  aria-label="Toggle Dark Mode"
                >
                  {isDarkMode ? (
                    <i className="fa-solid fa-sun fs-5 text-warning"></i>
                  ) : (
                    <i className="fa-solid fa-moon fs-5"></i>
                  )}
                </button>

                {token ? (
                  <>
                    {user && (
                      <div className="text-nowrap mb-1 mb-lg-0">
                        <span className="hi-text me-1">{t('navbar.hi')}</span>
                        <span className="fw-bold hi-user-text text-capitalize">{user.firstName}</span>
                      </div>
                    )}
                    <button
                      className="btn btn-profile rounded-pill fw-semibold border w-100 w-lg-auto"
                      onClick={() => navigate("/profile")}
                    >
                      {t('navbar.profile')}
                    </button>
                    <button
                      className="btn btn-status rounded-pill fw-semibold border w-100 w-lg-auto"
                      style={{ backgroundColor: '#1a9e8f', color: '#fff' }}
                      onClick={handleLogout}
                    >
                      {t('navbar.logout')}
                    </button>
                  </>
                ) : (
                  <button
                    className="btn btn-status rounded-pill fw-semibold w-100 w-lg-auto text-white"
                    style={{ backgroundColor: '#1a9e8f', color: '#fff' }}
                    onClick={() => navigate("/login")}
                  >
                    {t('navbar.login')}
                  </button>
                )}
              </div>

            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;