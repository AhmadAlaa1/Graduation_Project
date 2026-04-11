document.addEventListener("DOMContentLoaded", () => {

  const cvPreview = document.getElementById("cvPreview");
  const updateCvBtn = document.getElementById("updateCvBtn");
  const startInterviewBtn = document.getElementById("startInterviewBtn");
  const saveCvBtn = document.getElementById("saveCvBtn");
  const cvInput = document.getElementById("cvInput");
  const cvEmbed = document.getElementById("cvEmbed");

  const cvModal = new bootstrap.Modal(document.getElementById("cvModal"));
  const updateModal = new bootstrap.Modal(document.getElementById("updateCvModal"));

  // Open CV Modal on click left div
  cvPreview.addEventListener("click", () => {
    cvModal.show();
  });

  // Open Update CV modal
  updateCvBtn.addEventListener("click", () => {
    updateModal.show();
  });

  // Save new CV (front-end simulation)
  saveCvBtn.addEventListener("click", () => {
    if (!cvInput.files.length) {
      alert("Please select a CV first");
      return;
    }

    const file = cvInput.files[0];
    document.getElementById("cvFileName").textContent = file.name;
    cvEmbed.src = URL.createObjectURL(file); // show new CV in modal

    updateModal.hide();
  });

  // Start Interview
  startInterviewBtn.addEventListener("click", () => {
    window.location.href = "interview.html";
  });

});
