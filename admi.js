document.addEventListener("DOMContentLoaded", function () {
  const entryForm = document.getElementById('entry-form');
  const titleInput = document.getElementById('title-input');
  const contentInput = document.getElementById('content-input');
  const photoInput = document.getElementById('photo-input');
  const entryList = document.getElementById('entry-list');
  const savedEntriesContainer = document.getElementById('saved-entries');

  function handleFormSubmit(event) {
    event.preventDefault();

    const title = titleInput.value;
    const content = contentInput.value;
    const photo = photoInput.files[0];

    if (title.trim() === '' || content.trim() === '') {
      return;
    }

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
      <h1 class="entry-title" contenteditable="true">${title}</h1>
      <h3 class="entry-content" contenteditable="true">${content}</h3>
    `;

    if (photoSrc) {
      const photoElement = document.createElement('img');
      photoElement.classList.add('entry-image');
      photoElement.src = photoSrc;
      entryElement.appendChild(photoElement);
    }

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'ELIMINAR';
    deleteButton.addEventListener('click', function () {
      entryList.removeChild(entryElement);
      saveEntriesToStorage();
    });
    entryElement.appendChild(deleteButton);

    const editButton = document.createElement('button');
    editButton.textContent = 'EDITAR';
    editButton.addEventListener('click', function () {
      if (isEditing) {
        const updatedTitle = titleElement.textContent;
        const updatedContent = contentElement.textContent;

        titleElement.textContent = updatedTitle;
        contentElement.textContent = updatedContent;

        isEditing = false;
        editButton.textContent = 'EDITAR';

        saveEntriesToStorage();
      } else {
        isEditing = true;
        editButton.textContent = 'CONFIRMAR';
      }
    });
    entryElement.appendChild(editButton);

    const saveButton = document.createElement('button');
    saveButton.textContent = 'CONFIRMAR';
    saveButton.addEventListener('click', function () {
      saveEntry(title, content, photoSrc);
      saveEntriesToStorage();
    });
    entryElement.appendChild(saveButton);

    return entryElement;
  }

  let isEditing = false;

  function saveEntriesToStorage() {
    const entries = Array.from(entryList.children).map(function (entryElement) {
      const titleElement = entryElement.querySelector('.entry-title');
      const contentElement = entryElement.querySelector('.entry-content');
      const title = titleElement.textContent;
      const content = contentElement.textContent;
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

      if (isEditing) {
        const titleElement = entryElement.querySelector('.entry-title');
        const contentElement = entryElement.querySelector('.entry-content');

        titleElement.textContent = entry.title;
        contentElement.textContent = entry.content;
      }
    });

    entries.forEach(function (entry) {
      saveEntry(entry.title, entry.content, entry.photoSrc);
    });
  }

  function saveEntry(title, content, photoSrc) {
    const savedEntry = document.createElement('div');
    savedEntry.innerHTML = `
      <h1>${title}</h1>
      <h3>${content}</h3>
    `;

    if (photoSrc) {
      const photoElement = document.createElement('img');
      photoElement.classList.add('entry-image');
      photoElement.src = photoSrc;
      savedEntry.appendChild(photoElement);
    }

    savedEntriesContainer.appendChild(savedEntry);
  }

  entryForm.addEventListener('submit', handleFormSubmit);
  loadEntriesFromStorage();
});


