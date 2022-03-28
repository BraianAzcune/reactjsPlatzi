import { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import './Characters.css';

export default function Characters() {

  const darkMode = useContext(ThemeContext);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character/").then(res => res.json())
      .then(data => { setCharacters(data.results); })
  }, []);

  return (
    <>
      <h1>Characters:</h1>
      <div className="Characters">

        {
          characters.map(ch =>
          (
            <div className={darkMode ? 'character character-darkmode' : 'character'} key={ch.id}>
              <h2>{ch.name}</h2>
              <img src={ch.image} alt={ch.name} />
            </div>
          ))
        }
      </div>
    </>
  )
}