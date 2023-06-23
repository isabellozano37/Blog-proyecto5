window.addEventListener("load", function() {
  showContent("index");
});

function showContent(id) {
  let container = document.getElementsByClassName("container");
  
  for (let i = 0; i < container.length; i++) {
    if (container[i].id === id) {
      container[i].style.display = "block";
    } else {
      container[i].style.display = "none";
    }
  }
}

function validateForm() {

  let emailInput = document.getElementById("email");
  let emailValue = emailInput.value.trim();
 
  return validForm;
}

function checkPasswords() {
  let passwordInput = document.getElementById("password");
  let passwordValue = passwordInput.value.trim();
  let confirmPasswordInput = document.getElementById("confirmatePassword");
  let confirmPasswordValue = confirmPasswordInput.value.trim();

  if (passwordValue !== confirmPasswordValue) {
    let passwordError = document.getElementById("password-error");
    passwordError.textContent = "Las contraseñas no coinciden";
    passwordError.style.display = "inline-block";
  } else {
    let passwordError = document.getElementById("password-error");
    passwordError.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", function() {
  var showFormButton = document.getElementById("showFormButton");
  var formContainer = document.getElementById("additionalFormContainer");
  
  showFormButton.addEventListener("click", function () {
    if (formContainer.style.display === "block") {
      formContainer.style.display = "none";
    } else {
      formContainer.style.display = "block";
    }
  });
});

document.addEventListener("DOMContentLoaded", function() {
  var loginButton = document.getElementById("loginButton");
  var formContainer = document.getElementById("FormContainer");
  
  loginButton.addEventListener("click", function () {
    if (formContainer.style.display === "block") {
      formContainer.style.display = "none";
    } else {
      formContainer.style.display = "block";
    }
  });
});
