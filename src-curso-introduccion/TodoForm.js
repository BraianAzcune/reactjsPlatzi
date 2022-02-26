import React from 'react';
import { TodoContext } from './TodoContext';
import './TodoForm.css';

export function TodoForm() {

  const {
    addTodo,
    setOpenModal
  } = React.useContext(TodoContext);

  function onCancel(e) {
    e.preventDefault();
    setOpenModal(false);
  }

  function onSubmit(e) {
    e.preventDefault();
    addTodo(textarea);
    setOpenModal(false);
  }

  const [textarea, setTextArea] = React.useState('');
  const onChange = (e) => {
    setTextArea(e.target.value);
  }

  return (
    <form onSubmit={onSubmit}>
      <label>Escriba su todo</label>
      <textarea value={textarea} onChange={onChange} ></textarea>
      <div className="TodoForm-buttonContainer">
        <button className="TodoForm-button TodoForm-button-cancel" onClick={onCancel}>Cancelar</button>
        <button className="TodoForm-button TodoForm-button-add" type='submit'>Añadir</button>
      </div>
    </form>
  )
}