import { useState, useContext, useReducer, useMemo, useRef, useCallback } from "react";
import { ThemeContext } from "../context/ThemeContext";
import Search from './Search';
import './Characters.css';
import useCharacters from "../hooks/useCharacters";
const initialState = {
  favorite: [],
}

const ActionType = {
  ADD_FAVORITE: 'ADD_FAVORITE',
  REMOVE_FAVORITE: 'REMOVE_FAVORITE',
}

function reducer(state, action) {
  switch (action.type) {
    case ActionType.ADD_FAVORITE:
      return {
        ...state,
        favorite: [...state.favorite, action.payload]
      }
    case ActionType.REMOVE_FAVORITE:
      return {
        ...state,
        favorite: state.favorite.filter(item => item !== action.payload)
      }
    default:
      return state;
  }
}


export default function Characters() {

  const darkMode = useContext(ThemeContext);
  const characters = useCharacters("https://rickandmortyapi.com/api/character/");
  const [favorites, dispatch] = useReducer(reducer, initialState);

  const searchInput = useRef(null);

  const [search, setSearch] = useState("");
  const handleSearch = useCallback(() => {
    setSearch(searchInput.current.value);
  }, [searchInput]);
  // const handleSearch = () => {
  //   setSearch(searchInput.current.value);
  // }
  //esto funciona bien sin memo
  // const filteredCharacters = characters.filter(character => {
  //   console.log('executed filter');
  //   return character.name.toLowerCase().includes(search.toLowerCase());
  // });
  function filteredCharacters() {
    console.log('executed filter');
    return characters.filter(character => {
      return character.name.toLowerCase().includes(search.toLowerCase());
    });
  }
  const filteredCharactersMemo = useMemo(() => filteredCharacters(), [characters, search]);



  function AmIInFavorite(id) {
    return favorites.favorite.some(favorite => favorite.id === id);
  }

  function addFavorite(character) {
    dispatch({
      type: ActionType.ADD_FAVORITE,
      payload: character
    })
  }

  function removeFavorite(character) {
    dispatch({
      type: ActionType.REMOVE_FAVORITE,
      payload: character
    })
  }

  function toggleFavorite(character) {
    if (AmIInFavorite(character.id)) {
      removeFavorite(character);
    } else {
      addFavorite(character);
    }
  }

  // useEffect(() => {
  //   fetch("https://rickandmortyapi.com/api/character/").then(res => res.json())
  //     .then(data => { setCharacters(data.results); })
  // }, []);

  console.log('re render characters');

  return (
    <>
      <Search search={search} searchInput={searchInput} handleSearch={handleSearch} />
      <h1>Characters:</h1>
      <div className="Characters">


        {
          filteredCharactersMemo.map(ch =>
          (
            <div className={darkMode ? 'character character-darkmode' : 'character'} key={ch.id}>
              <h2>{ch.name}</h2>
              <img src={ch.image} alt={ch.name} />
              <button onClick={() => toggleFavorite(ch)}>{AmIInFavorite(ch.id) ? 'Remove Fav' : 'Add Fav'}</button>
            </div>
          ))
        }
      </div>
    </>
  )
}