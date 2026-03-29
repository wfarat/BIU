import { FilmList } from './components/film';
import './App.css'
import {FILMS} from "./films.ts";

function App() {
  const watched = FILMS.filter(film => film.watched);
  const unwatched = FILMS.filter(film => !film.watched);
  return (
      <>
        <h1>🎬 Biblioteka Filmów</h1>
        <FilmList title="Obejrzane" films={watched}/>
        <FilmList title="Do obejrzenia" films={unwatched}/>
      </>
  )
}

export default App
