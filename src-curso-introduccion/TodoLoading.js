import './TodoItem.css';
import './TodoLoading.css';

export function TodoLoading({ loading }) {
  if (!loading) {
    return null;
  }
  //todo: esto debe mostrar una estrucutra de esquelo para cargar
  return (
    <li className="LoadingTodoItem">
      <div className='effect-bar'></div>
      <div className={"LoadingTodoItem-p "}>

      </div>

    </li>
  )
}