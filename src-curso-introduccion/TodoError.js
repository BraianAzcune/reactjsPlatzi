

export function TodoError({ error }) {
  if (!error) {
    return null;
  }
  return (
    <p>Ocurrio un error</p>
  )

}