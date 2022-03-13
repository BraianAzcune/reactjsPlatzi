import { FcOk, FcCancel } from "react-icons/fc";
import { TodoIcon } from "./TodoIcon";
import "./TodoItem.css";
export function TodoItem(props) {
  // TODO: no se debe mostrar el boton check, si la tarea ya esta completada
  return (
    <li className="TodoItem">
      {/* <span
        onClick={props.onComplete}
        className={`Icon Icon-check ${props.completed && 'Icon-check--active'}`}>
        √
      </span> */}
      <TodoIcon
        iconClass={`Icon Icon-check ${props.completed && "Icon-check--active"}`}
        onClick={props.onComplete}
      >
        <FcOk />
      </TodoIcon>
      <p className={`TodoItem-p ${props.completed && "TodoItem-p--complete"}`}>
        {props.text}
      </p>
      <TodoIcon
        iconClass={"Icon Icon-delete"}
        onClick={props.onDelete}
      ><FcCancel /></TodoIcon>
      {/* <span onClick={props.onDelete} className="Icon Icon-delete">
        X
      </span> */}
    </li>
  );
}
