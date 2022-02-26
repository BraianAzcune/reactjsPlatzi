
export function TodoNoTodos({ loading, cantidadTodos }) {
  if (loading || cantidadTodos !== 0) {
    return null;
  }
  return (
    <p>no hay todos</p>
  );
}