## segundo curso de reactjs en platzi = Patrones de Render y Composicion.

este curso hace el mismo proyecto de to-do, pero enfocado en seguir las buenas
practicas recomendadas por el equipo de React.

### composicion de componentes

https://es.reactjs.org/docs/composition-vs-inheritance.html

la composicion de componentes permite facilitar la integracion, y crear componentes reusables.
la idea es hacer componentes reusables y flexibles.

la composicion la logramos a traves de la props.children, aunque tambien se puede pasar una prop cualquiera, y funciona.

ej:

```js
// App.js
function App() {
  const nombres = ["jose", "maria"];
  return (
    <TodoList>
      {nombres.map((n) => (
        <TodoItem name={n} />
      ))}
    </TodoList>
  );
}
// TodoList.js
function TodoList(props) {
  return <ul>{props.children}</ul>;
}
```

### problema de colocacion del estado

otra pregunta valida, es quien maneja el estado de los componentes ?.

existe una estrategia llamada 'Maxima cercania a al relevancia'
que dice que la variable debe estar guardada en el componente que lo use, y si lo usan entre varios, entonces el padre mas cercano a todos.

Ademas existe el concepto de componentes statefull y stateless.

los componentes stateless son aquellos que no tienen estado interno, solamente cambian cuando cambia lo que le pasa su padre.
por lo que se dice que son compontes de presentacion.

los componentes que creen su propio estado seran los statefull.

la idea seria tener componentes con estado que tengan logica, y luego los componentes finales que renderizan que sean sin estado.

### Render props y render functions

La render props y render function son otra forma para lograr la composicion de componentes, hasta ahora la composicion
la lograbamos a traves de la prop children.

ejemplo aplicando renderProps, antes teniamos en la App/index.js

```js
<TodoList>
  {error && <TodosError />}
  {loading && <TodosLoading />}
  {!loading && !searchedTodos.length && <EmptyTodos />}

  {searchedTodos.map((todo) => (
    <TodoItem
      key={todo.text}
      text={todo.text}
      completed={todo.completed}
      onComplete={() => completeTodo(todo.text)}
      onDelete={() => deleteTodo(todo.text)}
    />
  ))}
</TodoList>
```

la idea seria modificar esto, actualmente TodoList recibe todo eso en su children y solamente lo renderiza.

la idea seria transformar esto, para que tenga propiedades, que dentro tienen una funcion que muestra lo que se debe renderizar.

```js
//App/index.js
<TodoList
  error={error}
  loading={loading}
  searchedTodos={searchedTodos}
  onError={() => <TodosError />}
  onLoading={() => <TodosLoading />}
  onEmpty={() => <EmptyTodos />}
  render={(todo) => {
    return (
      <TodoItem
        key={todo.text}
        text={todo.text}
        completed={todo.completed}
        onComplete={() => completeTodo(todo.text)}
        onDelete={() => deleteTodo(todo.text)}
      />
    );
  }}></TodoList>;

// TodoList.js
function TodoList({
  error,
  onError,
  loading,
  onLoading,
  onEmpty,
  searchedTodos,
  render,
}) {
  return (
    <section className="TodoList-container">
      {error && onError()}
      {loading && onLoading()}
      {!loading && !searchedTodos.length && onEmpty()}
      <ul>{searchedTodos.map(render)}</ul>
    </section>
  );
}
```

en la version de arriba, ahora TodoList no muestra todo a traves de su propiedad children.
sino que se le pasan 3 props para la logica de que renderizar.
y luego unas renderProps que son funciones que dicen que renderizar.

### React.cloneElement y React.Children

nos permite crear un clon de un elemento react, donde el segundo paramentro es un objeto con las propiedades que le queremos pasar.
De esta forma es posible a la prop children, ponerle otras props.
pero esto solo funciona si children es un solo elemento.

para eso existe React.Children, que nos permite transformar children en un array, al que luego podemos procesar.

ej:

```js
const clones = React.Children.toArray(children).map((child) =>
  React.cloneElement(child, { loading })
);
return <header>{clones}</header>;
```

### High order functions.

Las high order components se basan en las high order function de los lenguajes de paradigma funcional.
trata de funciones que reciben como argumentos los tipicos y tambien son capaces de aceptar funciones.
y retornar una funcion como respuesta.

ejemplo sencillo de una funcion de orden superior que recibe un numero y retorna una funcion

```js
function HighOrderFunction(value) {
  return function returnFunction(value2) {
    return value + value2;
  };
}
const functionReturned = HighOrderFunction(10);
functionReturned(2); //12
functionReturned(10); //20
functionReturned(-10); //0
```

ejemplo de una High Order Function que ademas hace un bind de su variable con la funcion que retorna.

```js
function HighOrderFunction(initialValue) {
  let value = initialValue;
  return function returnFunction(increment) {
    value += increment;
    return value;
  };
}
const functionReturned = HighOrderFunction(10);
functionReturned(2); //12
functionReturned(2); //14
const functionReturnedTwo = HighOrderFunction(10);
functionReturnedTwo(2); //12
functionReturnedTwo(2); //14
```

### High Order Component

ahora que entendemos las HOF, los HOC son muy similares, la diferencia es que la funcion que se retorna tiene que ser un componente de React.

ejemplo sencillo:

veamos como funciona sin hoc

```js
function Main({ nombre }) {
  return <h1>Hola {nombre}</h1>;
}

ReactDOM.render(<Main nombre="braian" />, document.getElementById("root"));
```

ahora lo que haremos es usar HOC para que el Main component sea envuelto y al final diga adios.

```js
function Main({ nombre }) {
  return <h1>Hola {nombre}</h1>;
}

//HOC
function withAdios(Component) {
  //las props que le inyectaremos al componente
  return function (props) {
    return (
      <>
        <Component {...props}></Component>
        <p>Adios</p>
      </>
    );
  };
}

const WrappedMain = withAdios(Main);

ReactDOM.render(
  <WrappedMain nombre="braian" />,
  document.getElementById("root")
);
```

#### **Ejemplo de HOC**

en el curso se puede ver un ejemplo de HOC para escuchar ante el evento de que cambie el local storage, la situacion seria que si tenemos la app abierta desde varias pestañas entre ellas no hay sincronizacion a menos que el useLocalStorage->useEffect no tenga un array de dependencias, haciendo que se recarge siempre.

Pero como realizar esto es costo, se opta por escuchar el evento de que cambio el localstorage de el objeto window.
Las HOC en este caso recibe un componente y retorna el componente con 3 props inyectadas, que son show, toggleShow, y refresh, estas variable estara en true si ocurrio dicho evento. Asi multiples componentes pueden adquirir la habilidad de escuchar el evento del localStorage.

el archivo donde ocurre esto es **HOC_withStorageListener** y el que lo usa es **ChangeAlert/index.js**

abajo se puede ver el resultado final:
![Alt resultado](./readme/sincronizar.gif)

### links

Principios en los que se basa el desarrollo de React

https://es.reactjs.org/docs/design-principles.html

explicacion de Composicion y porque se prefiere sobre la herencia.

ademas, habla que el sistema de props de por si se puede usar como los slots, de angular o vuejs.
