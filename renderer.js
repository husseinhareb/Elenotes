let { ipcRenderer } = require("electron");

let note = document.getElementById("note");
let btn = document.getElementById("addNote");
let list = document.getElementById("list");

let notes = [];

function loadNotes() {
  list.innerHTML = "";
  notes.forEach((note, idx) => {
    const div = document.createElement("div");
    div.className = "divNote";
    div.setAttribute("data-index", idx);

    const input = document.createElement("input");
    input.type = "text";
    input.className = "noteInput";
    input.placeholder = "Enter Your Note...";
    input.value = note.note;
    input.disabled = true;
    input.style.maxWidth = "200px";

    const buttonsContainer = document.createElement("div");
    buttonsContainer.className = "buttonsContainer";

    const editButton = document.createElement("button");
    editButton.className = "editNote";
    editButton.innerHTML = `<a href="#"><span><i class="fa fa-pencil-alt"></i></span></a>`;

    const deleteButton = document.createElement("button");
    deleteButton.className = "deleteNote";
    deleteButton.innerHTML = `<a href="#"><span><i class="fa fa-trash"></i></span></a>`;
    deleteButton.addEventListener("click", () => {
      deleteNoteAtIndexWithAnimation(idx, div);
    });

    editButton.addEventListener("click", () => {
      const dataIndex = div.getAttribute("data-index");
      const inputField = div.querySelector(".noteInput");

      // Enable input field for editing
      inputField.disabled = false;

      // Add a "Save" button to save changes
      const saveButton = document.createElement("button");
      saveButton.className = "saveNote";
      saveButton.innerHTML = `<a href="#"><span><i class="fa fa-save"></i></span></a>`;
      saveButton.addEventListener("click", () => {
        // Save changes when the "Save" button is clicked
        const updatedNote = inputField.value;
        saveEditedNoteAtIdx(dataIndex, updatedNote);
      });

      // Replace editButton with saveButton
      buttonsContainer.replaceChild(saveButton, editButton);
    });

    buttonsContainer.appendChild(editButton);
    buttonsContainer.appendChild(deleteButton);

    div.appendChild(input);
    div.appendChild(buttonsContainer);

    list.appendChild(div);

    // Trigger the sliding animation for newly created note
    const isLastNote = idx === notes.length - 1;

    // Apply animation only to the last note element
    if (isLastNote) {
      div.style.animation = "slideIn 0.5s";
    }
  });
}

function deleteNoteAtIndexWithAnimation(index, noteDiv) {
  // Trigger the sliding animation for the note being deleted
  noteDiv.style.animation = "slideOut 0.5s";

  // Wait for the animation to complete before removing the note
  setTimeout(() => {
    notes.splice(index, 1);
    loadNotes();
    ipcRenderer.send("delete_note", index);
  }, 500); // Adjust the timeout to match the animation duration
}



window.onload = async () => {
  notes = await ipcRenderer.invoke("get_data");
  loadNotes();

  const deleteAllBtn = document.getElementById("deleteAllNotes");
  deleteAllBtn.addEventListener("click", () => {
    // Remove all notes from the UI
    list.innerHTML = "";
    
    // Delete all notes from the database
    ipcRenderer.send("delete_all_notes");
    
    // Clear the 'notes' array
    notes = [];
  });
};


function saveEditedNoteAtIdx(index, updatedNote) {
  // Update notes array
  notes[index].note = updatedNote;
  loadNotes();

  // Send the updated note to the main process to update the database
  ipcRenderer.send("edit_note", { index, note: updatedNote });
}


btn.onclick = () => {
  if (note.value.trim() !== "") {
    let _note = {
      note: note.value,
    };

    notes.push(_note);
    loadNotes();
    ipcRenderer.send("save_note", _note);

    note.value = ""; 

    document.getElementById("notesContainer").scrollTop = document.getElementById("notesContainer").scrollHeight;
  } else {
    window.alert("Please enter a note before adding.");
  }
};

