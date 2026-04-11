const userinfo = document.querySelector("#user-info");
const user = document.querySelector("#user");
const links = document.querySelector("#links");
const logOutBtn = document.querySelector("#LogOut");

const storedUser = JSON.parse(localStorage.getItem("user"));
const currentUser = localStorage.getItem("currentUser");

if (storedUser && currentUser) {
  if (links) links.remove();
  if (userinfo) userinfo.style.display = "flex";
  if (user) user.innerHTML = `<i class="fa-solid fa-user"></i> ${storedUser.fname}`;
}

// Logout
if (logOutBtn) {
  logOutBtn.addEventListener("click", function () {
    localStorage.removeItem("currentUser");

    setTimeout(() => {
      window.location = "login.html";
    }, 1000);
  });
}
// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    if(document.body.classList.contains('dark-mode')){
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

// Load theme from localStorage
window.addEventListener('load', () => {
    if(localStorage.getItem('theme') === 'dark'){
        document.body.classList.add('dark-mode');
    }
});
// ===== Interview & Analysis Links Logic =====
document.addEventListener("DOMContentLoaded", function () {

  const interviewLink = document.getElementById("interviewLink");
  const analysisLink = document.getElementById("analysisLink");

  function checkLogin(targetPage) {
    const currentUser = localStorage.getItem("currentUser");

    if (currentUser) {
      window.location.href = targetPage;
    } else {
      window.location.href = "login.html";
    }
  }

  if (interviewLink) {
    interviewLink.addEventListener("click", function (e) {
      e.preventDefault();
      checkLogin("landingscape.html");
    });
  }

  if (analysisLink) {
    analysisLink.addEventListener("click", function (e) {
      e.preventDefault();
      checkLogin("analysis.html");
    });
  }

});