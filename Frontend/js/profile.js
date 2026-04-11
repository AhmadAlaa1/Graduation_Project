if (!localStorage.getItem("currentUser")) {
    window.location.href = "login.html";
}
// ================= LOAD DATA =================
function loadData() {
       const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) return;
    const fields = ["fname","lname","email","phone","age","nationality","city"];
    const ids    = ["first-name","last-name","email","phone","age","nationality","city"];

    ids.forEach((id, i) => {
        document.getElementById(id).value = storedUser[fields[i]] || "";
    });

    if (storedUser.profileImage) {
        document.getElementById("profile-img").src = storedUser.profileImage;
    }

    updateProgress();
}

// ================= SAVE DATA =================
function saveData() {
    if (!storedUser) return;

    const fields = ["fname","lname","email","phone","age","nationality","city"];
    const ids    = ["first-name","last-name","email","phone","age","nationality","city"];

    ids.forEach((id, i) => {
        storedUser[fields[i]] = document.getElementById(id).value;
    });

    localStorage.setItem("user", JSON.stringify(storedUser));

    updateProgress();
    alert("Profile Updated Successfully!");
}
// ================= IMAGE UPLOAD =================
document.getElementById("upload-img")?.addEventListener("change", function () {
    if (!this.files[0] || !storedUser) return;

    const reader = new FileReader();
    reader.onload = function () {
        document.getElementById("profile-img").src = reader.result;
        storedUser.profileImage = reader.result;
        localStorage.setItem("user", JSON.stringify(storedUser));
    };
    reader.readAsDataURL(this.files[0]);
});
// ================= CV UPLOAD =================
document.getElementById("cv-upload")?.addEventListener("change", function () {
    if (this.files[0] && storedUser) {
        storedUser.cvName = this.files[0].name;
        localStorage.setItem("user", JSON.stringify(storedUser));
    }
});
// ================= LOGOUT =================
document.getElementById("LogOut")?.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
});
// ================= DELETE ACCOUNT =================
document.getElementById("delete-account-btn")?.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete your account?")) {
        localStorage.removeItem("user");
        localStorage.removeItem("currentUser");
        window.location.href = "register.html";
    }
});
// ================= PROFILE COMPLETENESS =================
function updateProgress() {
    const ids = ["first-name","last-name","email","phone","age","nationality","city"];
    let filled = 0;

    ids.forEach(id => {
        if (document.getElementById(id).value.trim() !== "") filled++;
    });

    const percent = (filled / ids.length) * 100;
    document.getElementById("progress-bar").style.width = percent + "%";
}
// ================= SAVE BUTTON =================
document.getElementById("save-btn")?.addEventListener("click", saveData);
// ================= START =================
loadData();
updateProgress();

