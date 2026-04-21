export default function CvContact({ contact }) {
  if (!contact) return null;

  const items = [
    { icon: "fas fa-envelope", label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    { icon: "fas fa-phone", label: "Phone", value: contact.phone, href: `tel:${contact.phone}` },
    { icon: "fab fa-linkedin", label: "LinkedIn", value: "LinkedIn Profile", href: contact.linkedin },
    { icon: "fab fa-github", label: "GitHub", value: "GitHub Profile", href: contact.github },
  ].filter(item => item.value);

  return (
    <div className="an-card h-100">
      <h5 className="an-card-title">Contact Information</h5>
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
