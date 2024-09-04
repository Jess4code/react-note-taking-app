import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import { ACTIONS } from "./Notes";


const EditNote = ({ state, dispatch }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const noteToEdit = state.notes.find(note => note.id === id);

  const [editedNote, setEditedNote] = useState(noteToEdit);

  const handleSave = () => {
    dispatch({ type: ACTIONS.EDIT_NOTE, payload: editedNote });
    navigate('/');
  };

  const handleDelete = () => {
    dispatch({ type: ACTIONS.DELETE_NOTE, payload: { id: noteToEdit.id } });
    navigate('/');
  };

  return (
    <div className="App">
      <div className="edit-note">
        <div className="header">
          <Link to="/">
            <IoIosArrowBack className="icon" />
          </Link>
          <h1 className="heading">Edit : </h1>
          <FaRegTrashCan className="danger" onClick={handleDelete} />
        </div>
        <hr />
        <div className="editing-content">
          <form onSubmit={e => e.preventDefault()} action="" method="get">
            <input
              id="new-note-title"
              type="text"
              placeholder="Title"
              value={editedNote.title}
              onChange={e => setEditedNote({...editedNote, title: e.target.value})}
            />
            <textarea
              rows={22}
              id="new-note-desc"
              placeholder="Note description"
              value={editedNote.content}
              onChange={e => setEditedNote({...editedNote, content: e.target.value})}
            ></textarea>
          </form>
          <button className="save-btn" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditNote;
