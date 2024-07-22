let emailForm = document.getElementById('emailForm');
let codeForm = document.getElementById('codeForm');
let newPasswordForm = document.getElementById('newPasswordForm');
let resetForm = document.getElementById('resetForm');
let verifyForm = document.getElementById('verifyForm');
let passwordForm = document.getElementById('passwordForm');
let generatedCodeElement = document.getElementById('generatedCode');
let userData = JSON.parse(localStorage.getItem("user-data"))
let verificationCode;

function generateCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

resetForm.addEventListener('submit', function(e) {
  
    if(userData != null){
        e.preventDefault();
        verificationCode = generateCode();
        generatedCodeElement.textContent = verificationCode;

        let forgotPasswordEmail = document.querySelector("#email").value
        let emailCompare = userData.find((value)=>value.email == forgotPasswordEmail)
        console.log(emailCompare);
        console.log(forgotPasswordEmail);

        if(emailCompare !== undefined){
            emailForm.classList.add('hidden');
            codeForm.classList.remove('hidden');
        }else{
            alert('Incorrect Email Please try again.');
        }
    }else{
        alert("You need to create a account")
        setTimeout(() => {
            window.location.href = "../createAccount/createAccount.html"
        }, 1000);
    }
});

verifyForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const enteredCode = document.getElementById('verificationCode').value;
    if (enteredCode === verificationCode) {
        codeForm.classList.add('hidden');
        newPasswordForm.classList.remove('hidden');
    } else {
        alert('Incorrect verification code. Please try again.');
    }
});

passwordForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (newPassword !== confirmPassword) {
        alert("Passwords don't match!");
        return;
    }else{
        let email = document.querySelector("#email").value
        let emailCompare = userData.find((value)=>value.email == email)
        emailCompare.password = confirmPassword
        console.log(emailCompare);
        localStorage.setItem("user-data",JSON.stringify(userData))
        setTimeout(function() {
            window.location.href = '../login/login.html';
        }, 1000); 
    }
});