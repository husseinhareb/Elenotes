let { ipcRenderer } = require("electron");

let title = document.getElementById("title");
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
    input.value = `${idx}- ${note.note}`;

    const buttonsContainer = document.createElement("div");
    buttonsContainer.className = "buttonsContainer";

    const editButton = document.createElement("button");
    editButton.className = "editNote";
    editButton.innerHTML = `<a href="#"><span><i class="fa fa-pencil-alt"></i></span></a>`;

    const deleteButton = document.createElement("button");
    deleteButton.className = "deleteNote";
    deleteButton.innerHTML = `<a href="#"><span><i class="fa fa-trash"></i></span></a>`;
    deleteButton.addEventListener("click", () => {
      deleteNoteAtIndex(idx);
    });

    buttonsContainer.appendChild(editButton);
    buttonsContainer.appendChild(deleteButton);

    div.appendChild(input);
    div.appendChild(buttonsContainer);

    list.appendChild(div);
  });
}

function deleteNoteAtIndex(index) {
  notes.splice(index, 1);
  loadNotes();
  ipcRenderer.send("delete_note", index);
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


btn.onclick = () => {
  if (title !== "" && note !== "") {
    let _note = {
      note: note.value,
    };

    notes.push(_note);
    loadNotes();

    ipcRenderer.send("save_note", _note);
  } else {
    window.alert("please fill all the things and try again");
  }
};