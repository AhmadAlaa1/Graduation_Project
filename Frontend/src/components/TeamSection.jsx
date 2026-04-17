
import "../assets/css/style.css";
import "../assets/css/all.css";
import "../assets/css/CustomBootstrap.css";
import "../assets/css/homepage.css";

const team = [
  { img: "/images/ahmed.jpg", name: "Ahmed Alaa", role: "AI / Machine Learning Engineer", linkedin: "http://www.linkedin.com/in/ahmad-alaa" },
  { img: "/images/youssef.jpg", name: "Youssef Yasser", role: "DevOps Engineer", linkedin: "https://www.linkedin.com/in/youssefyasser116" },
  { img: "/images/momen.jpeg", name: "Momen Ahmed", role: "Backend Developer", linkedin: "https://www.linkedin.com/in/momen-elbarrawy" },
  { img: "/images/omnia.jpg", name: "Omnia Waleed", role: "Frontend Developer", linkedin: "https://www.linkedin.com/in/omnia-waleed" },
  { img: "/images/rawan.jpg", name: "Rawan Gamal", role: "Frontend Developer", linkedin: "https://www.linkedin.com/in/rawan-gamal-a95318282" },
  { img: "/images/nedaa.jpg", name: "Nedaa Hany", role: "Backend Developer", linkedin: "https://www.linkedin.com/in/nedaa-hany-551308289" },
];

export default function TeamSection() {
  return (
    <section className="team-section py-6" id="team-section">
      <div className="container">
        <h2 className="team-title" >
          Meet Our Team
        </h2>
        <p className="team-subtitle" >
          Meet a team of experts and innovators<br/> who are pioneers in their field
        </p>
        <div className="team-container">
          {team.map((member, i) => (
            <div key={i} className="team-grid">
              <div className="team-card">
                <img src={member.img} alt={member.name} />
                <div className="team-overlay">
                  <h3>{member.name}</h3>
                  <p className="role">{member.role}</p>
                  <a href={member.linkedin} target="_blank" rel="noreferrer" className="linkedin">
                    LinkedIn Profile
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
