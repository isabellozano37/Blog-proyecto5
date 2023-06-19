document.addEventListener("DOMContentLoaded", function () {
  const entryForm = document.getElementById('entry-form');
  const titleInput = document.getElementById('title-input');
  const contentInput = document.getElementById('content-input');
  const photoInput = document.getElementById('photo-input');
  const entryList = document.getElementById('entry-list');

  function handleFormSubmit(event) {
    event.preventDefault();

    const title = titleInput.value;
    const content = contentInput.value;
    const photo = photoInput.files[0];

    const entryElement = document.createElement('div');
    const titleElement = document.createElement('h3');
    titleElement.textContent = title;
    const contentElement = document.createElement('p');
    contentElement.textContent = content;
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.addEventListener('click', function () {
      entryList.removeChild(entryElement);
    });

    entryElement.appendChild(titleElement);
    entryElement.appendChild(contentElement);


    if (photo) {
      const photoElement = document.createElement('img');
      photoElement.classList.add('entry-image');
      photoElement.src = URL.createObjectURL(photo);
      entryElement.appendChild(photoElement);
    }

    entryElement.appendChild(deleteButton);

    entryList.appendChild(entryElement);

    titleInput.value = '';
    contentInput.value = '';
    photoInput.value = '';
  }

  entryForm.addEventListener('submit', handleFormSubmit);
});
