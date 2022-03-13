import { createContext, useState } from "react";
import { useLocalStorage } from './useLocalStorage';


export const TodoContext = createContext();


export function TodoProvider(props) {

  const { item: todos, saveItem: saveTodos, loading, error } = useLocalStorage('todos@v1');

  const [searchValue, setSearchValue] = useState('');


  const [openModal, setOpenModal] = useState(false);

  const completeTodo = (text) => {
    const index = todos.findIndex(todo => todo.text === text);
    todos[index].isCompleted = true;
    saveTodos([...todos]);
  }
  const deleteTodo = (text) => {
    const index = todos.findIndex(todo => todo.text === text);
    todos.splice(index, 1);
    saveTodos([...todos]);
  }

  const addTodo = (text) => {
    const todo = {
      text,
      isCompleted: false
    }
    saveTodos([todo, ...todos]);
  }


  const cantCompletedTodo = todos.reduce((count, todo) => todo.isCompleted ? count + 1 : count, 0);
  const todoLength = todos.length;

  let todosRender = null;

  if (searchValue.length > 2) {
    todosRender = todos.filter(todo => todo.text.toLowerCase().includes(searchValue.toLowerCase()));
  } else {
    todosRender = todos;
  }

  return (
    <TodoContext.Provider value={{
      loading,
      error,
      todoLength,
      cantCompletedTodo,
      searchValue,
      setSearchValue,
      todosRender,
      completeTodo,
      deleteTodo,
      openModal,
      setOpenModal,
      addTodo
    }}>
      {props.children}
    </TodoContext.Provider>
  );

}