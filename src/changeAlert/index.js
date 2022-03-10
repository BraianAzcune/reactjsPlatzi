import React from 'react'
import { withStorageListener } from './HOC_withStorageListener';


function ChangeAlert({ show, toggleShow, refresh }) {
  if (show) {
    return (
      <div>
        <h2>Hubo cambios en la base de datos</h2>
        <button onClick={() => { toggleShow(false); refresh(); }}>re-cargar</button>
      </div>
    );
  }
  return null;
}

const ChangeAlertWithStorageListener = withStorageListener(ChangeAlert);


export { ChangeAlertWithStorageListener };