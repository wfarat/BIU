'use client'
import { useParams } from "next/navigation";
import Link from "next/link";
import FavoriteButton from "@/app/filmy/[id]/FavoriteButton";
import {selectFilm} from "@/app/selectors/filmSelectors";
import {useFilmDispatch, useFilmState} from "@/app/context/FilmContext";
import {useEffect, useState} from "react";


export default function FilmDetailsPage() {
    const params = useParams();
    const id = params.id;
    const [isFavorite, setIsFavorite] = useState(false);
    // Pobieramy dane konkretnego filmu
    const state = useFilmState();
    const dispatch = useFilmDispatch();
    useEffect(() => {
        setIsFavorite(state.favorites.includes(String(id)));
    }, [id]);

    const film = selectFilm(state, Number(id));
    const handleFavoriteClick = () => {
        dispatch({type: "TOGGLE_FAVORITE", payload: String(id)})
        dispatch({type: "ADD_NOTIFICATION", payload:
                {message: `Movie ${film?.title} was ${isFavorite ? 'Removed' : 'Added'} from favorites`,
                type: 'success'}})
        setIsFavorite(!isFavorite);
    }
    return (
        <div>
            <Link
                href="/filmy"
            >
                ← Powrót do listy
            </Link>

            {state.loading && (
                <div>
                    <div></div>
                    <div></div>
                </div>
            )}

            {state.error && (
                <div>
                    Nie udało się załadować danych filmu: {state.error}
                </div>
            )}

            {film && (
                <article>
                    <header>
                        <div>
                            <h1>{film.title}</h1>
                            <p>{film.genre} • {film.year}</p>
                        </div>
                        <FavoriteButton isFavorite={isFavorite}
                                        handleClick={handleFavoriteClick} />
                    </header>

                    <footer>
                        ID Filmu: {film.id}
                    </footer>
                </article>
            )}
        </div>
    );
}
