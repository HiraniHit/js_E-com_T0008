
let oldPasswordForm = document.getElementById('oldPasswordForm');
let newPasswordForm = document.getElementById('newPasswordForm');




oldPasswordForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let email = document.getElementById('email').value;
    let oldPassword = document.getElementById('oldPassword').value;

    let userData = JSON.parse(localStorage.getItem("user-data"))
console.log(userData !== null);
   if(userData !== null){
        let currentUser = userData.find(user => user.email === email);
        console.log(currentUser);
        let emailPassword = userData.find(item => item.password == oldPassword)
        console.log(emailPassword);

        if (currentUser && emailPassword) {
            oldPasswordForm.classList.add('hidden');
            newPasswordForm.classList.remove('hidden');
            
        } else {
        alert("Invalid email or password.")
        }
   }else{
    alert("You need to create a account")
    setTimeout(() => {
        window.location.href = "../createAccount/createAccount.html"
    }, 1000);
   }
});

newPasswordForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let newPassword = document.getElementById('newPassword').value;
    let confirmPassword = document.getElementById('confirmPassword').value;

    if (newPassword !== confirmPassword) {
       alert("Passwords don't match!")
        return;
    }

    if (currentUser) {
        currentUser.password = newPassword;

        let userData = JSON.parse(localStorage.getItem("user-data")) || [];
        let userIndex = userData.findIndex(user => user.email === currentUser.email);
        if (userIndex !== -1) {
            userData[userIndex] = currentUser;
            localStorage.setItem("user-data", JSON.stringify(userData));

            alert("Password reset successfully!")

            setTimeout(function() {
                window.location.href = '../login/login.html';
            }, 1000);
        }
    } else {
       alert("An error occurred. Please try again.")
    }
});