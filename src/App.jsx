import react from "react";
import './App.css'
import Header from './components/Header'
import Characters from './components/Characters'
export default function App() {
  const [darkMode, setDarkMode] = react.useState(false);

  /* preferimos guardarlo en una funcion porque deja el codigo
  template mas limpio y facil de entender.
  ademas de que puede ser reutilizado.
   */
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  }

  return (
    <div className={darkMode ? 'App dark' : 'App'}>
      <h1>React Hooks</h1>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode}></Header>
      <Characters ></Characters>
    </div>
  )
}