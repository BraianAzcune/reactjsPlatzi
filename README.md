## cursos platzi reactjs

aca guardo el codigo con los readme.md con lo aprendido en los cursos de reactjs.

aqui se aprende las bases de react, (todo con reacthooks)

manejo de propiedades (props) son variables que componentes padres se lo pasan a sus hijos.

los estados (state), variables que poseen un estado, no sirve variables comunes.
ya que react no re-renderizara el componente si no detecta un cambio de props, state, o se llame a su funcion forceUpdate.

otra cosa curiosa es que entre render y render, los hooks y todo lo que hay dentro es destruido y re construido.
por lo que si las funciones que hay dentro de la funcion hook, son muy pesadas, puede con llevar a un costo interesante.
ademas de que son re-ejecutadas entre cada llamado de re-render.

para esto se puede optar por definir las funciones afuera del hook, usar callbacks, o usar useEffect().

para la situacion en la que no nos interesa que una funcion dentro del hook se ejecute siempre que cambian el estado, props, o se fuerza su actualizacion existe el hook

```js
useEffect();
```

cosas a tener en cuenta de el:

- los efectos se ejecutan siempre despues del renderizado, pero tiene opcion para ser excluido.
- los efectos tienen un array de valores de dependencia, si alguno cambia entonces este se re-ejecuta.
  - si se manda una lista vacia, se ejcuta una sola vez, (el primer render). sino se manda nada, se ejcuta siempre.
- useEffect se utiliza para tareas asyncronas.

Importante= se debe desmontar los effectos, si el componente se deja de renderizar, puede ocurrirar situaciones problematicas.

ej: un useEffect con setInterval, si el componente se deja de renderizar, y el setInterval accede a partes del codigo del componetne esto llevara a un error.

para evitar estas situaciones, la funcion llamada por useEffecto debe retornar una funcion con la logica de limpieza, que llamara antes de ejecutar el componente.
(si antes de llamarlo, porque no solo lo llama cuando va a desmontar el componente)

ejemplo donde la funcion de limpieza es llamada cada vez antes de que se ejcute el otro:

```js
useEffect(() => {
  console.log("useEffect");
  const interval = setInterval(function () {
    setCount(count + 1);
  }, 1000);
  // return optional function for cleanup
  // in this case, this cleanup fn is called every time count changes
  return () => {
    console.log("cleanup");
    clearInterval(interval);
  };
}, [count]);
```

ejemplo donde la funcion de limpieza es llamda solamente cuadno el componente se deje de mostrar:

```js
useEffect(() => {
  console.log("useEffect");
  const interval = setInterval(function () {
    setCount((prev) => prev + 1);
  }, 1000);
  // return optional function for cleanup
  // in this case, this cleanup fn is called every time count changes
  return () => {
    console.log("cleanup");
    clearInterval(interval);
  };
}, []);
```

ademas se explica una situacion que puede llevar a bugs cuando una dependencia es una funcion.

el codigo importante:

```js
//counter.js
  useEffect(() => {
    ... codigo ...
  }, [interval, onDarkModeChange]);
// main.js
  const onDarkModeChange = () => (darkMode ? "🌙" : "🌞");
```

el problema aca es que el componente que esta en main.js, cada vez que se re-renderice, re creara todas las funciones, por lo que onDarkModeChange tendra un valor distinto (el objeto al que refernecia es otro). por lo que re-ejecutara al side effect.

para evitar esto se utiliza algo que no vimos en el curso:

```js
//main.js
const onDarkModeChange = useCallback(() => {
  return darkMode ? "🌙" : "🌞";
}, [darkMode]);
```

segun explica el articulo. useCallback, re-crea la funcion solamente cuando cambia alguna dependencia.
en el ejemplo darkMode es un state, que cambia segun un checkbox.

fuentes: https://blog.logrocket.com/guide-to-react-useeffect-hook/

otras cosas que se vieron React.Context

https://es.reactjs.org/docs/context.html

una forma facil de poder compartir props que se tienen que pasar a muchos hijos en la jerarquia. Esta pensando para cosas como modoOscuro=true.

otra cosa que se vio el uso de React.Portals

https://es.reactjs.org/docs/portals.html

los portales de reactDOM, sirven para hacer que un componente se monte en otro lugar del DOM, aunque en la jerarquia este en otro lugar.
esto se utiliza normalmente para mostar los dialogs, que necesitan estar como ultimo elemento del html:body.

otra cosa que se vio fue crear hooks personalizados

https://es.reactjs.org/docs/hooks-custom.html
