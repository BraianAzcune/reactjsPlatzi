import react from "react";
import './App.css'
import Header from './components/Header'
import Characters from './components/Characters'
import { ThemeContext } from "./context/ThemeContext";

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
    <ThemeContext.Provider value={darkMode}>
      <div className={darkMode ? 'App dark' : 'App'}>
        <h1>React Hooks</h1>
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode}></Header>
        <Characters ></Characters>
      </div>
    </ThemeContext.Provider>
  )
}