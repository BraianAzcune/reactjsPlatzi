# tercer curso de reactjs en Platzi = Manejo Profesional del Estado

En este curso aprenderemos a manejar el estado, y las diferentes formas que hay de hacerlo.

#### nombre de la carpeta=3src-manejo-profesional-estado

# CLASE 3 - Estados Simples: Component y useState.

En react se pueden usar los hooks o las Clases, ambos metodos son validos.
Pero la forma en que manejan las props y estados, es diferente veamos dos ejemplos identicos.
ambos reciben una propiedad name, y tienen un estado error que cambia a falso cuando se apreta un boton.

## segun props

ambos reciben las props de la misma forma.

```js
<>
  <UseState name="braian"></UseState>
  <Component name="maria"></Component>
</>
```

en cambio para recibirlo UseState:

```js
function UseState({ name }) {
  /*...*/
}
```

y para los Component (classes):
las props son obtenidas desde el this.

```js
class ClassState extends React.Component {
  render() {
    return <h2>this.props.name</h2>;
  }
}
```

## segun estado:

para el UseState usamos el hook useState para crear un estado:
de esta forma cada variable de estado es indidual.

```js
function UseState() {
  const [error, setError] = React.useState(false);
}
```

en cambio para los Componentes de clase creamos una variable state en el constructor.
esta varible state tiene todos los estados en unificados en un solo objeto.

```js
class ClassState extends React.Component {
  constructor() {
    this.state = {
      error: false,
      /*mas estados*/
    };
  }
}
```

# CLASE 4-5 - efectos con use effect. Y ciclos de vida con Class.

los efectos se ejecutan cuando el array de dependencias cambia, o cada vez que el componente se vuelve a renderizar si no hay array definido.
tal cual como se aprendio en el primer curso.

El analogo a esto en los componentes con Classes son el metodo del ciclo de vida.

nuestro objetivo es imitar el mismo comportamiento de UseState con el estado loading.
queremos que se ejecute solamente cuando se aprete el boton y no este en loading true, y que despues de un tiempo se vuelva a poner en falso.

<table>
<tr>
<th>UseState</th>
<th>ClassState</th>
</tr>
<tr>
<td>

```js
export function UseState({ name }) {
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [loading]);
  return (
    <div>
      {loading && <p>Cargando...</p>}
      <button
        onClick={() => {
          setLoading(true);
        }}>
        Comprobar
      </button>
    </div>
  );
}
```

</td>
<td>

```js
export class ClassState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }
  componentDidUpdate() {
    if (this.state.loading) {
      setTimeout(() => {
        this.setState((state, _props) => ({ loading: false }));
      }, 2000);
    }
  }
  render() {
    return (
      <div>
        {this.state.loading && <p>Cargando...</p>}
        <button
          onClick={() => {
            this.setState((state, _props) => ({ loading: true }));
          }}>
          Comprobar
        </button>
      </div>
    );
  }
}
```

</td>
</tr>
</table>

# CLASE 9 - manejar un estado compuesto como en las clases pero en hooks.

En las clases de React todo el estado vive en un objeto, y existe una funcion para actualizarlo parcialmente.
esto mismo se puede imitar con los react hooks, esta manera de manejar el estado puede ser util cuando los valores estan estrechamente relacionados.

```js
//imitamos el funcionamiento de un React.Component
const [state, setState] = React.useState({
  error: false,
  loading: false,
  value: "",
});
```

asi se declara, y cuando se quiere actualizar hay que enviar el nuevo objeto, pero desestructurando el state, porque sino lo que se envia seria un nuevo objeto con las propiedades mencionadas.

```js
setState({ ...state, loading: true });
```
