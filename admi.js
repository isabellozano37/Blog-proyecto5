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

    const reader = new FileReader();
    reader.onload = function () {
      const photoDataUrl = reader.result;

      const entryElement = createEntryElement(title, content, photoDataUrl);
      entryList.appendChild(entryElement);

      titleInput.value = '';
      contentInput.value = '';
      photoInput.value = '';

      saveEntriesToStorage();
    };

    if (photo) {
      reader.readAsDataURL(photo);
    } else {
      reader.onload();
    }
  }

  function createEntryElement(title, content, photoSrc) {
    const entryElement = document.createElement('div');
    entryElement.innerHTML = `
      <h3>${title}</h3>
      <p>${content}</p>
    `;

    if (photoSrc) {
      const photoElement = document.createElement('img');
      photoElement.classList.add('entry-image');
      photoElement.src = photoSrc;
      entryElement.appendChild(photoElement);
    }

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.addEventListener('click', function () {
      entryList.removeChild(entryElement);
      saveEntriesToStorage();
    });
    entryElement.appendChild(deleteButton);

    return entryElement;
  }

  function saveEntriesToStorage() {
    const entries = Array.from(entryList.children).map(function (entryElement) {
      const title = entryElement.querySelector('h3').textContent;
      const content = entryElement.querySelector('p').textContent;
      const photoSrc = entryElement.querySelector('img')?.src || '';
      return { title, content, photoSrc };
    });

    localStorage.setItem('entries', JSON.stringify(entries));
  }

  function loadEntriesFromStorage() {
    const entries = JSON.parse(localStorage.getItem('entries') || '[]');

    entries.forEach(function (entry) {
      const entryElement = createEntryElement(entry.title, entry.content, entry.photoSrc);
      entryList.appendChild(entryElement);
    });
  }

  entryForm.addEventListener('submit', handleFormSubmit);
  loadEntriesFromStorage();
});