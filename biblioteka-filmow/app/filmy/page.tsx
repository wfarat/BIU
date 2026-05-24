'use client'
import {useRef} from 'react';
import Link from 'next/link';
import {useFilmDispatch, useFilmState} from "@/app/context/FilmContext";

export default function FilmyPage() {
    const searchRef = useRef<HTMLInputElement>(null);
    const state = useFilmState();
    const dispatch = useFilmDispatch();

    const filteredFilms = state.films?.filter(film =>
        film.title.toLowerCase().includes(state.query.toLowerCase())
    );

    return (
        <div>
            <h1>Lista Filmów</h1>

            <div>
                <input
                    ref={searchRef}
                    type="text"
                    placeholder="Szukaj filmu..."
                    value={state.query}
                    onChange={(e) => dispatch({type: "SET_QUERY", payload: e.target.value})}
                />
            </div>

            {state.loading && <p>Ładowanie filmów...</p>}

            {state.error && <p>Błąd: {state.error}</p>}

            {!state.loading && !state.error && (
                <ul>
                    {filteredFilms && filteredFilms.length > 0 ? (
                        filteredFilms.map(film => (
                            <li key={film.id}>
                                <Link
                                    href={`/filmy/${film.id}`}
                                >
                                    {film.title}
                                </Link>
                                <span>({film.year})</span>
                            </li>
                        ))
                    ) : (
                        <p>Nie znaleziono filmów.</p>
                    )}
                </ul>
            )}

            <Link href="/filmy/dodaj">Dodaj Film</Link>
        </div>
    );
}
