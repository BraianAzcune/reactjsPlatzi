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

# CLASE 5 - useContext

En el ejercicio anterior de activar el darkmode, teniamos la logica en el componente header, pero el que necesitaba de ella era el componente App, por lo que se movio la logica a App, y Header se convirtio en un componente stateless.
Ahora si tenemos mas componentes que tienen que variar segun el darkMode, como por ejemplo Characters.jsx, entonces App tendria que pasarle lo mismo que le pasa a Header, y esto se puede repetir en todos los componentes y sus hijos.

Para estas situaciones es util usar el hook useContext() que nos permite compartir facilmente estos estados "globales".

Para esto hay que hacer 3 cosas, crear el archivo del contexto, que puede tener un valor por defecto util para test aislados.

Agregar al componente padre el provider. que le permitira a sus hijos acceder a esas variables sin que se las pase el padre, usualmente se elige a index.js como el padre donde poner el Provider, este provider espera recibir una prop value, que es el valor que son los valores que le compartira a sus hijos, este valor a compartir deberia ser un estado de React, ya que objetos crudos, causarian un problema de rendimiento al re-renderizar todos los hijos cada vez que se renderiza el padre ya que Context determina la Identidad por referencia.

y finalmente el componente hijo que quiera usar el contexto tiene que importar el Hook useContext() y el contexto, pasarle el contexto como parametro al useContext y eso le permite acceder a las variables.

En el codigo se puede ver como App.jsx agrega al return el Provider que obtiene del context.js y pasa como value su estado darkMode,
luego es consumido por Characters.jsx, a traves de useContext() y el contexto de context.js, para obtener el darkMode, y voltear las tarjetas dependiendo el modo en el que se esta.

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
