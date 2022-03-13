
import { useEffect, useState } from 'react';
//custom hook
export function useLocalStorage(itemName, initialValue = []) {

  const [item, setItem] = useState(initialValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const saveItem = (newItem) => {
    try {
      const str = JSON.stringify(newItem);
      localStorage.setItem(itemName, str);
      setItem(newItem);
    } catch (error) {
      setError(true);
    }
  }
  useEffect(() => {
    setTimeout(() => {
      try {
        const stringItem = localStorage.getItem(itemName);
        let defaultItem;
        if (!stringItem) {
          defaultItem = initialValue;
        } else {
          defaultItem = JSON.parse(stringItem);
        }
        console.log('end setTimeout');
        setItem(defaultItem);
      } catch (error) {
        console.log('upsi!', error);
        setError(true);
      } finally {
        setLoading(false);
      }

    }, 1000);
    console.log('useEffect');
  }, []);



  return { item, saveItem, loading, error };
}