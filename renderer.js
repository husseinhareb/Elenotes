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

  // Create the first button
  const add = document.createElement('button');
  add.textContent = 'Button 1';

  // Create the second button
  const button2 = document.createElement('button');
  button2.textContent = 'Button 2';

  // Append input and buttons to the div
  divNote.appendChild(inputText);
  divNote.appendChild(buttonsContainer);
  buttonsContainer.appendChild(add);
  buttonsContainer.appendChild(button2);

  // Get the notesContainer and append the divNote to it
  const notesContainer = document.getElementById('notesContainer');
  notesContainer.appendChild(divNote);
}