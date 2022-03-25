# CURSO PROFESIONAL DE REACT HOOKS by Oscar Barajas.

# CLASE 2 - REACT HOOKS

los hooks son una alternativa a los componentes de Clases de React.
La motivacion de los hooks es solucionar inconvenientes que se presentan en la programacion de Clases.

Problemas que vienen a resolver:
en Clases el estado y props viven en el objeto this, todos agrupados, por lo que la separacion de los estados y props es dificil, otra cosa es el problema de actualizacion de estos en ciertas partes de la aplicacion.
es normal que si tenes varios estados con logica de actualziacion diferente y tienen que ejecutarse determinada ciertas circunstancias, que tengas el metodo componentDidUpdate() lleno de ifs con logica para determinar si actualizar el estado o no.

de forma tecnica un Hook es una funcion que nos permite acceder a caracteristicas de React.
