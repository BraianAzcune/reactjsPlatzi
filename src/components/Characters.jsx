import { useEffect, useState } from "react";
import './Characters.css';

export default function Characters() {

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
            <div className="character" key={ch.id}>
              <h2>{ch.name}</h2>
              <img src={ch.image} alt={ch.name} />
            </div>
          ))
        }
      </div>
    </>
  )
}