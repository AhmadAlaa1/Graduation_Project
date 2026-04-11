// Jobs array
const jobs = [
  { value: "frontend", name: "Front-End Developer" },
  { value: "backend", name: "Back-End Developer" },
  { value: "fullstack", name: "Full-Stack Developer" },
  { value: "data", name: "Data Scientist" },
  { value: "design", name: "UI/UX Designer" }
];

// Experience levels
const levels = [
  { value: "junior", name: "Junior" },
  { value: "mid", name: "Mid-Level" },
  { value: "senior", name: "Senior" }
];

// Populate dropdowns dynamically
const jobSelect = document.getElementById('jobField');
jobs.forEach(job => {
  const option = document.createElement('option');
  option.value = job.value;
  option.textContent = job.name;
  jobSelect.appendChild(option);
});

const levelSelect = document.getElementById('experienceLevel');
levels.forEach(level => {
  const option = document.createElement('option');
  option.value = level.value;
  option.textContent = level.name;
  levelSelect.appendChild(option);
});

// Start interview function
function startInterview() {
  const job = jobSelect.value;
  const level = levelSelect.value;

  if (!job || !level) {
    alert('Please select job field and experience level!');
    return;
  }

  window.location.href = `interview.html?job=${job}&level=${level}`;
}
