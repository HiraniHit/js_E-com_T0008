const createAccountForm = document.getElementById("createAccountForm");

createAccountForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    let userData = JSON.parse(localStorage.getItem("user-data")) || [];

    if (password !== confirmPassword) {
        alert("Passwords don't match!");
        return;
    }
    if (userData.length === 0) {
        let admin = {
            id: 1000000000000,
            name: "admin",
            email: "hithirani001@gmail.com",
            password: "hit@1234",
        };
        userData.push(admin);
    }

    let obj = {
        id: Date.now(),
        name: fullName,
        email: email,
        password: confirmPassword,
    };
    userData.push(obj);
    localStorage.setItem("user-data",JSON.stringify(userData))

    setTimeout(function () {
        window.location.href = "../login/login.html";
    }, 1000);
});
