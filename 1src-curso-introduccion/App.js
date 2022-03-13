// import logo from './logo.svg';
import { useContext } from 'react';
import './App.css';
import { TodoCounter } from "./TodoCounter";
import { TodoSearch } from './TodoSearch';
import { TodoList } from './TodoList';
import { TodoItem } from './TodoItem';
import { CreateTodoBtn } from './CreateTodoBtn';
import { TodoContext } from './TodoContext';
import { Modal } from './Modal';
import { TodoForm } from './TodoForm';
import { TodoError } from './TodoError';
import { TodoLoading } from './TodoLoading';
import { TodoNoTodos } from './TodoNoTodos';
import { TodoCounterLoading } from './TodoCounterLoading';

function App() {

  const {
    loading,
    error,
    todosRender,
    completeTodo,
    deleteTodo,
    openModal,
    setOpenModal,
  } = useContext(TodoContext);



  //TODO: hacer animacion de desaparecer a los todo que no machean en la busqueda
  return (
    <div className='container_app'>
      <div className='app'>
        <TodoCounter loading={loading}><TodoCounterLoading></TodoCounterLoading></TodoCounter>
        <TodoSearch></TodoSearch>
        <TodoList>
          <TodoError error={error}></TodoError>
          <TodoLoading loading={loading}></TodoLoading>
          <TodoNoTodos loading={loading} cantidadTodos={todosRender.length}></TodoNoTodos>
          {
            todosRender.map(todo => (<TodoItem onDelete={() => deleteTodo(todo.text)} onComplete={() => completeTodo(todo.text)} key={todo.text} text={todo.text} completed={todo.isCompleted}></TodoItem>))
          }
        </TodoList>
        <CreateTodoBtn abrirModal={() => setOpenModal(!openModal)}></CreateTodoBtn>
        {openModal &&
          <Modal>
            <TodoForm></TodoForm>
          </Modal>
        }
      </div>
      <div className='internal_todo'>
        <ul>
          <li>
            El click derecho del buscar debe borra lo escrito
          </li>
          <li>
            cuando se completa una tarea, debe tacharse y bajar al fondo de  forma animada
          </li>
        </ul>
      </div>
    </div>
  );
}

export default App;
