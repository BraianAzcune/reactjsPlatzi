import React from 'react'

const SECURITY_CODE = 'asd';

export function UseState({ name }) {
  //imitamos el funcionamiento de un React.Component
  const [state, setState] = React.useState({
    error: false,
    loading: false,
    value: '',
    deleted: false,
    confirmed: false
  });

  React.useEffect(() => {
    if (state.loading) {
      setTimeout(() => {
        const correct_password = state.value === SECURITY_CODE ? true : false;
        setState({
          ...state,
          value: '',
          loading: false,
          error: !correct_password,
          confirmed: correct_password,
        });
        ;
      }, 1000);
    }
  }, [state.loading]);


  if (!state.deleted && !state.confirmed) {
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
  } else if (!state.deleted && state.confirmed) {
    return (
      <>
        <p>¿ Estas seguro ?</p>
        <button
          onClick={() => { setState({ ...state, deleted: true }) }}
        >
          Si
        </button>
        <button
          onClick={() => { setState({ ...state, confirmed: false }) }}
        >
          No
        </button>
      </>
    );
  } else {
    return (
      <>
        <p>Eliminado con exito</p>
        <button
          onClick={() => { setState({ ...state, deleted: false, confirmed: false }) }}
        >volver</button>
      </>
    );
  }

}