import React from 'react';

function useLocalStorage(itemName, initialValue) {
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [item, setItem] = React.useState(initialValue);

  const refrescarItem = () => {
    setLoading(true);
    setItem([]);
    setTimeout(() => {
      try {
        const data = localStorage.getItem(itemName);
        if (data) {
          setItem(JSON.parse(data));
        } else {
          setItem(initialValue);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }, 2000);

  }

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

        setItem(parsedItem);
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    }, 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // [] significa que solo se ejecuta una vez, cuando se monta el componente y cuando se desmonta se llama a la funcion de saneamiento, en este caso no hay.

  const saveItem = (newItem) => {
    try {
      const stringifiedItem = JSON.stringify(newItem);
      localStorage.setItem(itemName, stringifiedItem);
      setItem(newItem);
    } catch (error) {
      setError(error);
    }
  };



  return {
    item,
    saveItem,
    loading,
    error,
    refrescarItem,
  };
}

export { useLocalStorage };
