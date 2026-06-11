import { useTranslation } from "react-i18next";

const team = [
  { key: "ahmed", img: "/images/ahmed.jpg", linkedin: "http://www.linkedin.com/in/ahmad-alaa" },
  { key: "youssef", img: "/images/youssef.jpg", linkedin: "https://www.linkedin.com/in/youssefyasser116" },
  { key: "momen", img: "/images/momen.jpeg", linkedin: "https://www.linkedin.com/in/momen-elbarrawy" },
  { key: "omnia", img: "/images/omnia.jpg", linkedin: "https://www.linkedin.com/in/omnia-waleed" },
  { key: "rawan", img: "/images/rawan.jpg", linkedin: "https://www.linkedin.com/in/rawan-gamal-a95318282" },
  { key: "nedaa", img: "/images/nedaa.jpg", linkedin: "https://www.linkedin.com/in/nedaa-hany-551308289" },
];

export default function TeamSection() {
  const { t } = useTranslation();

  return (
    <section className="team-section py-6" id="team-section">
      <div className="container">
        <h2 className="team-title">
          {t('team_section.title')}
        </h2>
        <p className="team-subtitle">
          {t('team_section.subtitle')}
        </p>
        <div className="team-container">
          {team.map((member, i) => (
            <div key={i} className="team-grid">
              <div className="team-card">
                <img src={member.img} alt={t(`team_section.members.${member.key}.name`)} />
                <div className="team-overlay">
                  <h3>{t(`team_section.members.${member.key}.name`)}</h3>
                  <p className="role">{t(`team_section.members.${member.key}.role`)}</p>
                  <a href={member.linkedin} target="_blank" rel="noreferrer" className="linkedin">
                    {t('team_section.linkedin')}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}