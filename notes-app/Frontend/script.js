document.addEventListener("DOMContentLoaded", () => {
  const noteForm = document.getElementById("noteForm");
  const titleInput = document.getElementById("title");
  const contentInput = document.getElementById("content");
  const notesList = document.getElementById("notesList");

  if (!noteForm || !titleInput || !contentInput || !notesList) {
    console.error("Some DOM elements not found! Check your HTML IDs.");
    return;
  }

const API_URL = "https://backend-e5um.onrender.com/api/notes";

  // -------- Fetch all notes --------
  async function fetchNotes() {
    notesList.innerHTML = "Loading...";
    try {
      const res = await fetch(API_URL);
      const notes = await res.json();
      console.log("Fetched notes:", notes);
     displayNotes(notes)
    } catch (err) {
      notesList.innerHTML = "Error fetching notes";
      console.error("Fetch notes error:", err);
    }
  }

  // -------- Display notes on UI --------
  function displayNotes(notes) {
    if (!notes || notes.length === 0) {
      notesList.innerHTML = "<p>No notes yet.</p>";
      return;
    }

    notesList.innerHTML = "";
    notes.forEach(note => {
      const noteDiv = document.createElement("div");
      noteDiv.className = "note";

      noteDiv.innerHTML = `
        <h3>${note.title}</h3>
        <p>${note.content}</p>
        <button onclick="deleteNote('${note._id}')">Delete</button>
      `;

      notesList.appendChild(noteDiv);
    });
  }

  // -------- Add new note --------
  noteForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const newNote = {
      title: titleInput.value.trim(),
      content: contentInput.value.trim()
    };

    if (!newNote.title || !newNote.content) return;

    console.log("Sending note:", newNote);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNote)
      });

      const data = await res.json();
      console.log("Response from server:", data);

      titleInput.value = "";
      contentInput.value = "";
      fetchNotes();
    } catch (err) {
      console.error("POST request error:", err);
    }
  });

  // -------- Delete note --------
  async function deleteNote(id) {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      const data = await res.json();
      console.log("Delete response:", data);
      fetchNotes();
    } catch (err) {
      console.error("Delete request error:", err);
    }
  }

  
  window.deleteNote = deleteNote;

  // -------- Initialize --------
  fetchNotes();
});
