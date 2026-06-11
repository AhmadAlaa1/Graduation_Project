import { useTranslation } from "react-i18next";

export default function CvContact({ contact }) {
  const { t } = useTranslation();
  if (!contact) return null;

  const items = [
    { icon: "fas fa-envelope", label: t('register.fields.email'), value: contact.email, href: `mailto:${contact.email}` },
    { icon: "fas fa-phone", label: t('register.fields.phone'), value: contact.phone, href: `tel:${contact.phone}` },
    { icon: "fab fa-linkedin", label: "LinkedIn", value: t('team_section.linkedin'), href: contact.linkedin },
    { icon: "fab fa-github", label: "GitHub", value: "GitHub Profile", href: contact.github },
  ].filter(item => item.value);

  return (
    <div className="an-card h-100">
      <h5 className="an-card-title">{t('footer.quick_store.contact')}</h5>
      <ul className="an-contact-list">
        {items.map((item, i) => (
          <li key={i} className="an-contact-item">
            <i className={`${item.icon} an-contact-icon`}></i>
            <a href={item.href} target="_blank" rel="noreferrer" className="an-contact-link">
              {item.value}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}