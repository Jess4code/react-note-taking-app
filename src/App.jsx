import React, { useEffect, useReducer } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Notes, { reducer } from "./pages/Notes";
import NewNote from "./pages/NewNote";
import EditNote from "./pages/EditNote";

const initialState = {
  notes: JSON.parse(localStorage.getItem('notes')) || []
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
  localStorage.setItem('notes', JSON.stringify(state.notes));    
  }, [state.notes]);
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Notes state={state} dispatch={dispatch} />} />
        <Route path="/new-note" element={<NewNote dispatch={dispatch} />} />
        <Route path="/edit-note/:id" element={<EditNote state={state} dispatch={dispatch} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
