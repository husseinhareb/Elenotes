function createNote() {
  // Create a div element
  const divNote = document.createElement('div');
  divNote.className = 'divNote';

  // Create an input element
  const inputText = document.createElement('input');
  inputText.type = 'text';
  inputText.placeholder = 'Enter text...';

  // Create a container for buttons
  const buttonsContainer = document.createElement('div');
  buttonsContainer.className = 'buttonsContainer';

  // Create the first button (SAVE or EDIT)
  const saveEditButton = document.createElement('button');
  saveEditButton.textContent = 'SAVE';

  // Create the second button (DELETE)
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'DELETE';

  // Function to toggle between SAVE and EDIT
  saveEditButton.addEventListener('click', function() {
    if (saveEditButton.textContent === 'SAVE') {
      inputText.disabled = true;
      saveEditButton.textContent = 'EDIT';
    } else {
      inputText.disabled = false;
      saveEditButton.textContent = 'SAVE';
    }
  });

  // Function to delete divNote on DELETE click
  deleteButton.addEventListener('click', function() {
    divNote.remove();
  });

  // Append input and buttons to the div
  divNote.appendChild(inputText);
  divNote.appendChild(buttonsContainer);
  buttonsContainer.appendChild(saveEditButton);
  buttonsContainer.appendChild(deleteButton);

  // Get the notesContainer and append the divNote to it
  const notesContainer = document.getElementById('notesContainer');
  notesContainer.appendChild(divNote);
}
