import React from 'react';
import './TodoList.css'

function TodoList({ children, error, onError, loading, onLoading, onEmpty, searchedTodos, totalTodos, onEmptySearchResult, searchValue, render }) {


  return (
    <section className='TodoList-container'>
      {error && onError()}
      {loading && onLoading()}
      {!loading && !totalTodos && onEmpty()}
      {(!!totalTodos && !searchedTodos.length) && onEmptySearchResult(searchValue)}
      <ul>
        {searchedTodos.map(render || children)}
      </ul>
    </section>
  );
}

export { TodoList };
