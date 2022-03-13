


export function TodoIcon({ onClick, iconClass, children }) {
  return (
    <span
      onClick={onClick}
      className={iconClass}>
      {children}
    </span>
  )
}