let email = document.querySelector("#email");
let password = document.querySelector("#password");
let loginbtn = document.querySelector(".log-in");

let storedUser = JSON.parse(localStorage.getItem("user"));

loginbtn.addEventListener("click", function (e) {
  e.preventDefault();

  if (email.value.trim() === "" || password.value.trim() === "") {
    alert("Please Fill Your Info");
  } else {
    if (storedUser && 
        email.value.trim() === storedUser.email &&
        password.value.trim() === storedUser.password) {
        localStorage.setItem("currentUser", storedUser.email);

        setTimeout(() => {
          window.location = "homepage.html";
        }, 1000);

    } else {
      alert("Email or Password Incorrect!");
    }
  }
});

const title = document.getElementById('typewriter-title');
const text = title.textContent;
title.textContent = ''; 
let i = 0;

function typeWriter() {
    if (i < text.length) {
        title.innerHTML += text[i];
        i++;
        setTimeout(typeWriter, 100);
    } else {
      
        title.style.borderRight = 'none';
    }
}

typeWriter();
