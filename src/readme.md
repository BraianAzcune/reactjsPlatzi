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

# clase 12 - useReducer y reducer

¿que es un reducer?

el reducer es una funcion que toma un estado y una accion, y devuelve un nuevo estado.
nos permite manejar el estado de una forma mas declarativa.

ahora ya no esta el setState dentro del codigo de eventos como en el ejemplo anterior, sino que se usa un reducer.
que entrega una variable estado y un dispatch para disparar acciones.

Para eso tenemos que crear una funcion reducer, que recibe el estado y la accion. y debe retornar un objeto que es el nuevo estado.

creando un reducer:

```js
const [state, dispatch] = React.useReducer(reducer, initialState);
```

el initialState y el reducer:

```js
const initialState = {
  error: false,
  loading: false,
  value: '',
  deleted: false,
  confirmed: false
};

const reducer = (state, action) => {

  if (action.type === 'write') {
    return {
      ...state,
      value: action.payload
    }
  }

  if (action.type === 'error') {
    return {
      ...state,
      error: true,
      loading: false
    }
  }
  /*...*/
```

utilizar esto, hace mas legible y declarativo al codigo, ya que para realizar un cambio lo unico que hay que hacer es

```js
dispatch({ type: "loading" });
```

el problema es que cometer un typo en el dispatch, no hara nada, haciendo que sea dificil encontrar el error.
Para eso es comun crear un objeto llamdo actionType que contenga todos los tipos de acciones que se pueden disparar. y Utilizar eso den vez de enviar un string.

Otra cosa que sirve es abstraer el comando dispatch, mientras mas compleja sea nuestra aplicacion un dispatch tendra varios side effects.

la estructura que se suele manejar en redux
https://read.reduxbook.com/markdown/part1/04-action-creators.html
consiste en tener funciones que devuelven el objeto que hay que pasarle al dispatch, y luego una funcion que ejecuta el dispatch y puede realizar otras cosas relacionadas.
si se utiliza Redux esta ultima funcion no es necesario crearla ya que existen metodos que la generan se llaman **bindActionCreators**

```js
//esta funcion devulve el objeto que hay que pasarle a dispatch
const confirmar = () => ({ type: "confirm" });
// esta funcion llama a dispatch y puede realizar otras side effects
const boundConfirmar() = dispatch(confirmar());
//luego en el codigo se utiliza asi:
<button onClick={boundBorrar}>Si</button>
```

como se puede ver esta forma de hacerlo es mas declarativa y facil de mantener.
en situaciones donde la api es pequeña boundConfirmar y cofirmar podrian ser una sola funcion.
y como se dijo antes Redux ya tiene el boundActionCreators que nos permite ahorrarnos crear la funcion.

```JS
const boundAddToDoItem = bindActionCreators(doAddToDoItem, store.dispatch)
const boundToDoActions = bindActionCreators(
  {
    add: doAddToDoItem,
    remove: doRemoveToDoItem,
    clear: doClearToDos
  },
  store.dispatch
)
```
