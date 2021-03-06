# CURSO PROFESIONAL DE REACT HOOKS by Oscar Barajas.

# CLASE 2 - REACT HOOKS

los hooks son una alternativa a los componentes de Clases de React.
La motivacion de los hooks es solucionar inconvenientes que se presentan en la programacion de Clases.

Problemas que vienen a resolver:
en Clases el estado y props viven en el objeto this, todos agrupados, por lo que la separacion de los estados y props es dificil, otra cosa es el problema de actualizacion de estos en ciertas partes de la aplicacion.
es normal que si tenes varios estados con logica de actualziacion diferente y tienen que ejecutarse determinada ciertas circunstancias, que tengas el metodo componentDidUpdate() lleno de ifs con logica para determinar si actualizar el estado o no.

de forma tecnica un Hook es una funcion que nos permite acceder a caracteristicas de React.

# CLASE 3 - useState

Este hook sirve para manejar el estado en componentes creados con funciones.

como ya vimos en cursos anteriores se desestructura un array, que te de el estado y una funcion para actualizarlo.
sino usas la funcion setState() de React, el estado no se actualiza.

# CLASE 4 - useEffect

useEffect cambia completamente la forma de pensamiento de la programacion de clases con react.
En la programacion de clases, se pensaba en el ciclo de vida del componente para realizar actualizaciones.

con useEffect la cosa queda mas facil, aca pensamos en efectos que hay que aplicar cuando cambian los estados o props.
siempre se ejecutara 1 vez, que es cuando se monta el componente.

# CLASE 5 - useContext

En el ejercicio anterior de activar el darkmode, teniamos la logica en el componente header, pero el que necesitaba de ella era el componente App, por lo que se movio la logica a App, y Header se convirtio en un componente stateless.
Ahora si tenemos mas componentes que tienen que variar segun el darkMode, como por ejemplo Characters.jsx, entonces App tendria que pasarle lo mismo que le pasa a Header, y esto se puede repetir en todos los componentes y sus hijos.

Para estas situaciones es util usar el hook useContext() que nos permite compartir facilmente estos estados "globales".

Para esto hay que hacer 3 cosas, crear el archivo del contexto, que puede tener un valor por defecto util para test aislados.

Agregar al componente padre el provider. que le permitira a sus hijos acceder a esas variables sin que se las pase el padre, usualmente se elige a index.js como el padre donde poner el Provider, este provider espera recibir una prop value, que es el valor que son los valores que le compartira a sus hijos, este valor a compartir deberia ser un estado de React, ya que objetos crudos, causarian un problema de rendimiento al re-renderizar todos los hijos cada vez que se renderiza el padre ya que Context determina la Identidad por referencia.

y finalmente el componente hijo que quiera usar el contexto tiene que importar el Hook useContext() y el contexto, pasarle el contexto como parametro al useContext y eso le permite acceder a las variables.

En el codigo se puede ver como App.jsx agrega al return el Provider que obtiene del context.js y pasa como value su estado darkMode,
luego es consumido por Characters.jsx, a traves de useContext() y el contexto de context.js, para obtener el darkMode, y voltear las tarjetas dependiendo el modo en el que se esta.

## IMPORTANTE useContext re render

useContext esta pensado para aquellas cosas que cambian poco, y necesitan ser usado por casi todos los componentes, algo como por ejemplo "modo oscuro","idioma", "usuario", "fecha", cosas que cambien poco y sean muy usadas.

cada vez que se modifique el estado del contexto, alli donde este el componente Context.Provider, lanzara una re renderizacion a todos los componentes que contengan.
En este caso como esta en App, obliga a renderizar a todos los componentes.

Por lo que el uso que se le esta haciendo no seria el adecuado.

Para esto seria mas adecuado usar algo como Redux.

<table><tbody><tr><td><p style="text-align:center"><strong>useContext&nbsp;</strong></p></td><td><p style="text-align:center"><strong>Redux</strong></p></td></tr><tr><td>useContext is a hook.</td><td>Redux is a state management library.</td></tr><tr><td>It is used to share data.</td><td>It is used to manage data and state.</td></tr><tr><td>Changes are made with the Context value.</td><td>Changes are made with pure functions i.e. reducers.</td></tr><tr><td>We can change the state in it.</td><td>The state is read-only. We cannot change them directly.</td></tr><tr><td>It re-renders all components whenever there is any update in the provider???s value prop.</td><td>It only re-render the updated components.</td></tr><tr><td>It is better to use with small applications.</td><td>It is perfect for larger applications.&nbsp;</td></tr><tr><td>It is easy to understand and requires less code.</td><td>It is quite complex to understand.</td></tr></tbody></table>

# CLASE 6 - useReducer

Similar a Redux pero nativo, nos permite manejar el estado de forma mas amigable.

Las parte importantes son:

- un conjunto de estados.
- una funcion reducer que dice que a que estado hay que cambiar.
- la funcion useReducer que nos entrega la funcion dispatch para causar el cambio de estado.

opcionalmente y para que el codigo sea mas limpio se suele crear funciones que tienen la orden dispatch.

asi en el codigo den vez de verse que un boton hace un dispatch con parametros, simplemente se ve que el boton tiene la referencia a una funcion addFavorite. Mucho mas legible y reutilizable.

# CLASE 7 - useMemo

esta funcion nos permite memoizar el resultado de funciones puras. Muy util cuando es costoso la ejecucion de la funcion.

La misma requiere que se le pase una funcion con la funcion a ejecutar, y un arreglo de variables a observar. La funcion memoizada solo se ejecuta cuando alguna de las variables cambia.

```js
const memoizedValue = useMemo(() => {
  // expensive computation
}, [props.a, props.b, state1, state2]);
```

Esta funcion se ejcuta en cada renderizado.

ADVERTENCIA: useMemo puede olvidar, el codigo deberia funcionar bien sin este, y usarlo unicamente para mejorar el rendimiento.

ejemplo practico en Characters.jsx con el search. (no tan buen ejemplo)

https://www.youtube.com/watch?v=BPB1W_rg3LQ&ab_channel=EWebik

# CLASE 8 - useRef

useRef nos permite obtener una referencia mutable a un elemento del DOM.
util para modificar el estado, usualmente en React esto se logra obligando un nuevo render cambiando un estado o prop.

Sin embargo al utilizar esta forma no obligamos un re-render.

ejemplo sobre su capacidad de evitar los closures en state:
https://latteandcode.medium.com/react-el-hook-useref-6e20f026d5b

tambien es usado para los formularios, un formulario suele tener muchos inputs tener un state para cada uno es molesto, se puede crear una referencia para el formulario nomas.

```js
function Formulario() {
  const formRef = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(formRef.current);
    //formRef.current.submit(); // o un fetch post, para hacerlo asincrono
    console.log(form.get("email"));
  };
  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="your name" />
      <input type="text" name="email" placeholder="your email" />
      <input type="submit" value="Submit" />
    </form>
  );
}
```

como se recibiria esto? en Nestjs con este plugin asi:
https://www.npmjs.com/package/nestjs-form-data

# CLASE 10 - useCallback

Como se sabe en React cada funcion que es creada dentro de un componente es Re-creada cuando se re-renderiza el componente. Esto por lo general no es un problema, pero si lo fuera a ser, o se requeriria pasar a otros componentes la funcion y este depende de la igualdad de referencias entonces es buen momento de aplicar useCallback.

useCallback recibe la funcion a memoizar y un arreglo de dependencias, cuando algunas de las depenencias cambie la funcion sera re-creada.

se suele utilizar dentro de los customHooks, cuando se devuelve una funcion para que el mismo pueda ser aplicados como dependencias de otros hooks sin que haya problemas de referencias.

```js
//customHook
function useCount(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(
    function () {
      setCount((count) => count + 1);
    },
    [setCount]
  );

  return [count, increment];
}
//su uso dentreo de otro componente
useEffect(
  function () {
    // something
    console.log(otherDep);
    increment();
  },
  [increment, otherDep]
);
```

explicacion de todo eso:
https://latteandcode.medium.com/el-hook-usecallback-y-react-memo-87f761733c35

Deberia usar useCallback y useMemo siempre?
https://www.youtube.com/watch?v=duh3uKn0qnU&ab_channel=midulive

tl;dr: muy parecido a lo expuesto arriba para el customHook, pero en este caso un padre pasando una funcion que crea a su hijo, y el hijo tiene un useEffect que depende de la funcion que se creo en el padre. Esto hara que se ejecute siempre. (problema!)

Pero no de rendimiento, si lo que quiere decir ese useEffect es "cuando me mandes una funcion con una logica diferente me ejecuto", entonces ahi si hay que aplicar useCallback, porque sino es llamado siempre.

# CLASE 11 - React.memo

https://es.reactjs.org/docs/react-api.html#reactmemo

En react como bien sabemos cada nuevo render re crea todas las funciones y variables dentro de la funcion,causando que se "perciba" un cambio de propiedades a los hijos que tenga ese componente. Haciendo que el hijo se re-ejecute, luego al momento del render, React se daria cuenta que el componente hijo esta igual, por lo que no se renderizara (afectar al DOM). Pero ya se re-ejecuto...

https://www.youtube.com/watch?v=Wo7_OVtu1ls&ab_channel=midudev

React.memo viene a proveer una solucion de rendimiento, su uso deberia quedar reservado cuando hay problemas de rendimiento, y ademas nuestro componente es un componenete "puro" osea de presentacion, solo recibe props y renderiza.

React.memo es una HOC "high order component" que recibe un componente funcional y opcionalmente una funcion de comparacion (que retorna false para causar un re-render).

```js
function MyComponent(props) {
  /* renderiza usando props */
}
function areEqual(prevProps, nextProps) {
  /*
  retorna true si al pasar los nextProps a renderizar retorna
  el mismo resultado que al pasar los prevProps a renderizar,
  de otro modo retorna false
  */
}
export default React.memo(MyComponent, areEqual);
```

# CLASE 12 - customHooks

Los customHooks nos permite crear nuestros propios hooks, estos son una funcion, que puede utilizar intermanmente los hooks de React.

Antes de crear alguno conviene revisar los de la comunidad, ya que hay una cantidad masiva ya creada y testeada.

# QUE SIGUE?

a partir de aca se empieza el proyecto del curso llamado platzi-conf-merch
eso esta en otro repositorio.
