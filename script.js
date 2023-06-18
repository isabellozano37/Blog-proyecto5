var navLinks = document.querySelectorAll("nav a");
var contentContainer = document.getElementById("content");

function loadPage(url) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      contentContainer.innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

for (var i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener("click", function (event) {
    event.preventDefault();
    var url = this.href;
    loadPage(url);
  });
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

document.addEventListener("DOMContentLoaded", function () {
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

document.addEventListener("DOMContentLoaded", function () {
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
