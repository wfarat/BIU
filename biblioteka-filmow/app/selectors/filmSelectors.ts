import {FilmState} from "@/app/reducers/filmReducer";

export const selectFilm
    = (state: FilmState, id: number) => state.films.find(m => m.id === id);
