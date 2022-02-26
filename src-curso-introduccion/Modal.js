import ReactDOM from "react-dom";
import React from 'react';

//todo: el modal debe mostrarse con efecto fade
import './Modal.css';

export function Modal(props) {
  return ReactDOM.createPortal(
    <div className="ModalBackground">{props.children}</div>,
    document.getElementById('modal')
  );
}