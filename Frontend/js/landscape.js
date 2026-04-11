document.addEventListener("DOMContentLoaded", () => {

  // Typewriter
  const title = document.getElementById('typewriter-title');
  if (title) {
    const text = title.textContent;
    title.textContent = '';
    let i = 0;
    function typeWriter() {
      if (i < text.length) {
        title.innerHTML += text[i];
        i++;
        setTimeout(typeWriter, 80);
      } else {
        title.style.borderRight = 'none';
      }
    }
    typeWriter();
  }

  // Show interview choices or go directly if no hero section
  const startBtn = document.getElementById("startBtn");
  const choiceSection = document.getElementById("choiceSection");
  if (startBtn) {
    startBtn.addEventListener("click", () => {
      const section = document.querySelector(".section");
      if (section) section.classList.add("d-none");
      if (choiceSection) choiceSection.classList.remove("d-none");
    });
  } else {
   
    if (choiceSection) choiceSection.classList.remove("d-none");
  }

  // Save interview type
  window.chooseType = function(type) {
    localStorage.setItem("interviewType", type);
    if (type === "cv") {
      window.location.href = "cvcheck.html";
    } else {
      window.location.href = "selectJob.html";
    }
  }

  // Bootstrap tooltips
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  tooltipTriggerList.forEach(el => new bootstrap.Tooltip(el));

});
