const btn = document.querySelector(".btn");
const input = document.getElementById("input");
const copyIcon = document.querySelector(".fa-copy");
const alertContainer = document.querySelector(".alert-container");

btn.addEventListener("click", ()=>{
    createPassword()
});

copyIcon.addEventListener("click", ()=>{
    copyPassword();
    
    if(input.value)
    {
        alertContainer.classList.remove("active");
        setTimeout(() => {
            alertContainer.classList.add("active");
        }, 2000);
    }
});

function createPassword()
{
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()<>?+-=;:ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const passwordLength = 10;
    let password = "";
    for (let i = 0; i < passwordLength; i++) 
    {
        const randomNum = Math.floor(Math.random()*chars.length);   
        password += chars.substring(randomNum, randomNum + 1); //dodawanie do hasła wylosowanego znaku 
    }

    input.value = password;
    alertContainer.innerText = password + " copied!";
}

function copyPassword()
{
    input.select(); //to dla pc
    input.setSelectionRange(0,9999); //to tylko  dla urządzeń mobilnych
    navigator.clipboard.writeText(input.value);    
}