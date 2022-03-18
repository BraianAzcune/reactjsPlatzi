import React from 'react'


export class ClassState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      loading: false,
    }
  }
  componentDidUpdate() {
    if (this.state.loading) {
      setTimeout(() => {
        this.setState((state, _props) => ({ loading: false, error: true }));
      }, 2000);
    }
  }
  render() {
    return (
      <div>
        <h2>Eliminar ClassState</h2>
        <p>{this.props.name}</p>
        {
          this.state.error && <p>Error en el codigo de seguridad</p>
        }
        {
          this.state.loading && <p>Cargando...</p>
        }
        <p>Por favor escribe el codigo de seguridad</p>
        <input placeholder='Codigo de seguridad'></input>
        <button
          // la actualizacion de estado y props es asincrona, por lo que usar this dentro es peligroso
          onClick={() => { this.setState((state, _props) => ({ error: false, loading: true })) }}
        >Comprobar</button>
      </div>
    );
  }
} 