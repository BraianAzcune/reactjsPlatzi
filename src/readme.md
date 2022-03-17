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
