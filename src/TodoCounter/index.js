import React from 'react';
import classNames from 'classnames';
import './TodoCounter.css';

function TodoCounter({ totalTodos, completedTodos, loading }) {
  const counterClass = classNames(
    "TodoCounter",
    {
      "TodoCounter--loading": loading,
    }
  )
  return (
    <h2 className={counterClass}>Has completado {completedTodos} de {totalTodos} TODOs</h2>
  );
}

export { TodoCounter };
