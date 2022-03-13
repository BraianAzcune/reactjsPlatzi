import './CreateTodoBtn.css';

export function CreateTodoBtn({ abrirModal }) {
  return (
    <button
      onClick={abrirModal}
      className="CreateTodoButton">+</button>
  )
}