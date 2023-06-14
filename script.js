var navLinks = document.querySelectorAll("nav a");
var contentContainer = document.getElementById("content");

function loadPage(url) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      contentContainer.innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

for (var i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener("click", function(event) {
    event.preventDefault(); 
    var url = this.href;
    loadPage(url);
  });
}