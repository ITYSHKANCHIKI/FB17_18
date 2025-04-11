import React, { useState, useEffect } from "react";
const App = () => {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });
  // Сохраняем в localStorage при каждом изменении notes
  useEffect(() => {
    console.log("Сохраняем:", notes);
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);
  const addNote = () => {
    if (note.trim()) {
      setNotes([...notes, note.trim()]);
      setNote("");
    }
  };
  const deleteNote = (index) => {
    const updated = notes.filter((_, i) => i !== index);
    setNotes(updated);
  };
  return (
    <div className="notes-app">
      <h1>Мои заметки</h1>
      <input
        type="text"
        className="note-input"
        placeholder="Введите заметку"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <button className="add-button" onClick={addNote}>
        Добавить
      </button>
      <ul className="notes-list">
        {notes.map((n, index) => (
          <li key={index} className="note-item">
            {n}
            <button className="delete-button" onClick={() => deleteNote(index)}>
              Выполнено
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default App;
