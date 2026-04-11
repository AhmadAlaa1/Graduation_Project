const aiResult = {
  name: "SAMI ALHARBI",
  title: "Software Engineer",
  email: "sami@example.com",
  phone: "+201234567890",
  linkedin: "linkedin.com/in/samialharbi",
  github: "github.com/samialharbi",
  portfolio: "samialharbi.com",
  ats_score: 45,
  summary: "Your CV has strong technical foundations, but it lacks some ATS keywords.",
  matched_skills: ["Python", "Git", "API"],
  missing_skills: ["Linux", "SQL", "Security"],
  experience: [
    { period: "2020-2026", role: "Frontend Developer", company: "TechCorp" },
    { period: "2019-2020", role: "Intern", company: "WebSolutions" },
    { period: "2018-2019", role: "Freelance Developer", company: "Self-employed" }
  ],
  projects: [
    { name: "Portfolio Website", progress: 60 },
    { name: "API Integration Tool", progress: 50 }
  ],
  languages: [
    { name: "English", level: 90 },
    { name: "Arabic", level: 100 }
  ],
  interview_questions: [
    "Explain a project where you used APIs.",
    "Explain a project where you used Python.",
    "How would you improve your ATS score?",
    "What challenges did you face in HSP23 Hackathon?"
  ]
};

// ===== Primary Light =====
const root = getComputedStyle(document.documentElement);
const primaryLight = root.getPropertyValue('--primary-light').trim() || "#0d6efd";
const primaryDark = root.getPropertyValue('--primary-dark').trim() || "#0a58ca";

// ===== Function to get color by value =====
function getColor(value) {
  if(value < 50) return "#dc3545";
  if(value < 75) return "#ffc107";
  return primaryLight;
}

// ===== Basic Info =====
document.getElementById("userName").textContent = aiResult.name;
document.getElementById("jobTitle").textContent = aiResult.title;
document.getElementById("summaryText").textContent = aiResult.summary;

// ===== Contact Info with Icons =====
const contactList = document.getElementById("contactInfo");
contactList.innerHTML = `
  <li><i class="fas fa-envelope me-2 mt-3" style="color:${primaryLight}"></i>Email: <a href="mailto:${aiResult.email}" style="color:${primaryDark}">${aiResult.email}</a></li>
  <li><i class="fas fa-phone me-2 mt-3" style="color:${primaryLight}"></i>Phone: <a href="tel:${aiResult.phone}"style="color:${primaryDark}">${aiResult.phone}</a></li>
  <li><i class="fab fa-linkedin me-2 mt-3" style="color:${primaryLight}"></i>LinkedIn: <a href="https://${aiResult.linkedin}" style="color:${primaryDark}" target="_blank">${aiResult.linkedin}</a></li>
  <li><i class="fab fa-github me-2 mt-3" style="color:${primaryLight}"></i>GitHub: <a href="https://${aiResult.github}" style="color:${primaryDark}" target="_blank">${aiResult.github}</a></li>
  <li><i class="fas fa-globe me-2 mt-3" style="color:${primaryLight}"></i>Portfolio: <a href="https://${aiResult.portfolio}" style="color:${primaryDark}" target="_blank">${aiResult.portfolio}</a></li>
`;

// ===== ATS Score =====
const atsBar = document.getElementById("atsBar");
let progress = 0;
const target = aiResult.ats_score;
const interval = setInterval(() => {
  if(progress >= target) return clearInterval(interval);
  progress++;
  atsBar.style.width = progress + "%";
  atsBar.textContent = progress + "%";
  atsBar.style.backgroundColor = getColor(progress);
}, 15);

// ===== Skills badges + icons =====
const matched = document.getElementById("matchedSkills");
aiResult.matched_skills.forEach(skill => {
  matched.innerHTML += `<span class="badge mb-1 me-2 p-2" style="background-color:${primaryLight}; color:white;">${skill}</span>`;
});

const missing = document.getElementById("missingSkills");
aiResult.missing_skills.forEach(skill => {
  missing.innerHTML += `<span class="badge mb-1 me-2 p-2" style="background-color:#dc3545; color:white;">${skill}</span>`;
});

// ===== Skills Chart with animated segments =====
const ctx = document.getElementById("skillsChart").getContext("2d");

const data = {
  labels: ["Matched", "Missing"],
  datasets: [{
    data: [aiResult.matched_skills.length, aiResult.missing_skills.length],
    backgroundColor: [primaryLight, "#dc3545"]
  }]
};
const chart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: data.labels,
    datasets: [{
      data: data.datasets[0].data.map(() => 0),
      backgroundColor: data.datasets[0].backgroundColor
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: true,
    cutout: '70%',
    plugins: {
      legend: {
        display: true,
        position: 'bottom', 
        labels: {
          usePointStyle: true,
          padding: 20,
          generateLabels: function(chart) {
            const dataset = chart.data.datasets[0];
            return chart.data.labels.map((label, i) => ({
              text: label + " (" + dataset.data[i] + ")",
              fillStyle: dataset.backgroundColor[i],
              hidden: false,
              index: i
            }));
          }
        }
      }
    },
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 1500
    }
  }
});

// ===== Animate slices one by one =====
data.datasets[0].data.forEach((value, i) => {
  let progress = 0;
  const interval = setInterval(() => {
    if(progress >= value) return clearInterval(interval);
    progress++;
    chart.data.datasets[0].data[i] = progress;
    chart.update();
  }, 15 + i*300); 
});

// ===== Experience Timeline =====
const expTimeline = document.getElementById("experienceTimeline");
aiResult.experience.forEach(exp => {
    const item = document.createElement("div");
    item.className = "timeline-item";
    item.innerHTML = `
        <div class="timeline-content">
            <h6>${exp.role} at ${exp.company}</h6>
            <span class="text-muted
            ">${exp.period}</span>
        </div>`;
    expTimeline.appendChild(item);
});
// ===== Projects Progress =====
const projList = document.getElementById("projectsList");
aiResult.projects.forEach(p => {
  projList.innerHTML += `
    <div class="mb-2">
      <div class="d-flex justify-content-between">
        <span>${p.name}</span>
        <span>${p.progress}%</span>
      </div>
      <div class="progress">
        <div class="progress-bar" role="progressbar" style="width:${p.progress}%; background-color:${getColor(p.progress)};"></div>
      </div>
    </div>`;
});

// ===== Languages Proficiency =====
const langList = document.getElementById("languages");
aiResult.languages.forEach(l => {
  langList.innerHTML += `
    <div class="mb-2">
      <div class="d-flex justify-content-between">
        <span>${l.name}</span>
        <span>${l.level}%</span>
      </div>
      <div class="progress">
        <div class="progress-bar" style="width:${l.level}%; background-color:${getColor(l.level)};"></div>
      </div>
    </div>`;
});

// ===== Questions fade-in عند الوصول للـ viewport =====
const qList = document.getElementById("questionsList");

aiResult.interview_questions.forEach((q) => {
  const li = document.createElement("li");
  li.className = "list-group-item bg-transparent question-item";
  li.innerHTML = `<i class="fas fa-angle-right me-2" style="color:${primaryLight}"></i>${q}`;
  li.style.opacity = 0;
  li.style.transition = "opacity 1s, transform 1s";
  li.style.transform = "translatex(20px)";
  qList.appendChild(li);
});

// ===== Intersection Observer للـ fade-in =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.style.opacity = 1;
      entry.target.style.transform = "translateY(0)";
      observer.unobserve(entry.target); 
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(".question-item").forEach(item => observer.observe(item));

// ===== Download PDF =====
const { jsPDF } = window.jspdf;
document.getElementById("downloadBtn").addEventListener("click", () => {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text(`${aiResult.name} - ${aiResult.title}`, 10, 20);
  doc.setFontSize(12);
  doc.text(`ATS Score: ${aiResult.ats_score}%`, 10, 30);

  let y = 40;
  doc.text("Summary:", 10, y);
  y += 10;
  doc.text(doc.splitTextToSize(aiResult.summary, 180), 10, y);

  y += 20;
  doc.text("Contact Info:", 10, y);
  y += 10;
  doc.text(`Email: ${aiResult.email}`, 10, y);
  y += 10;
  doc.text(`Phone: ${aiResult.phone}`, 10, y);
  y += 10;
  doc.text(`LinkedIn: ${aiResult.linkedin}`, 10, y);
  y += 10;
  doc.text(`GitHub: ${aiResult.github}`, 10, y);
  y += 10;
  doc.text(`Portfolio: ${aiResult.portfolio}`, 10, y);

  y += 15;
  doc.text("Matched Skills:", 10, y);
  y += 10;
  doc.text(aiResult.matched_skills.join(", "), 10, y);

  y += 15;
  doc.text("Missing Skills:", 10, y);
  y += 10;
  doc.text(aiResult.missing_skills.join(", "), 10, y);

  doc.save(`${aiResult.name}_CV_Report.pdf`);
});