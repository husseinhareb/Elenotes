function createNote() {
  // Create a div element
  const divNote = document.createElement('div');
  divNote.className = 'divNote';

  // Create an input element
  const inputText = document.createElement('input');
  inputText.type = 'text';
  inputText.placeholder = 'Enter Your Note...';
  inputText.className = 'inputText';
  
  // Create a container for buttons
  const buttonsContainer = document.createElement('div');
  buttonsContainer.className = 'buttonsContainer';

  // Create the first button (SAVE or EDIT)
  const saveEditButton = document.createElement('button');
  saveEditButton.innerHTML = '<a href="#"><span><i class="fas fa-save"></i></span></a>'; // Font Awesome save icon
  saveEditButton.className = 'saveEditButton';

  // Create the second button (DELETE) using Font Awesome icons
  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = '<a href="#"><span><i class="fa fa-trash"></i></span></a>'; // Font Awesome trash icon
  deleteButton.className = 'deleteButton';
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
    divNote.classList.add('fade-out');
  
    divNote.addEventListener('transitionend', function() {
      divNote.remove();
    });
  
  
    setTimeout(() => {
      divNote.remove();
    }, 500); 
  });
  
  
  divNote.appendChild(inputText);
  buttonsContainer.appendChild(deleteButton);
  divNote.appendChild(buttonsContainer);
  buttonsContainer.appendChild(saveEditButton);

  divNote.classList.add('new-note');

  setTimeout(() => {
    divNote.classList.add('show');
    
    divNote.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 10);

  const notesContainer = document.getElementById('notesContainer');
  notesContainer.appendChild(divNote);
}


