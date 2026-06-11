import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <footer>
      <div className="footer-grid" id="footer">
        <div className="footer-brand">
          <a
            className="logo"
            href="#"
            style={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              fontSize: '19px',
              fontWeight: 800,
              color: 'white'
            }}
          >
            <div className="logo-mark">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" width="20" height="20">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
              </svg>
            </div>
            <span className="brandp1">{t('navbar.brand.part1')} </span><span className="brandp2">{t('navbar.brand.part2')} </span>{t('navbar.brand.part3')}
          </a>
          <p>{t('footer.brand_desc')}</p>
          <div className="footer-socials">
            <a className="social-btn" href="#">f</a>
            <a className="social-btn" href="#">t</a>
            <a className="social-btn" href="#">in</a>
            <a className="social-btn" href="#">yt</a>
          </div>
        </div>

        <div className="footer-col">
          <h4>{t('footer.quick_links.heading')}</h4>
          <ul>
            <li><a href="#home" onClick={(e) => e.preventDefault()}>{t('footer.quick_links.home')}</a></li>
            <li><a href="#features" onClick={(e) => e.preventDefault()}>{t('footer.quick_links.services')}</a></li>
            <li><a href="/our-team" onClick={(e) => { e.preventDefault(); navigate("/our-team"); }}>{t('footer.quick_links.team')}</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()}>{t('footer.quick_links.case_study')}</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()}>{t('footer.quick_links.blog')}</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()}>{t('footer.quick_links.testimonials')}</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>{t('footer.quick_store.heading')}</h4>
          <ul>
            <li><a href="#" onClick={(e) => e.preventDefault()}>{t('footer.quick_store.marketplace')}</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()}>{t('footer.quick_store.license')}</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()}>{t('footer.quick_store.support')}</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()}>{t('footer.quick_store.refunds')}</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()}>{t('footer.quick_store.contact')}</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>{t('footer.useful_links.heading')}</h4>
          <ul>
            <li><a href="#" onClick={(e) => e.preventDefault()}>{t('footer.useful_links.about')}</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()}>{t('footer.useful_links.projects')}</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()}>{t('footer.useful_links.office')}</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()}>{t('footer.useful_links.newsletter')}</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()}>{t('footer.useful_links.privacy')}</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>{t('footer.copyright')}</span>
        <span>{t('footer.privacy_terms')}</span>
      </div>
    </footer>
  );
};

export default Footer;