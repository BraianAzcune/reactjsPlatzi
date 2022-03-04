import React from "react";

import { TodoList } from "../TodoList";
import { TodoItem } from "../TodoItem";
import { TodosError } from "../TodosError";
import { TodosLoading } from "../TodosLoading";
import { EmptyTodos } from "../EmptyTodos";
import { TodoForm } from "../TodoForm";
import { CreateTodoButton } from "../CreateTodoButton";
import { Modal } from "../Modal";
import { TodoHeader } from "../TodoHeader";
import { TodoCounter } from "../TodoCounter";
import { TodoSearch } from "../TodoSearch";
import { useTodos } from "./useTodos";

function App() {
  const {
    error,
    loading,
    searchedTodos,
    completeTodo,
    deleteTodo,
    openModal,
    setOpenModal,
    totalTodos,
    completedTodos,
    searchValue,
    setSearchValue,
    addTodo,
  } = useTodos();

  return (
    <React.Fragment>
      <TodoHeader loading={loading}>
        <TodoCounter

          totalTodos={totalTodos}
          completedTodos={completedTodos}></TodoCounter>
        <TodoSearch

          searchValue={searchValue}
          setSearchValue={setSearchValue}></TodoSearch>
      </TodoHeader>
      <TodoList
        error={error}
        loading={loading}
        searchedTodos={searchedTodos}
        totalTodos={totalTodos}
        searchValue={searchValue}

        onError={() => <TodosError />}
        onLoading={() => <TodosLoading />}
        onEmpty={() => <EmptyTodos />}
        onEmptySearchResult={(searchText) => <p>no hay resultado para {searchText}</p>}
      // render={(todo) => {
      //   return (
      //     <TodoItem
      //       key={todo.text}
      //       text={todo.text}
      //       completed={todo.completed}
      //       onComplete={() => completeTodo(todo.text)}
      //       onDelete={() => deleteTodo(todo.text)}
      //     />
      //   );
      // }}
      >
        {(todo) => {
          return (
            <TodoItem
              key={todo.text}
              text={todo.text}
              completed={todo.completed}
              onComplete={() => completeTodo(todo.text)}
              onDelete={() => deleteTodo(todo.text)}
            />
          );
        }}
      </TodoList>
      {
        !!openModal && (
          <Modal>
            <TodoForm addTodo={addTodo} setOpenModal={setOpenModal} />
          </Modal>
        )
      }

      <CreateTodoButton setOpenModal={setOpenModal} />
    </React.Fragment >
  );
}

export default App;
