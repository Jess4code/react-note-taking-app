import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { ACTIONS } from "./Notes";
import { v4 as uuidv4 } from "uuid";

const NewNote = ({ dispatch }) => {
  const [note, setNote] = useState({ title: "", content: "" });
  const navigate = useNavigate();

  const handleSave = () => {
    if(note.title.trim() !== "" && note.content.trim() !== "") {
      const newNote = { ...note, id: uuidv4() };
      dispatch({ type: ACTIONS.ADD_NOTE, payload: newNote });
    }
    navigate("/");
  };

  return (
    <div className="App">
      <div className="new-note">
        <div className="add-header">
          <Link to="/">
            <IoIosArrowBack className="icon" />
          </Link>
          <button className="save-btn" onClick={handleSave}>Save</button>
        </div>
        <form onSubmit={(e) => {e.preventDefault()}}>
          <input
            id="new-note-title"
            type="text"
            placeholder="Title"
            value={note.title}
            onChange={(e) => setNote({ ...note, title: e.target.value })}
          />
          <textarea
            rows={22}
            id="new-note-desc"
            placeholder="Note description"
            value={note.content}
            onChange={(e) => setNote({ ...note, content: e.target.value })}
          />
        </form>
      </div>
    </div>
  );
};

export default NewNote;
