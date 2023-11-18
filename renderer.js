let { ipcRenderer } = require("electron");

let title = document.getElementById("title");
let note = document.getElementById("note");
let btn = document.getElementById("addNote");
let list = document.getElementById("list");

let notes = [];

// ... (existing code remains the same)

function loadNotes() {
  list.innerHTML = "";
  notes.forEach((note, idx) => {
    list.innerHTML += `
      <div class="divNote" data-index="${idx}">
        <input type="text" class="noteInput" placeholder="Enter Your Note..." value="${idx}- ${note.note}">
        <div class="buttonsContainer">
          <button class="editNote"><a href="#"><span><i class="fa fa-pencil-alt"></i></span></a></button>
          <button class="deleteNote"><a href="#"><span><i class="fa fa-trash"></i></span></a></button>
        </div>
      </div>`;
  });

  // Add event listeners for delete buttons
  let deleteButtons = document.getElementsByClassName("deleteNote");
  Array.from(deleteButtons).forEach((button) => {
    button.addEventListener("click", (event) => {
      
      const divNote = event.target.closest(".divNote");
      const index = divNote.getAttribute("data-index");

      // Remove the divNote from the DOM
      divNote.remove();

      // Remove the corresponding note from the 'notes' array
      notes.splice(index, 1);

      // Re-render the notes after deletion
      loadNotes();
    });
  });
}

// ... (existing code remains the same)


window.onload = async () => {
  notes = await ipcRenderer.invoke("get_data");
  loadNotes();
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