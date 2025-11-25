const MOCK_TASKS = [
  {
    id: 1,
    header: `Lorem ipsum dolor sit amet.`,
    content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero,
aperiam. Reiciendis, quis possimus? Aspernatur modi dolorum
vitae minima molestiae quo totam maiores nemo cumque est
perspiciatis, neque doloremque perferendis ipsa tempora magni
`,
    color: "Yellow",
    isFavorite: false,
  },
  {
    id: 2,
    header: `Lorem ipsum dolor sit amet.`,
    content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero,
aperiam. Reiciendis, quis possimus? Aspernatur modi dolorum
vitae minima molestiae quo totam maiores nemo cumque est
perspiciatis, neque doloremque perferendis ipsa tempora magni
`,
    color: "Yellow",
    isFavorite: false,
  },
  {
    id: 3,
    header: `favorite`,
    content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero,
aperiam. Reiciendis, quis possimus? Aspernatur modi dolorum
vitae minima molestiae quo totam maiores nemo cumque est
perspiciatis, neque doloremque perferendis ipsa tempora magni
`,
    color: "Yellow",
    isFavorite: true,
  },
  {
    id: 4,
    header: `favorite`,
    content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero,
aperiam. Reiciendis, quis possimus? Aspernatur modi dolorum
vitae minima molestiae quo totam maiores nemo cumque est
perspiciatis, neque doloremque perferendis ipsa tempora magni
`,
    color: "Yellow",
    isFavorite: true,
  },
];
const model = {
  notes: MOCK_TASKS,
  addNote(header, content, color) {
    view.noNotes.classList.add("hidden");
    view.tasksCheckbox.classList.remove("hidden");
    newNote = {
      id: new Date().getTime(),
      header: header,
      content: content,
      isFavorite: false,
    };
    switch (color.value) {
      case "rgb(243, 219, 125)":
        newNote.color = "Yellow";
        break;
      case "rgb(194, 243, 125)":
        newNote.color = "Green";
        break;
      case "rgb(125, 225, 243)":
        newNote.color = "Blue";
        break;
      case "rgb(243, 125, 125)":
        newNote.color = "Pink";
        break;
      case "rgb(231, 125, 243)":
        newNote.color = "Purple";
        break;
    }
    this.notes = [...this.notes, newNote];
    view.textarea.value = "";
    view.input.value = "";
    for (const input of view.colorsRadio) {
      input.checked = false;
    }
    document.querySelector(".confirmedCreation").classList.toggle("visible");
    document.getElementById("addButton").disabled = true;
    setTimeout(() => {
      document.querySelector(".confirmedCreation").classList.toggle("visible");
      document.getElementById("addButton").disabled = false;
    }, 3000);
    view.renderNotes(this.notes);
  },
  deleteNote(id) {
    newNotes = this.notes.filter((a) => {
      return a.id !== id;
    });
    this.notes = newNotes;
    view.renderNotes(this.notes);
  },
  onlyFavorite() {
    document
      .getElementById("tasksList")
      .querySelectorAll("li")
      .forEach((el) => {
        if (!el.classList.contains("isFavoritetrue")) {
          el.classList.add("hidden");
        }

        view.renderNotes(this.notes);
      });
  },
  changeStatus(id) {
    newNotes = JSON.parse(JSON.stringify(this.notes));
    newNotes.map((e) => {
      if (e.id === id) {
        e.isFavorite = !e.isFavorite;
      }
    });
    this.notes = newNotes;

    view.renderNotes(this.notes);
  },
};
const view = {
  input: document.getElementById("noteName"),
  textarea: document.getElementById("note"),
  addButton: document.getElementById("addButton"),
  taskContent: document.getElementById("taskContent"),
  notesList: document.getElementById("tasksList"),
  colorsRadio: document.getElementById("colorButtons"),
  favorite: document.getElementById("favoritesCheckbox"),
  favoriteNotesCounter: document.getElementById("favoriteNotesCounter"),
  notesCounter: document.getElementById("notesCounter"),
  wrongHeader: document.querySelector(".tooLongHeader"),
  wrongHeaderNoteContent: document.querySelector(".tooLongNote"),
  colorNotCosen: document.querySelector(".chooseColor"),
  noFavoriteNotes: document.querySelector(".noFavoriteNotes"),
  noNotes: document.querySelector(".noNotes"),
  tasksCheckbox: document.querySelector(".tasksCheckbox"),
  showLabel(someLabel) {
    someLabel.classList.toggle("visible");
    document.getElementById("addButton").disabled = true;
    setTimeout(() => {
      someLabel.classList.toggle("visible");
      document.getElementById("addButton").disabled = false;
    }, 3000);
  },
  renderNotes(notes) {
    this.notesList.innerHTML = "";

    notes.forEach((note) => {
      const noteItem = document.createElement("li");
      noteItem.classList.add(`isFavorite${note.isFavorite}`);

      noteItem.innerHTML = `<div class="taskHeader taskHeaderBackgroundColor${note.color} " id = "${note.id}">
        <span >${note.header}</span>
        <button class='favorite Favorite${note.isFavorite}'>
        
        </button>
        <button class ='deleteButton' id = 'deleteButton'><img src="./accets/img/trash.svg" alt="trashCane" /></button>
        </div>
        <p>${note.content}</p>`;
      this.notesList.prepend(noteItem);

      if (
        noteItem.classList.contains(`isFavoritefalse`) &&
        this.favorite.checked
      ) {
        noteItem.classList.add("hidden");
      }
    });
    this.notesCounter.innerHTML = `Всего заметок: <b>${model.notes.length}</b>`;
    this.favoriteNotesCounter.innerHTML = `Избранных заметок: <b>${
      model.notes.filter((e) => {
        return e.isFavorite === true;
      }).length
    }</b>`;

    if (
      +this.favoriteNotesCounter.querySelector("b").innerHTML === 0 &&
      this.favorite.checked
    ) {
      this.noFavoriteNotes.innerHTML = `<p> У вас нет еще ни одной избранной заметки</p> 
      <p>Добавьте свою первую заметку в избранное</p>`;
    }
    if (!this.notesList.hasChildNodes()) {
      this.noNotes.classList.remove("hidden");
      this.tasksCheckbox.classList.add("hidden");
    }
  },
  init() {
    this.favorite.addEventListener("change", (event) => {
      let checkbox = event.target;
      controller.isFavorite(checkbox);
    });
    this.addButton.addEventListener("click", (event) => {
      event.preventDefault();
      let header = this.input.value.toString();
      let content = this.textarea.value.toString();
      let color = this.colorsRadio.querySelector(":checked");

      controller.addNote(header, content, color);
    });
    this.taskContent.addEventListener("click", (event) => {
      const clickedButton = event.target.closest(".deleteButton");
      // event.stopPropagation;
      if (clickedButton) {
        let id = +clickedButton.closest(".taskHeader").id;
        controller.deleteNote(id);
        this.renderNotes(model.notes);
      }
    });
    this.taskContent.addEventListener("click", (event) => {
      const clickedButton = event.target;
      if (clickedButton.classList.contains("favorite")) {
        let id = +clickedButton.closest(".taskHeader").id;
        model.changeStatus(id);
      }
    });

    this.renderNotes(model.notes);
  },
};

const controller = {
  addNote(header, content, color) {
    if (
      header &&
      header.trim() !== 0 &&
      header.length <= 50 &&
      content &&
      content.trim() !== 0 &&
      content.length <= 300 &&
      color
    ) {
      model.addNote(header, content, color);
    } else if (header.length > 50 || header.length < 1) {
      view.showLabel(view.wrongHeader);
    } else if (content.length > 300 || content.length < 1) {
      view.showLabel(view.wrongHeaderNoteContent);
    } else if (color === null) {
      view.showLabel(view.colorNotCosen);
    }
  },
  deleteNote(id) {
    const confirmed = confirm("are you sure that u want to delete note?");
    if (confirmed) {
      model.deleteNote(id);
    }
  },
  isFavorite(checkbox) {
    if (checkbox.checked) {
      model.onlyFavorite();
    } else if (!checkbox.checked) {
      view.noFavoriteNotes.innerHTML = "";
      view.renderNotes(model.notes);
    }
  },
};

view.init();
