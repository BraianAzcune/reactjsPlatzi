import React from 'react';



function useLocalStorage(itemName, initialValue) {

  const [state, dispatch] = React.useReducer(reducer, initialState(initialValue));

  // desestructuramos del estado para mantener la comptabilidad
  const {
    sincronizedItem,
    error,
    loading,
    item,
  } = state;
  // queda pendiente de ver como crearlos usando dispatch.
  // setSincronizedItem,
  //   setError,
  //   setLoading,
  //   setItem,
  //Actions Creators
  const onError = (error) => dispatch({ type: actionTypes.error, payload: error });
  const onSuccess = (parsedItem) => dispatch({ type: actionTypes.success, payload: parsedItem });
  const onSave = (item) => dispatch({ type: actionTypes.save, payload: item });
  const onSync = () => dispatch({ type: actionTypes.sync });
  // const [sincronizedItem, setSincronizedItem] = React.useState(true);
  // const [error, setError] = React.useState(false);
  // const [loading, setLoading] = React.useState(true);
  // const [item, setItem] = React.useState(initialValue);

  React.useEffect(() => {
    setTimeout(() => {
      try {
        const localStorageItem = localStorage.getItem(itemName);
        let parsedItem;

        if (!localStorageItem) {
          localStorage.setItem(itemName, JSON.stringify(initialValue));
          parsedItem = initialValue;
        } else {
          parsedItem = JSON.parse(localStorageItem);
        }

        onSuccess(parsedItem);
      } catch (error) {
        onError(error);

      }
    }, 500);
  }, [sincronizedItem]);

  const saveItem = (newItem) => {
    try {
      const stringifiedItem = JSON.stringify(newItem);
      localStorage.setItem(itemName, stringifiedItem);

      onSave(newItem);
    } catch (error) {
      onError(error);
    }
  };

  const sincronizeItem = () => {
    onSync();
  };

  return {
    item,
    saveItem,
    loading,
    error,
    sincronizeItem,
  };
}

// lo usamos en formato funcion, para poder recibir un parametro.
function initialState(initialValue) {
  return {
    sincronizedItem: true,
    error: false,
    loading: true,
    item: initialValue,
  }
};

export const actionTypes = {
  error: 'error',
  success: 'success',
  save: 'save',
  sync: 'sync',
}

function reducer(state, action) {
  switch (action.type) {
    case actionTypes.error:
      return {
        ...state,
        error: action.payload,
      }
    case actionTypes.success:
      return {
        ...state,
        error: false,
        loading: false,
        sincronizedItem: true,
        item: action.payload,
      }
    case actionTypes.save:
      return {
        ...state,
        error: false,
        loading: false,
        sincronizedItem: true,
        item: action.payload,
      }
    case actionTypes.sync:
      return {
        ...state,
        error: false,
        loading: true,
        sincronizedItem: false,
      }
    default:
      return state;
  }
}

export { useLocalStorage };
