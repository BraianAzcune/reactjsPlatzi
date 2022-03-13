import React from 'react'
import { useStorageListener } from './useStorageListener';
import './ChangeAlert.css';

function ChangeAlert({ storageName, recargarTodos }) {
  const { show, refresh } = useStorageListener(storageName, recargarTodos);
  const [executeAnimation, setExecuteAnimation] = React.useState(false);

  if (show) {
    return (
      <div className='ChangeAlert'>
        <div className={'block-cursor' + (executeAnimation ? ' block-cursor-fade' : '')}></div>
        <div className={'ChangeAlert-container' + (executeAnimation ? ' ChangeAlert-container-down' : '')}
          onAnimationEnd={() => { setExecuteAnimation(false); refresh(); }}>
          <h2>Cambios Detectados!</h2>
          <p>se detectaron cambio en los <strong>TODOs</strong> en otra pestaña</p>
          <p>se necesita Sincronizar</p>
          <button onClick={() => setExecuteAnimation(true)}>Sincronizar</button>
        </div>
      </div >
    );
  }
  return null;


}
//para evitar cambiar el nombre en el App/index.js
const ChangeAlertWithStorageListener = ChangeAlert;

export { ChangeAlertWithStorageListener };