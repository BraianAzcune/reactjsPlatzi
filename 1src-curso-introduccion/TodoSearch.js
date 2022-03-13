import "./App.css"
import { useContext } from "react";
import { TodoContext } from "./TodoContext";


export function TodoSearch() {

  const { searchValue, setSearchValue } = useContext(TodoContext);

  const buscar = (event) => {
    setSearchValue(event.target.value);
  }
  return (
    <div className="todo_search_container">
      <input
        value={searchValue}
        onChange={buscar}
        className="todo_search" type='text' placeholder='Buscar' />
    </div>
  )
}