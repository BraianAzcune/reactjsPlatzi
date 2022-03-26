import react from "react"

export default function Headers({ toggleDarkMode, darkMode }) {


  return (
    <>
      <button onClick={toggleDarkMode} type="button">{darkMode ? 'LightMode' : 'DarkMode'}</button>
      <h2>GG</h2>
    </>
  )
}
