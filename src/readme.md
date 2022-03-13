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

_Los HOC son utilices para usar con tareas que son trasversales._
_Deberian ser funciones puras, sin efectos secundarios_
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

### **Ventajas** y desventajas de

- Render Props
- HOCs
- Custom Hooks

criterio: **Maquetacion** y **Compartir logica entre componentes**

### **Maquetacion**

**Render Props/function** VS **React hooks**

las render props hacen la maquetacion mas elegante pero tambien bajan la cantidad de codigo aburrido, (preferible sobre el elegante).
React hooks en cambio es codigo aburrido, codigo reemplazable.

sin embargo los React hooks dejan a los componentes estructuralmente importantes mejor maquetados.

### **Compartir informacion**

aqui **compiten** los 3 metodos.

las **render functions** nos permiten entregarle al componente funciones que recorren los datos que hay que pasar e inyectarle props antes de que lo vea el componente.

pero si el componente require mucha informacion las render functions terminan haicendo el codigo bastante largo y lleno de funciones con parametros y loops. Haciendo que el codigo se vaya apilando horizontalmente hacia al derecha de la cantidad de funciones.

```js
<Componente
  {
    prop1 => {
      <Componente2
        {
          prop2 => {
            <Componente3>
            {
              prop3 =>{
                {/*etc...*/}
              }
            }
            </Componente3>
          }
        }
      >
      </Componente2>
    }
  }
>
</>
```

los **HOC** en el caso de que un componente requiera utilizar muchos HOC el codigo resultante se veria:

```js
const TodoBoxWithEeverything = withAPI(
  withDarkMode(
    withDisposable(withLogProps(withLogState(withLogUnmounted(TodoBox))))
  )
);
```

**Los React Hooks**
para usarlo desestructuramos los estados y cambios de estado que nos dan, y los usamos. Es bastante facil.
¿pero que ocurre cuando tenemos que usar muchos?

```js
const [state1, setState1] = useState1();
const [state2, setState2] = useState2();
const [state3, setState3] = useState3();
const [state4, setState4] = useState4();
const [state5, setState5] = useState5();

return(
  <Componente1 state={state1} set={setState5}/>
  <Componente2 state={state2} set={setState4}/>
  <Componente3 state={state3} set={setState3}/>
  <Componente4 state={state4} set={setState2}/>
  <Componente5 state={state5} set={setState1}/>
)
```

Como se puede ver el codigo no se va a la derecha, se mantiene constante horizontalmente, y es vertical lo que lo hace mas facil de leer.

Ahora bien en cuanto a las **HOC** como estan basadas en las HOF existe una funcion llamda **compose** que facilita la lectura del codigo. Que existen en varias librerias, o se puede implementar por cuenta propia, usando dicha funcion el codigo se puede ver tal que asi:

```js
const TodoBoxWithEeverything = compose(
  withAPI,
  withDarkMode,
  withDisposable,
  withLogProps,
  withLogState,
  withLogUnmounted
)(TodoBox);
```

por lo que en los resultados el rankin para compartir informacion seria

1. customHooks
2. HOC
3. renderProps/function

https://medium.com/javascript-scene/do-react-hooks-replace-higher-order-components-hocs-7ae4a08b7b58

El resumen del link habla sobre cuando es conveniente usar HOC y cuando es mejor usar customHooks.

haces un mal uso de HOC si:

- se requiere añadir muchas props al componente
- el comportamiento es usado en solo un componente
- el comportamiento requiere ser customizado para cada componente que lo usa

haces un buen uso de HOC si:

- el comportamiento no es especifico de un componente, sino que aplica a muchos.
- el comportamiento no requiere de props.
- el componente que lo usa puede usarse sin envolverse en el HOC
- no se requiere customizar el comportamiento para cada componente.

si no haces nada de lo malo y tenes todo de lo bueno, entonces las HOC valen la pena, en caso contrario, convendria utilizar customHooks.

### links

Principios en los que se basa el desarrollo de React

https://es.reactjs.org/docs/design-principles.html

explicacion de Composicion y porque se prefiere sobre la herencia.

ademas, habla que el sistema de props de por si se puede usar como los slots, de angular o vuejs.
