import React from "react";
import { useContext } from "react";
import { TodoContext } from "./TodoContext";

export function TodoCounter({ loading, children }) {

  const { todoLength, cantCompletedTodo } = useContext(TodoContext);
  if (loading) {
    return (
      <React.Fragment>
        {children}
      </React.Fragment>
    );
  }


  if (todoLength === 0) {
    return (
      <h2 className="counter">No hay To-do</h2>
    );
  }

  if (cantCompletedTodo === todoLength) {
    return (
      <h2 className="counter">Tienes todos los to-do completos </h2>
    );
  }

  return (
    <h2 className="counter">Has completado {cantCompletedTodo} de {todoLength} TO-Do</h2>
  )
}