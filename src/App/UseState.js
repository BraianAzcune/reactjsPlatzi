import React from 'react'

const SECURITY_CODE = 'asd';

export function UseState({ name }) {
  //imitamos el funcionamiento de un React.Component
  const [state, setState] = React.useState({
    error: false,
    loading: false,
    value: ''
  });

  React.useEffect(() => {
    if (state.loading) {
      setTimeout(() => {
        setState({ ...state, loading: false, error: state.value === SECURITY_CODE ? false : true });
        ;
      }, 1000);
    }
  }, [state.loading]);

  return (
    <div>
      <h2>Eliminar UseState</h2>
      <p>{name}</p>
      {
        (state.error && !state.loading) && <p>Error en el codigo de seguridad</p>
      }
      {
        state.loading && <p>Cargando...</p>
      }
      <p>Por favor escribe el codigo de seguridad</p>
      <input
        value={state.value}
        onChange={(event) => {
          setState({ ...state, value: event.target.value });
        }} placeholder='Codigo de seguridad'></input>
      <button
        disabled={state.loading}
        onClick={() => { setState({ ...state, loading: true }); }}>
        Comprobar</button>
    </div>
  );
}