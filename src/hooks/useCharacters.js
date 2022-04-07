import { useState, useEffect } from "react";

export default function useCharacters(url) {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetch(url).then(r => r.json()).then(d => setCharacters(d.results));
  }, [url])
  return characters;
}
