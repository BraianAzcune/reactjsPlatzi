import React from 'react'


const SECURITY_CODE = 'asd';

export function UseReducer({ name }) {
  //imitamos el funcionamiento de un React.Component
  const [state, dispatch] = React.useReducer(reducer, initialState);
  //asi se utilizaria con Redux, pero seria mas eficiente porque estaria afuera.. (creo...)
  const borrar = () => ({ type: actionType.delete });
  const boundBorrar = () => dispatch(borrar());



  React.useEffect(() => {
    if (state.loading) {
      setTimeout(() => {
        const correct_password = state.value === SECURITY_CODE ? true : false;
        if (correct_password) {
          dispatch({ type: actionType.confirm });
        } else {
          dispatch({ type: actionType.error });
        }

      }, 1000);
    }
  }, [state.loading]);


  if (!state.deleted && !state.confirmed) {
    return (
      <div>
        <h2>Eliminar UseReducer</h2>
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
            dispatch({ type: actionType.write, payload: event.target.value });
          }} placeholder='Codigo de seguridad'></input>
        <button
          disabled={state.loading}
          onClick={() => { dispatch({ type: actionType.loading }) }}>
          Comprobar</button>
      </div>
    );
  } else if (!state.deleted && state.confirmed) {
    return (
      <>
        <p>¿ Estas seguro ?</p>
        <button
          onClick={boundBorrar}
        >
          Si
        </button>
        <button
          onClick={() => { dispatch({ type: actionType.reset }) }}
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
          onClick={() => { dispatch({ type: actionType.reset }) }}
        >volver</button>
      </>
    );
  }

}




const actionType = {
  confirm: 'confirm',
  error: 'error',
  delete: 'delete',
  loading: 'loading',
  write: 'write',
  reset: 'reset'
}

const initialState = {
  error: false,
  loading: false,
  value: '',
  deleted: false,
  confirmed: false
};

const reducer = (state, action) => {

  if (action.type === actionType.write) {
    return {
      ...state,
      value: action.payload
    }
  }

  if (action.type === actionType.error) {
    return {
      ...state,
      error: true,
      loading: false
    }
  }
  if (action.type === actionType.confirm) {
    return {
      ...state,
      confirmed: true,
      loading: false
    }
  }
  if (action.type === actionType.delete) {
    return {
      ...state,
      deleted: true
    }
  }
  if (action.type === actionType.reset) {
    return {
      ...state,
      error: false,
      deleted: false,
      confirmed: false,
      value: ''
    }
  }
  if (action.type === actionType.loading) {
    return {
      ...state,
      loading: true
    }
  }

  throw new Error('no hay accion llamada ' + action.type);
}

const reducerObject = (state) => ({
  'error': {
    ...state,
    error: true
  },
  'confirm': {
    ...state,
    confirmed: true
  },
  'delete': {
    ...state,
    deleted: true
  },
  'loading': {
    ...state,
    loading: true
  }
})

const reducer2 = (state, action) => {
  const newState = reducerObject(state)[action.type];
  if (newState) {
    return newState;
  }
  return state;
}

