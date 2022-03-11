import React from 'react'


export function withStorageListener(WrappedComponent) {
  return function WrapperComponentWithStorageListener({ storageName, recargarTodos }) {
    const [storageChange, setStorageChange] = React.useState(false);

    const refresh = () => {
      setStorageChange(false);
      recargarTodos();
    }

    window.addEventListener('storage', (event) => {
      if (event.key === storageName) {
        console.log('hubo cambios en ', storageName);
        setStorageChange(true);
      }
    });

    return (
      <WrappedComponent
        refresh={refresh}
        show={storageChange}
      >
      </WrappedComponent>
    )
  }
}


