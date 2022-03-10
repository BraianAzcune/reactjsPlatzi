import React from 'react'


export function withStorageListener(WrappedComponent) {
  return function WrapperComponentWithStorageListener({ storageName }) {
    const [storageChange, setStorageChange] = React.useState(false);


    window.addEventListener('storage', (event) => {
      if (event.key === storageName) {
        console.log('hubo cambios en ', storageName);
        setStorageChange(true);
      }
    });

    return (
      <WrappedComponent
        show={storageChange}
        toggleShow={setStorageChange}
      >
      </WrappedComponent>
    )
  }
}


