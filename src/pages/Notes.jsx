/* eslint-disable no-fallthrough */
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { BsPlusLg } from "react-icons/bs";
import { Link } from "react-router-dom";
// import { v4 as uuidv4 } from "uuid";


export const ACTIONS = {
  ADD_NOTE: "add-note",
  EDIT_NOTE: "edit-note",
  DELETE_NOTE: "delete-note",
  SET_NOTES: "set-notes",
};

export function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_NOTE:
      return {
        notes: [...state.notes, action.payload],
      };
    case ACTIONS.EDIT_NOTE:
      return {
        notes: state.notes.map((note) =>
          note.id === action.payload.id ? action.payload : note
      ),
    };
    case ACTIONS.DELETE_NOTE:
      return {
        notes: state.notes.filter((note) => note.id !== action.payload.id),
      };
      case ACTIONS.SET_NOTES:
        return {
          ...state,
          notes: action.payload,
        }
        default:
          return state;
        }
      }
      
const Notes = ({ state }) => {
  
  const [text, setText] = useState('');
  const [bar, setBar] = useState(false);
  const [filteredNotes, setFilteredNotes] = useState(state.notes);

  const barToggler = () => {
    setBar(!bar)
  }

  const searchHandler = () => {
    // eslint-disable-next-line array-callback-return
    setFilteredNotes(notes.filter(note => {
      if(note.title.toLowerCase().match(text.toLocaleLowerCase())) {
        return note;
      }
    }))
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(searchHandler, [text]);

  const notes = state.notes || [];
  
  return (
    <div className="App">
      <div className="notes-container">
        <div className="header">
          {!bar && <h1 className="heading">My Notes</h1>}
          {bar && <input
            id="search-bar"
            autoFocus
            type="text"
            placeholder="Search..."
            value={text}
            onChange={(e) => {setText(e.target.value); searchHandler();}}
          />}
          <CiSearch className="icon" onClick={barToggler} />
        </div>
        <div className="notes">
          {filteredNotes.map((note) => (
            <Link
              className="note"
              key={note.id}
              to={`edit-note/${note.id}`}
              //the line below propably need to be deleted
              state={{ note }}
            >
              <div>
                <h2>{note.title || "untitled"}</h2>
                <p>
                  {note.content.length < 100
                    ? note.content
                    : note.content.slice(0, 100) + "..."}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <Link to="/new-note">
          <BsPlusLg className="icon add" />
        </Link>
      </div>
    </div>
  );
};

export default Notes;
