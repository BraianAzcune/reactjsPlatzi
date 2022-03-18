import React from 'react'


export function UseState({ name }) {
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (loading) {

      setTimeout(() => {
        setLoading(false);
        setError(true);
      }, 2000);
    }
  }, [loading]);

  return (
    <div>
      <h2>Eliminar UseState</h2>
      <p>{name}</p>
      {
        error && <p>Error en el codigo de seguridad</p>
      }
      {
        loading && <p>Cargando...</p>
      }
      <p>Por favor escribe el codigo de seguridad</p>
      <input placeholder='Codigo de seguridad'></input>
      <button
        onClick={() => { setLoading(true); setError(false); }}
      >Comprobar</button>
    </div>
  );
}