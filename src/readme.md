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

### links

Principios en los que se basa el desarrollo de React

https://es.reactjs.org/docs/design-principles.html

explicacion de Composicion y porque se prefiere sobre la herencia.

ademas, habla que el sistema de props de por si se puede usar como los slots, de angular o vuejs.
