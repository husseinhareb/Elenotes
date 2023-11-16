function createNote() {
  // Create a div element
  const divNote = document.createElement('div');
  divNote.className = 'divNote';

  // Create an input element
  const inputText = document.createElement('input');
  inputText.type = 'text';
  inputText.placeholder = 'Enter text...';
  inputText.className = "inputText";
  // Create a container for buttons
  const buttonsContainer = document.createElement('div');
  buttonsContainer.className = 'buttonsContainer';

  // Create the first button (SAVE or EDIT)
  const saveEditButton = document.createElement('button');
  saveEditButton.innerHTML = '<i class="fas fa-save"></i>'; // Font Awesome save icon

  // Create the second button (DELETE) using Font Awesome icons
  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>'; // Font Awesome trash icon

  // Function to toggle between SAVE and EDIT
  saveEditButton.addEventListener('click', function() {
    const icon = saveEditButton.querySelector('i');

    if (icon.classList.contains('fa-save')) {
      inputText.disabled = true;
      icon.classList.remove('fa-save');
      icon.classList.add('fa-pencil-alt');
    } else {
      inputText.disabled = false;
      icon.classList.remove('fa-pencil-alt');
      icon.classList.add('fa-save');
    }
  });

  // Function to delete divNote on DELETE click
  deleteButton.addEventListener('click', function() {
    divNote.remove();
  });

  // Append input and buttons to the div
  divNote.appendChild(inputText);
  buttonsContainer.appendChild(deleteButton);
  divNote.appendChild(buttonsContainer);
  buttonsContainer.appendChild(saveEditButton);

  // Get the notesContainer and append the divNote to it
  const notesContainer = document.getElementById('notesContainer');
  notesContainer.appendChild(divNote);
}
