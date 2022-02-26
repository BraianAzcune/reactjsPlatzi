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

### links

Principios en los que se basa el desarrollo de React

https://es.reactjs.org/docs/design-principles.html

explicacion de Composicion y porque se prefiere sobre la herencia.

ademas, habla que el sistema de props de por si se puede usar como los slots, de angular o vuejs.
