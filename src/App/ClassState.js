import React from 'react'
const SECURITY_CODE = 'asd';

export class ClassState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      loading: false,
      value: ''
    }
  }
  componentDidUpdate() {
    if (this.state.loading) {
      setTimeout(() => {
        this.setState((state, _props) => ({ loading: false, error: state.value === SECURITY_CODE ? false : true }));
      }, 2000);
    }
  }
  render() {
    return (
      <div>
        <h2>Eliminar ClassState</h2>
        <p>{this.props.name}</p>
        {
          (this.state.error && !this.state.loading) && <p>Error en el codigo de seguridad</p>
        }
        {
          this.state.loading && <p>Cargando...</p>
        }
        <p>Por favor escribe el codigo de seguridad</p>
        <input
          value={this.state.value}
          onChange={(e) => this.setState({ value: e.target.value })}
          placeholder='Codigo de seguridad'></input>
        <button
          // la actualizacion de estado y props es asincrona, por lo que usar this dentro es peligroso
          onClick={() => { this.setState((state, _props) => ({ loading: true })) }}
          disabled={this.state.loading}
        >Comprobar</button>
      </div>
    );
  }
}