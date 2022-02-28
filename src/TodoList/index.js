import React from 'react';
import './TodoList.css'

function TodoList({ error, onError, loading, onLoading, onEmpty, searchedTodos, render }) {
  return (
    <section className='TodoList-container'>
      {error && onError()}
      {loading && onLoading()}
      {!loading && !searchedTodos.length && onEmpty()}
      <ul>
        {searchedTodos.map(render)}
      </ul>
    </section>
  );
}

export { TodoList };
