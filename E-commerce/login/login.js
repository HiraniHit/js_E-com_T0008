function confirmLogin(){
    event.preventDefault()

    let loginBtn = document.querySelector("#log-in-btn")
    let email = document.querySelector("#email").value.trim()
    let password = document.querySelector("#password").value.trim()
    let userData = JSON.parse(localStorage.getItem("user-data"))
    console.log(email,password);
    console.log(userData);
   if(userData !== null){
       let compareEmail = userData.find((value)=>value.email == email)
       console.log(compareEmail.password == password);
       let comparePassword = compareEmail.password == password
       console.log(compareEmail);
       if(compareEmail !== undefined && comparePassword !== false){
           window.location.href = "../main/index.html"
           document.querySelector("#login-error").textContent = ""
       }else{
           alert("Please Check Password and Email")
       }
   }else{
    alert("No Similar Account Found..You Have to Create a New One")
   }


}
