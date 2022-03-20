import React from 'react'

const SECURITY_CODE = 'asd';

export function UseState({ name }) {
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
        value === SECURITY_CODE ? setError(false) : setError(true);
      }, 1000);
    }
  }, [loading]);

  return (
    <div>
      <h2>Eliminar UseState</h2>
      <p>{name}</p>
      {
        (error && !loading) && <p>Error en el codigo de seguridad</p>
      }
      {
        loading && <p>Cargando...</p>
      }
      <p>Por favor escribe el codigo de seguridad</p>
      <input
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }} placeholder='Codigo de seguridad'></input>
      <button
        disabled={loading}
        onClick={() => { setLoading(true) }}
      >Comprobar</button>
    </div>
  );
}