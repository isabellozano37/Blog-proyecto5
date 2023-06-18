const navLinks = document.querySelectorAll('nav ul li a');
const mainContent = document.querySelector('main');

navLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const page = event.target.textContent.toLowerCase();
    loadContent(page);
  });
});

const form = document.getElementById('blog-form');
const titleInput = document.getElementById('entry-title');
const contentInput = document.getElementById('entry-content');

form.addEventListener('submit', function(event) {
  event.preventDefault(); 

  const title = titleInput.value;
  const content = contentInput.value;

  saveChanges(title, content);
});

function saveChanges(title, content) {
  alert('Cambios guardados correctamente');
}

function activateConfirmation(event) {

  event.preventDefault();

  let entryTitleValue = document.getElementById("entryTitle").value;
  let entryContentValue = document.getElementById("entryContent").value;
  let ImgValue = document.getElementById("Img").value;

  let previewContainer = document.getElementById("previewContainer");
  previewContainer.innerHTML =`
    <div class="box">

      <p>${entryTitle}</p>
      <p>${entryContent}</p>
      <p>${Img}</p>

    </div>
  `;

}
