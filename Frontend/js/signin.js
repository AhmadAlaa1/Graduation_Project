let fname = document.querySelector("#firstname");
let lname = document.querySelector("#lastname");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let phone = document.querySelector("#phone");
let age = document.querySelector("#age");
let nationality = document.querySelector("#nationality");
let city = document.querySelector("#city");
let cvUpload = document.querySelector("#cv-upload");
let registerbtn = document.querySelector("#sign_up");

registerbtn.addEventListener("click", function(e){
    e.preventDefault();

    if(!fname.value || !lname.value || !email.value || !password.value || !phone.value || !age.value || !nationality.value || !city.value){
        alert("Please Fill Your Info");
        return;
    }

    const user = {
        fname: fname.value,
        lname: lname.value,
        email: email.value,
        password: password.value,
        phone: phone.value,
        age: age.value,
        nationality: nationality.value,
        city: city.value,
        cvName: cvUpload.files[0] ? cvUpload.files[0].name : ""
    };

    localStorage.setItem("user", JSON.stringify(user));

    alert("Registered Successfully!");
    setTimeout(()=> window.location="login.html", 1000);
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