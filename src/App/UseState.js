import React from 'react'


export function UseState({ name }) {
  const [error, setError] = React.useState(true);
  return (
    <div>
      <h2>Eliminar UseState</h2>
      <p>{name}</p>
      {
        error && <p>Error en el codigo de seguridad</p>
      }
      <p>Por favor escribe el codigo de seguridad</p>
      <input placeholder='Codigo de seguridad'></input>
      <button
        onClick={() => { setError(!error) }}
      >Comprobar</button>
    </div>
  );
}